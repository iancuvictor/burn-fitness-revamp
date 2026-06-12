import mongoose, {Schema, model} from "mongoose";

const orar = new Schema({
            locatie: {type: String, required: true},
            zi: {type: String, required: true},
            ora: {type: String, required: true},
            denumire: {type: String, required: true},
            antrenor: {type: String, required: true},
            capacitate: {type: Number, required: true}
})


const Orar = model('Orar', orar);
export default Orar;