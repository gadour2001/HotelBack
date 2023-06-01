const mongoose = require('mongoose')
require('dotenv').config()
 
let ligneCommandeSchema = mongoose.Schema({
    quantite:String,
    idCommande:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'commande'
    },
    idProduct:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'materialProduct'
    }
    
})

module.exports = ligneCommande = mongoose.model('ligneCommande',ligneCommandeSchema)

