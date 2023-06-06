const mongoose = require('mongoose'); 
const product = require('./product');
mongoose.set('strictQuery', false)

let serviceProductSchema = mongoose.Schema({
    duree:Number,
    nbPlace:Number,
})
module.exports = serviceProduct = product.discriminator('serviceProduct', serviceProductSchema);