import Stripe from 'stripe'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { amount } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe usa centavos
      currency: 'usd',
    })

    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}