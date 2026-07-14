import {Schema, model} from 'mongoose';

let clasa = new Schema({
    nume: {type: String, required: true},
    imagine: {type: String, required: true, default: ''},
    descriere: {type: String, required: true, default: ''},
});

const Clasa = model('Clase', clasa);
export default Clasa;