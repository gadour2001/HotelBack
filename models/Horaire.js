const mongoose = require('mongoose')

let horaireSchema = mongoose.Schema({ 
    idServiceProduct : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'serviceProduct'
    },
})

module.exports = Horaire =  mongoose.model('horaire',horaireSchema)