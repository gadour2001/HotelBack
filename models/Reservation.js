const mongoose = require('mongoose');
const transaction = require('./transaction');
mongoose.set('strictQuery', false)

let  reservationSchema = mongoose.Schema({
    numTable : String,
})
module.exports = Reservation = transaction.discriminator('Reservation', reservationSchema);



