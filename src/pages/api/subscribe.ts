import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { query as q } from 'faunadb';
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";

type User = {
  ref: {
    id: string
  }
}

export default async function subscribe(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Get session user
    const session = await getSession({ req });

    // const user: User = await fauna.query( or
    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(session.user.email)
        )
      )
    )
    
    // Aqui teremos o user.ref
    // console.log(user)

    const stripeCustomer = await stripe.customers.create({
      email: session.user?.email,
      // Metadata
    })

    await fauna.query(
      q.Update(
        q.Ref(q.Collection('users'), user.ref.id),
        {
          data: {
            stripe_customer_id: stripeCustomer.id,
          }
        }
      )
    )

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