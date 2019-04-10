
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catalogo= Schema({
    nombre:String,
    precio:String,
    presentacion:String,
    categoria:String,
    descripción:String,
    imagen:String,
    cantidad:Number
   })
module.exports = mongoose.model('catalogo', catalogo)