import express from "express";
import User from "../schemas/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protect, admin } from "./auth.js";
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'burnFitness/pozeProfil',
    public_id: (req, file) => req.user.userId + '_pozaProfil',
  },
});

const upload = multer({ storage });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "burnclujfake@gmail.com",
    pass: process.env.MAIL_PASS,
  },
  family: 4
});

router.post("/register", async (req, res) => {
  const checkUsername = await User.findOne({ username: req.body.username });
  const checkEmail = await User.findOne({ email: req.body.email });
  const checkPhone = await User.findOne({ phone: req.body.nrTel });

  if (checkUsername === null && checkEmail === null && checkPhone === null) {
    let hashedPass = await bcrypt.hash(req.body.password, 10);
    try {
      let jwtToken = jwt.sign({ userEmail: req.body.email }, process.env.SIGN_KEY, { expiresIn: "30min" })
      await User.create({
        username: req.body.username,
        displayName: req.body.username,
        email: req.body.email,
        phone: req.body.nrTel,
        password: hashedPass,
        active: false,
      });
      try{
      await transporter.sendMail({
        from: "burnclujfake@gmail.com",
        to: req.body.email,
        subject: "Bine ai venit la Burn Fitness Cluj-Napoca!",
        html: `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#000;">
  <tr>
    <td align="center">
      <table width="300" cellpadding="0" cellspacing="0" border="0" style="background:#000; border-radius:10px; overflow:hidden;">
        <tr>
          <td align="center" bgcolor="#000000" style="background-image: linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000000 100%), url('https://i.imgur.com/YOUR_HEADER_IMAGE.jpg'); background-size: cover; background-position: center; height: 160px;">
            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:300px;height:160px;">
              <v:fill type="frame" src="https://www.burncluj.ro/wp-content/uploads/2023/02/bc3.jpeg" color="#000000" />
              <v:textbox inset="0,0,0,0"></v:textbox>
            </v:rect>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 25px 15px 10px 15px;">
            <h1 style="font-family: Arial; font-size: 24px; color: white; text-align: center; margin: 0;">Activează-ți contul!</h1>
          </td>
        </tr>
        <tr>
          <td style="font-family: Arial; font-size: 16px; color: white; text-align: justify; padding: 0 20px 25px 20px;">
            Deschide link-ul de mai jos în browser pentru a-ți activa contul! Dacă nu ai solicitat crearea unui cont, ignoră emailul!
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom: 30px;">
            <a href="${process.env.FRONTEND_URL}/activate/?token=${jwtToken}" 
               style="font-family: Arial; font-size: 16px; font-weight: bold; color: #fff; background-color: #E11D48; text-decoration: none; padding: 12px 28px; border-radius: 6px; display: inline-block;">
              Activează contul
            </a>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom: 20px;">
            <img src="https://i.imgur.com/h3SN8vo.png" width="150" style="display:block;" />
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>`,
      });
      console.log('email sent')
      res.status(201).json({ message: "User created, email sent" });
    } catch(err) {
      res.json({message: 'Error'});
      console.log(err);
    }
    } catch (err) {
      console.log(err);
      res.json({ message: "Error has occured" });
    }
  } else {
    switch (true) {
      case checkUsername !== null:
        res.status(409).json({ message: 'Username already exists', error: 'username' });
        break;
      case checkEmail !== null:
        res.status(409).json({ message: 'Email already exists', error: 'email' });
        break;
      case checkPhone !== null:
        res.status(409).json({ message: 'Phone already exists', error: 'phone' });
        break;
    }
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
    res.status(200).json({ message: 'User is now active' });
  } else {
    res.status(404).json({ message: 'User does not exist' });
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

  const updateData = {
    username: req.body.username,
    displayName: req.body.displayName,
    email: req.body.email,
    phone: req.body.nrTelefon,
    dataNasterii: req.body.dataNasterii,
  }

  if (req.file) {
    updateData.profilePhoto = req.file.path;
  }

  const checkUsername = await User.findOne({ username: req.body.username, _id: { $ne: req.user.userId } });
  const checkEmail = await User.findOne({ email: req.body.email, _id: { $ne: req.user.userId } });
  const checkPhone = await User.findOne({ phone: req.body.nrTelefon, _id: { $ne: req.user.userId } });

  if (checkUsername === null && checkEmail === null && checkPhone === null) {
    await User.updateOne({ _id: req.user.userId }, {
      $set: updateData
    })
    res.status(200).json('Profile updated');
  } else {
    switch (true) {
      case checkUsername !== null:
        res.status(409).json({ message: 'Username already exists', error: 'userName' });
        break;
      case checkEmail !== null:
        res.status(409).json({ message: 'Email already exists', error: 'email' });
        break;
      case checkPhone !== null:
        res.status(409).json({ message: 'Phone already exists', error: 'phone' });
        break;
    }
  }
});

router.post('/updatePassword', protect, async (req, res) => {
  let user = await User.findOne({ _id: req.user.userId });
  let hashedPass = await bcrypt.hash(req.body.password, 10)

  let check = await bcrypt.compare(hashedPass, user.password);

  if (check) {
    res.json({ message: 'passwordIsSame' });
  } else {
    await User.updateOne({ _id: req.user.userId }, {
      password: hashedPass
    })
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
        res.cookie("userToken", signature, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        res.json({ message: "login successful" });
      } else {
        res.json({ message: "wrongPass" });
      }
    } else if (userFound === null) {
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
