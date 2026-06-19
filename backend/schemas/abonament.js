import mongoose, { Schema, model } from "mongoose";

const abonament = new Schema({
    highlighted: {type: Boolean, required: false},
    reducereAplicabila: {type: Boolean, required: false},
    tier: {type: String, required: true},
    titlu: {type: String, required: true},
    desc: {type: String, required: false},
    preturi: [
        {pret: {type: Number, required: true}, duratie: {type: Number, required: true}}
    ],
    // imagine: {type: String, required: false}
})

const Abonament = model('Abonament', abonament);
export default Abonament;