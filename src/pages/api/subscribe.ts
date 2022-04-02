import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/client'
import { stripe } from "../../services/stripe";

export default async function subscribe(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // get session user
    const session = await getSession({ req });

    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
      // metadata
    })

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: 'price_1KYJtlIFVJyNdgHHeH4jW3dC', quantity: 1 }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      // utilizar variaveis de ambiente nas url's
      success_url: 'http://localhost:3000/posts',
      cancel_url: 'http://localhost:3000/'
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession })
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}