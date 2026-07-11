import mongoose from "mongoose";
const { Schema, model } = mongoose;

const user = new Schema({
    id: Number,
    isAdmin: { type: Boolean, default: false },
    username: {type: String, required: true, unique: true},
    displayName: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    active: {type: Boolean, required: true, default: false},
    // extras
    profilePhoto: {type: String, required: false},
    dataNasterii: {type: Date, required: false},
    activeSubscriptions: [
        {
            subscriptionId: {type: String, required: true},
            subscriptionName: {type: String, required: true},
            price: {type: Number, required: true},
            duration: {type: Number, required: true},
            purchaseDate: {type: Date, required: true},
            expiryDate: {type: Date, required: true},
        }
    ],
    activeClasses: [
        {
            classId: {type: String, required: true},
            className: {type: String, required: true},
            price: {type: Number, required: false},
            date: {type: Date, required: true},
            antrenor: {type: String, required: true},
            locatie: {type: String, required: true},
            zi: {type: String, required: true},
            ora: {type: String, required: true}
        }
    ]
})

const User = model('User', user);
export default User;