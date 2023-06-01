const mongoose = require('mongoose')

let transactionSchema = mongoose.Schema({ 
    date: Date,
    prixTotal:Number,
    etat:{
        type:String,
        enum:['en attente' , 'en cours' , 'fini' , 'annuler']
    }, 
    idClient:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'client',
    },
    idService:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'service',
    },
    

})

module.exports = Transaction =  mongoose.model('transaction',transactionSchema)


