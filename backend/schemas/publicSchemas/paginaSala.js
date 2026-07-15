import { Schema, model } from "mongoose";

const paginaSala = new Schema({
    sala: {type: String, required: true},
    descriere: {type: String, required: false},
});

const PaginaSala = model('paginaSala', paginaSala)
export default PaginaSala;