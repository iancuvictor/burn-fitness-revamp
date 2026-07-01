import { Schema, model } from 'mongoose';

const antrenorSala = new Schema({
    nume: {type: String, required: true},
    sali: [
        {sala: {type: String, required: true}}
    ],
    functii: [
        {functie: {type: String, required: false}}
    ],
    calificari: [
        {calificare: {type: String, required: false}}
    ],
    descriere: {type: String, required: true},
    pozaProfil: {type: String, required: true},
})

const AntrenorSala = model('AntrenoriSala', antrenorSala);
export default AntrenorSala;