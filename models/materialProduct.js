const mongoose = require('mongoose');
const product = require('./product');
mongoose.set('strictQuery', false)

let materialProductSchema = mongoose.Schema({
    quantity : Number,
})
module.exports = materialProduct = product.discriminator('materialProduct', materialProductSchema);