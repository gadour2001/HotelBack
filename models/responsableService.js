const mongoose = require('mongoose');
const user = require('./user');

let responsableServiceSchema = mongoose.Schema({

        idService :{
            type:mongoose.Schema.Types.ObjectId,
            ref:'service',
        },
        idAdmin : {
            type : mongoose.Schema.Types.ObjectId,
            ref :'Admin'
        }

        
})
module.exports = responsableService = user.discriminator('responsableService', responsableServiceSchema); 