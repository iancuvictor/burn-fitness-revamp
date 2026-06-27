import {Schema, model} from 'mongoose';

let clasa = new Schema({
    numeClasa: {type: String, required: true}
});

const Clasa = model('Clase', clasa);
export default Clasa;