const mongoose = require('mongoose');
const transaction = require('./transaction');
const { date } = require('joi');
mongoose.set('strictQuery', false)

let  reservationSchema = mongoose.Schema({
    nbPlace : Number,
    horaire:Date,
    idServiceProduct : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'serviceProduct'
    },
})
module.exports = Reservation = transaction.discriminator('reservation', reservationSchema);



