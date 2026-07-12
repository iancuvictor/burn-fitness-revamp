import express from 'express';
import Stripe from 'stripe';
import { protect } from './auth.js';
import User from '../schemas/user.js';
import Abonament from '../schemas/abonament.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointWebhook = process.env.STRIPE_WEBHOOK;

router.post('/createPayment', express.json(), protect, async (req, res) => {
  let user = await User.findOne({"activeSubscriptions.subscriptionName" : req.body.subscriptionName});
  if(user === null){
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'ron',
            product_data: {
              name: `${req.body.subscriptionName} || Duration: ${req.body.duration} ${req.body.duration > 1 ? 'Months' : 'Month'}`,
              description: `${req.body.desc || 'no description available'}`,
            },
            unit_amount: req.body.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      allow_promotion_codes: true,
      
      success_url: `http://localhost:5173/profile?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/abonamente`,
      client_reference_id: req.user.userId,
      metadata: {
        subscriptionId: req.body.id,
        duration: req.body.duration,
        price: req.body.price
      },
    });
    res.status(200).json({ url: session.url });
  } else {
    console.log('User already has this subscription');
    res.status(409).json({message: 'Subscription already active', error: 'subscriptionAlreadyBought'})
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  let event;
  if (endpointWebhook) {
    const signature = req.headers['stripe-signature']
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointWebhook
      );
    } catch (err) {
      console.log(`⚠️ Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const abonament = await Abonament.findOne({_id: session.metadata.subscriptionId})
      const user = await User.findOne({_id: session.client_reference_id});

      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + +session.metadata.duration);

      console.log(session);
      console.log(session.amount_total);
      console.log(session.amount_total / 100);

      try{
        await User.updateOne(
          {_id: session.client_reference_id}, 
          {$push: { activeSubscriptions: {
            subscriptionId: abonament._id, 
            subscriptionName: abonament.titlu,
            price: +session.amount_total / 100,
            duration: session.metadata.duration,
            purchaseDate: new Date(),
            expiryDate: expiry,
          }}})
          res.status(201).json({message: 'order placed, subscription given',  received: true});
          console.log('Subscription given to user');
        } catch(err) {
          console.log(err);
          res.status(401).json({message: 'Error occured'});
        }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
})

router.post('/checkSession', express.json(), protect, async (req, res) => {
  let session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
  let user = await User.findOne({'activeSubscriptions.subscriptionId' : session.metadata.subscriptionId});

  // console.log(session);
  // console.log(amount_total)
  // console.log(user);
  if(session.client_reference_id === req.user.userId){
    if(user !== null){
      res.status(200).json({message: 'Abonamentul a fost adăugat cu succes!', toast: 'success'});
    } else {
      res.status(200).json({message: 'Abonamentul nu a fost adăugat.', toast: 'error'})
    }
  } else {
    res.status(401).json({message: 'The checkout session does not correspond to this user'});
  }
})

export default router;