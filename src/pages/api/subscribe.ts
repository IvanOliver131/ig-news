import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"
import { stripe } from "../../services/stripe";

export default async function subscribe(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Get session user
    const session = await getSession({ req });

    const stripeCustomer = await stripe.customers.create({
      email: session.user?.email,
      // Metadata
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
      // Utilizar variaveis de ambiente nas url's
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession })
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}