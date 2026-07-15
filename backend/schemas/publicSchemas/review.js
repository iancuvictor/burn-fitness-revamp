import { Schema, model } from "mongoose";

const review = new Schema({
    sala: {type: String, required: true},
    nume: {type: String, required: true},
    comentariu: {type: String, required: true},
    stele: {type: Number, required: true},

});

const Review = model('review', review)
export default Review;