import mongoose from "mongoose";
const { Schema, model } = mongoose;

const user = new Schema({
    id: Number,
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    isAdmin: { type: Boolean, default: false },
    phone: {type: String, required: true},
    profileImage: {type: String, required: false},
    activeSubscriptions: [
        {
            quantity: {type: String, required: false},
            subscriptionName: {type: String, required: false}
        }
    ]
})

const User = model('User', user);
export default User;