const mongoose = require('mongoose')


let productSchema = mongoose.Schema({
    name:String,
    description:String,
    prix: Number,
    image : String,
    idCategorie:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
    },
})

module.exports = Product = mongoose.model('product',productSchema)


