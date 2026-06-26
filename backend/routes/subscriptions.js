import express from "express";
import Abonament from "../schemas/abonament.js";
import User from "../schemas/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protect, admin } from "./auth.js";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "burnclujfake@gmail.com",
    pass: process.env.MAIL_PASS,
  },
});

router.get("/", async (req, res) => {
  let data = await Abonament.find();
  res.json(data);
});

router.post("/adaugaAbonament", admin, async (req, res) => {
  try {
    await Abonament.create({
      highlighted: req.body.highlighted,
      reducereAplicabila: req.body.reducereAplicabila,
      tier: req.body.tier,
      titlu: req.body.titlu,
      desc: req.body.desc,
      preturi: req.body.preturi,
    });
    res.json("test");
  } catch (err) {
    res.json("an error has occured");
    console.log(err);
  }
});

//Buying subscriptions

router.post('/cumparaAbonament', protect, async (req, res) => {
    console.log(req.body);
    try {
        let abonament = await Abonament.findOne({_id: req.body.id});
        await User.updateOne(
            {_id: req.user.userId}, 
            {$push: { activeSubscriptions: {
                subscriptionId: req.body.id, 
                subscriptionName: req.body.subscriptionName,
                price: req.body.price,
                duration: req.body.duration,
                purchaseDate: req.body.purchaseDate,
                expiryDate: req.body.expiryDate,
            }}})
            res.json('order placed, subscription given');
        } catch(err) {
            console.log(err);
        }
});

router.post("/ziGratis", async (req, res) => {
  let checkAvailability = await User.findOne({ email: req.body.email });
  if (checkAvailability === null) {
    await transporter.sendMail({
      from: "burnclujfake@gmail.com",
      to: req.body.email,
      subject: "Zi gratuită la Burn Fitness Cluj-Napoca",
      html: `<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td align="center">
      <table width="300" cellpadding="0" cellspacing="0" border="0" style="background: #000; border-radius: 10px; padding: 15px 15px 40px 15px;">
        <tr>
          <td align="center" style="padding-bottom: 20px;">
            <h1 style="font-family: Arial; font-size: 24px; color: white; text-align: center; margin: 0;">Revendică-ți ședința gratuită!</h1>
          </td>
        </tr>
        <tr>
          <td style="font-family: Arial; font-size: 18px; color: white; text-align: justify; padding-bottom: 20px;">
            Prezintă acest email la recepție! Dacă te decizi să îți continui călătoria în fitness cu noi, poți achiziționa un abonament
            <a style="color: #6776E0;" href="https://www.vercel-app-burnfitnessfake-iancu.com/" target="_blank">aici.</a>
          </td>
        </tr>
        <tr>
    <td align="center">
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${req.body.email}" width="200" height="200" style='padding-bottom: 20px'/>
    </td>
  </tr>
        <tr>
          <td align="center">
            <img src="https://i.imgur.com/h3SN8vo.png" width="270" style="border-radius: 6px; display: block;"/>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
    });
    console.log(`email sent to ${req.body.email}`)
    res.status(200).json({ message: "success" });
  } else {
    res.status(404).json({ message: "user already exists" });
  }
});

router.put("/updateAbonament", admin, async (req, res) => {
  await Abonament.updateOne({ _id: req.body._id }, { $set: req.body });
  res.json("Abonament actualizat");
});

router.delete("/stergeAbonament", admin, async (req, res) => {
  await Abonament.deleteOne({ _id: req.body._id });
  res.json("Abonament sters");
  console.log("abonament sters");
});

export default router;
