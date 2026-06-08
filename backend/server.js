import dotenv from "dotenv";
dotenv.config();
import express from "express";
import createServer from "express";
import mongoose from "mongoose";
import User from "./schemas/user.js";

const server = createServer();
let port = process.env.PORT;

server.use(express.json())

server.listen(port, () => {
      console.log(`Server up and running on ${port}`);
    });

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log("Burn Fitness Cluj DB Connected successfuly");
  })
  .catch((err) => console.log(err));


server.get("/api/users", (req, res) => {
  res.send(users);
});

server.post('/api/users/register', async (req, res) => {
    console.log(req.body);
    try {
        await User.create({ username: req.body.username, password: req.body.password, email: req.body.email })
    } catch(err) {
        console.log(err)
        return res.json({ message: 'error creating user' })
    }
    res.json({ message: 'user created' })
});