import mongoose, {Schema, model} from "mongoose";

const orar = new Schema({
            locatie: {type: String, required: true},
            zi: {type: String, required: true},
            data: {type: Date, required: true},
            denumire: {type: String, required: true},
            antrenor: {type: String, required: true},
            capacitate: {type: Number, required: true},
            inscrisi: [
                {numeClient: {type: String, required: true},
                idClient: {type: String, required: true}}
            ],
            expiryDate: {type: Date, expires: 0}
})


const Orar = model('Orar', orar);
export default Orar;