import express from "express";
import User from "../schemas/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protect, admin } from "./auth.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  console.log('test');
  let userCheck = await User.findOne({ username: req.body.username });
  if (userCheck === null) {
    let hashedPass = await bcrypt.hash(req.body.password, 10);
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
    res.json({ message: "User already exists." });
    console.log("user already exists");
  }
});

router.get("/profile", protect, async (req, res) => {
  let userData = await User.findOne({ username: req.user.username }).select(
    "-password",
  );
  res.json({ status: "authorised", userData });
});

router.post("/login", async (req, res) => {
  // checks if user exists
  let userFound = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.username }],
  });
  try {
    if (userFound !== null) {
      if (await bcrypt.compare(req.body.password, userFound.password)) {
        let signature = jwt.sign(
          { username: userFound.username },
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
