'use strict'

let mongoose = require('mongoose');
let schema = mongoose.schema

const catalogueSchema  = schema({
    nombre:String,
presentacion:String,
precio:String,
sku:String,
Categoria:ObjectId,
Linea:ObjectId,
})
mongoose.model('catalogo',catalogueSchema)