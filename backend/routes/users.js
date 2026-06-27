import express from "express";
import User from "../schemas/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protect, admin } from "./auth.js";
const router = express.Router();

import multer from 'multer';
const UPLOAD_PATH = process.env.FOLDER_UPLOADS_POZEPROFIL;

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
  // check if user exists
  if (userCheck === null) {
    // hash password BEFORE adding to the database
    let hashedPass = await bcrypt.hash(req.body.password, 10);
    //try catch so no crash
    try {
      await User.create({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.nrTel,
        password: hashedPass,
      });
      console.log(
        `User with username: ${req.body.username} has registered now.`,
      );
    } catch (err) {
      console.log(err);
      res.json({ message: "error creating user" });
    }
    res.json({ message: "user created" });
  } else {
    // user already exists
    res.json({ message: "User already exists." });
    console.log("user already exists");
  }
});

router.get("/profile", protect, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.userId }).select(
    "-password",
  );
  res.json({ status: "authorised", userData });
});

router.post("/updateProfile", protect, upload.single('pozaProfil'), async (req, res) => {
  const updateData = {
    username: req.body.username,
    displayName: req.body.displayName,
      email: req.body.email,
      phone: req.body.nrTelefon,
      dataNasterii: req.body.dataNasterii,
  }
  
  if(req.file){
    updateData.profilePhoto = req.file.filename;
  }

  await User.updateOne({_id: req.user.userId}, {
    $set: updateData
  })
  res.json('got it');
});

router.post('/updatePassword', protect, async (req, res) => {
  let user = await User.findOne({_id: req.user.userId});
  let hashedPass = await bcrypt.hash(req.body.password, 10)

  let check = await bcrypt.compare(req.body.password, user.password);

  if(check){
    res.json({message: 'passwordIsSame'});
    console.log('password is same');
  } else {
    await User.updateOne({_id: req.user.userId}, {
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

export default router;
