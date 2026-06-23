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
            subscription: {type: String, required: true},
            subscriptionName: {type: String, required: true},
            price: {type: Number, required: true},
            duration: {type: Number, required: true},
            purchaseDate: {type: Date, required: true},
            expiryDate: {type: Date, required: true},
        }
    ]
})

const User = model('User', user);
export default User;