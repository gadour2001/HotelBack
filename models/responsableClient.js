const mongoose = require('mongoose');
const user = require('./user');
mongoose.set('strictQuery', false)

let responsableClientSchema = mongoose.Schema({
        idAdmin : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Admin'
        }
})
module.exports = responsableClient =  user.discriminator('responsableClient', responsableClientSchema);