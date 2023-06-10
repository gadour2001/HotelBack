const mongoose = require('mongoose')

let categorySchema = mongoose.Schema({
    name:String,
    description:String, 
    image: String,
    type:{
        type:String,
        enum:['service' , 'material']
    }, 
    idService:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'service',
    }
}) 

module.exports =  Category = mongoose.model('category',categorySchema)