const mongoose = require('mongoose')


let serviceSchema = mongoose.Schema({
    name:String,
    description:String,
    image:String,
    isActive:Boolean,
    idAdmin : {
        type : mongoose.Schema.Types.ObjectId,
        ref :'Admin'
    }

}) 

module.exports = Service = mongoose.model('service',serviceSchema)

