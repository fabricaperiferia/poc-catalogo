
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catalogo= Schema({
    nombre:{type:String}
})
module.exports = mongoose.model('catalogo', catalogo)