
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catalogo= Schema({
    nombre:String,
    precio:String,
    presentacion:String,
    categoria:String,
   })
module.exports = mongoose.model('catalogo', catalogo)