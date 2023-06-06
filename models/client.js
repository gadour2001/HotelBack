const mongoose = require('mongoose');
const user = require('./user');
const { boolean } = require('joi');
mongoose.set('strictQuery', false)

let clientSchema = mongoose.Schema({
        idPassport : String,
        solde:Number,
        dateEntre:Date,
        nbrJour:Number,
        numChambre:Number,
        isActive:Boolean,
        idResponsableClient : {
          type: mongoose.Schema.Types.ObjectId,
          ref : 'responsableClient'
        },
        verificationCode:String,
        log:Boolean
})
module.exports = user.discriminator('client', clientSchema);