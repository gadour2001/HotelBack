const mongoose = require('mongoose')
const transaction = require('./transaction')


let  commandeSchema = mongoose.Schema({
    numtable : String
})
module.exports = transaction.discriminator('commande', commandeSchema);