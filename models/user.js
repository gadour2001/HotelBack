const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    dateBirth:Date,
    role:{
        type:String,
        enum:['admin','responsableService','client', 'superAdmin', 'responsableClient']
    },
    
});

module.exports =  User = mongoose.model('user',userSchema)


