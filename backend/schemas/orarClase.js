import mongoose, {Schema, model} from "mongoose";

const orar = new Schema({
            locatie: {type: String, required: true},
            zi: {type: String, required: true},
            ora: {type: String, required: true},
            data: {type: Date, required: true},
            denumire: {type: String, required: true},
            antrenor: {type: String, required: true},
            capacitate: {type: Number, required: true},
            inscrisi: {type: Number, default: 0}
})


const Orar = model('Orar', orar);
export default Orar;