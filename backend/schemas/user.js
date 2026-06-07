import mongoose from "mongoose";
const { Schema, model } = mongoose;

const user = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    phone: Number,
    profileImage: String,
    activeSubscriptions: [
        {
            quantity: Number,
            subscriptionName: String
        }
    ]
})

const User = model('User', user);
export default User;