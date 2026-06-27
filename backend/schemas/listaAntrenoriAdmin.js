import {Schema, model} from 'mongoose';

let antrenor = new Schema({
    numeAntrenor: {type: String, required: true}
});

const Antrenor = model('Antrenor', antrenor);
export default Antrenor;