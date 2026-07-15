import {Schema, model} from 'mongoose';

let clasa = new Schema({
    nume: {type: String, required: true, unique: true},
    imagine: {type: String, required: true, default: ''},
    descriere: {type: String, required: true, default: ''},
    extraDescrieri: [
        {descriere: {type: String, required: false}}
    ]
});

const Clasa = model('Clase', clasa);
export default Clasa;