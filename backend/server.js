import dotenv from "dotenv";
dotenv.config();
import express from "express";
import createServer from "express";
import mongoose from "mongoose";
import User from "./schemas/user.js";
import bcrypt from 'bcrypt';

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
    let hashedPass = await bcrypt.hash(req.body.password, 10)
    try {
        await User.create({ username: req.body.username, password: hashedPass, email: req.body.email });
        console.log(`User with username: ${req.body.username} has registered now.`)
    } catch(err) {
        console.log(err)
        return res.json({ message: 'error creating user' })
    }
    res.json({ message: 'user created' })
});

server.post('/api/users/login', async (req, res) => {
    // checks if user exists
    let userFound = await User.findOne({$or: [{username: req.body.username},{ email: req.body.email}]})
    // try catch so it doesn't crash
    try {
        if(userFound !== null){
            if(await bcrypt.compare(req.body.password, userFound.password)){
                console.log('Access permited');
                res.json('Access permited');
            } else {
                console.log('Wrong password');
                res.json('Wrong password');
            }
        } else if(userFound === null){
            console.log('no user with this name or email is associated');
            res.json('User not found');
        }
    } catch(err) {
        // console.log(err);
        res.json(err);
    }
});