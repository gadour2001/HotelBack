const mongoose = require('mongoose')

let seanceSchema = mongoose.Schema({ 
    time: Date,
    idServiceProduct : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'serviceProduct'
    },
})

module.exports = Seance =  mongoose.model('seance',seanceSchema)