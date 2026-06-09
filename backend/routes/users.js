import express from "express";
import User from "../schemas/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protect } from "./auth.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);
  let hashedPass = await bcrypt.hash(req.body.password, 10);
  try {
    await User.create({
      username: req.body.username,
      password: hashedPass,
      email: req.body.email,
    });
    console.log(`User with username: ${req.body.username} has registered now.`);
  } catch (err) {
    console.log(err);
    return res.json({ message: "error creating user" });
  }
  res.json({ message: "user created" });
});

router.get('/profile', protect, (req, res) => {
    console.log(req.body);
    res.json({status: 'authorised'});
})

router.post("/login", async (req, res) => {
  // checks if user exists
  let userFound = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });
  // try catch so it doesn't crash
  try {
    if (userFound !== null) {
      if (await bcrypt.compare(req.body.password, userFound.password)) {
        let signature = jwt.sign(
          { username: userFound.username },
          process.env.SIGN_KEY,
          { expiresIn: "30d" },
        );
        console.log('setting cookie')
        res.cookie("userToken", signature, {
          httpOnly: true,
          secure: false,
        //   secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
        res.json({ message: "login successful" });
      } else {
        console.log("Wrong password");
        res.json("Wrong password");
      }
    } else if (userFound === null) {
      console.log("no user with this name or email is associated");
      res.json("User not found");
    }
  } catch (err) {
    // console.log(err);
    res.json(err);
  }
});

export default router;
