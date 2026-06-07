import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import createServer from 'express';
import mongoose from 'mongoose';

const server = createServer();
mongoose.connect(`${process.env.MONGO_URI}`).then(() => console.log('worked')).catch((err) => console.log(err))

let port = process.env.PORT;

server.get('/index', (req, res) => {
    console.log(req)
    res.send('test');
})

server.listen(port, () => {
    console.log(`Server up and running on ${port}`)
})