import express from "express";
import User from "../schemas/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protect, admin } from "./auth.js";
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';
const router = express.Router();

import multer from 'multer';
const UPLOAD_PATH = process.env.FOLDER_UPLOADS_POZEPROFIL;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "burnclujfake@gmail.com",
    pass: process.env.MAIL_PASS,
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    const parts = file.originalname.split('.');
    const ext = parts[parts.length - 1];
    cb(null, req.user.userId + '_pozaProfil.' + ext);
  }
})
const upload = multer({ storage });

router.post("/register", async (req, res) => {
  let userCheck = await User.findOne({ username: req.body.username });
  if (userCheck === null) {
    let hashedPass = await bcrypt.hash(req.body.password, 10);
    try {
      try {
        let jwtToken = jwt.sign({ userEmail: req.body.email }, process.env.SIGN_KEY, { expiresIn: "30min" })
        console.log(jwtToken);
        await transporter.sendMail({
          from: "burnclujfake@gmail.com",
          to: req.body.email,
          subject: "Bine ai venit la Burn Fitness Cluj-Napoca!",
          html: `<table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center">
            <table width="300" cellpadding="0" cellspacing="0" border="0" style="background: #000; border-radius: 10px; padding: 15px 15px 40px 15px;">
              <tr>
                <td align="center" style="padding-bottom: 20px;">
                  <h1 style="font-family: Arial; font-size: 24px; color: white; text-align: center; margin: 0;">Activează-ți contul!</h1>
                </td>
              </tr>
              <tr>
                <td style="font-family: Arial; font-size: 18px; color: white; text-align: justify; padding-bottom: 20px;">
                  Deschide link-ul de mai jos în browser pentru a-ți activa contul! Dacă nu ai solicitat crearea unui cont, ignoră emailul!
                </td>
              </tr>
              <tr>
          <td align="center">
            <a style="font-family: Arial; font-size: 18px;" href='http://localhost:5173/activate/?token=${jwtToken}'>Activează contul</a>
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
      } catch {
        res.status(500).json({ message: "Error has occured" });
      }
      await User.create({
        username: req.body.username,
        displayName: req.body.username,
        email: req.body.email,
        phone: req.body.nrTel,
        password: hashedPass,
        active: false,
      });
      console.log(
        `User with username: ${req.body.username} has registered now.`,
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "error creating user" });
    }
    res.status(201).json({ message: "user created" });
  } else {
    res.status(409).json({ message: "User already exists." });
    console.log("user already exists");
  }
});

router.post('/activate', async (req, res) => {
  let decoded = jwt.verify(req.body.token, process.env.SIGN_KEY);
  let user = await User.findOne({ email: decoded.userEmail });
  if (user !== null) {
    await User.updateOne({ email: decoded.userEmail }, {
      $set: {
        active: true
      }
    })
    console.log('User is now active');
    res.status(200).json({message: 'User is now active'});
  } else {
    console.log('User does not exist');
    res.status(404).json({message: 'User does not exist'});
  }
  // let user = User.findOne({})
})

router.get("/profile", protect, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.userId }).select(
    "-password",
  );
  if (userData.active === true) {
    res.status(200).json({ message: "authorised", userData });
  } else {
    res.status(403).json({ message: 'User is not active yet, verify email first.' })
  }
});

router.post("/updateProfile", protect, upload.single('pozaProfil'), async (req, res) => {
  console.log(req.file.filename);
  const updateData = {
    username: req.body.username,
    displayName: req.body.displayName,
    email: req.body.email,
    phone: req.body.nrTelefon,
    dataNasterii: req.body.dataNasterii,
  }

  if (req.file) {
    updateData.profilePhoto = req.file.filename;
  }

  await User.updateOne({ _id: req.user.userId }, {
    $set: updateData
  })
  res.json('got it');
});

router.post('/updatePassword', protect, async (req, res) => {
  let user = await User.findOne({ _id: req.user.userId });
  let hashedPass = await bcrypt.hash(req.body.password, 10)

  let check = await bcrypt.compare(req.body.password, user.password);

  if (check) {
    res.json({ message: 'passwordIsSame' });
    console.log('password is same');
  } else {
    await User.updateOne({ _id: req.user.userId }, {
      password: hashedPass
    })
    console.log('password changed');
    res.json('password changed');
  }
})

router.post("/login", async (req, res) => {
  // checks if user exists
  let userFound = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.username }],
  });
  try {
    if (userFound !== null) {
      if (await bcrypt.compare(req.body.password, userFound.password)) {
        let signature = jwt.sign(
          { userId: userFound._id },
          process.env.SIGN_KEY,
          { expiresIn: "30d" },
        );
        console.log("setting cookie");
        res.cookie("userToken", signature, {
          httpOnly: true,
          secure: false,
          //   secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
        res.json({ message: "login successful" });
      } else {
        console.log("Wrong password");
        res.json({ message: "wrongPass" });
      }
    } else if (userFound === null) {
      console.log("no user with this name or email is associated");
      res.status(401).json({ status: "userNotFound" });
    }
  } catch (err) {
    res.json(err);
  }
});

router.post("/logout", protect, (req, res) => {
  res.clearCookie("userToken");
  res.json({ message: "logged out" });
});

router.get('/', admin, async (req, res) => {
  let userList = await User.find();
  res.send(userList);
});

router.get('/profile/qrCode', protect, async (req, res) => {
  const qrCodeReply = await QRCode.toDataURL(req.user.userId, { width: 500 });
  res.status(200).json({ imageUrl: qrCodeReply });
})

export default router;
