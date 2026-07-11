import Stripe from 'stripe';
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const coupon = await stripe.coupons.create({
  percent_off: 13,
  duration: 'once',
});

const promoCode = await stripe.promotionCodes.create({
  coupon: coupon.id,
  code: 'EDU',
});

console.log('Created:', promoCode.code);