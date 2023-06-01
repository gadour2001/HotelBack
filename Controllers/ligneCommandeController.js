const LigneCommande = require ('../models/ligneCommande')
const Commande = require ('../models/commande')
const Command = require ('../Controllers/commandeController')
const MaterialProduct = require ('../models/materialProduct')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()

var url = process.env.URL 

exports.postNewLigneCommande=(Quantite,IdCommande,IdProduct)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{

                let new_ligneCommande = LigneCommande({
                    quantite:Quantite,
                    idCommande:IdCommande,
                    idProduct:IdProduct
                })
                new_ligneCommande.save().then((done)=>{
                    resolve(done)
                    mongoose.disconnect()
                }).catch((err)=>{
                    mongoose.disconnect()
                    reject(err)
                })
        }).catch((err)=>reject(err))
    })
}

exports.getLigneCommande=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{  
            return LigneCommande.find({idCommande : id}).populate('idProduct')

            .then((done)=>{
                mongoose.disconnect()
                resolve(done)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
} 

exports.get=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return LigneCommande.find({_id : id}).populate('idProduct')

            .then((done)=>{
                mongoose.disconnect()
                resolve(done)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
} 

exports.deleteOneLigneCommande = (id) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url)
        .then(() => {
          LigneCommande.findById(id)
            .then((deletedLigneCommande) => {
              if (!deletedLigneCommande) {
                mongoose.disconnect();
                reject("LigneCommande not found");
              } else {
                const ProductId = deletedLigneCommande.idProduct
                const commandeId = deletedLigneCommande.idCommande
                MaterialProduct.findById(ProductId)
                  .then((materialProduct) => {
                    console.log(materialProduct);
                    if (!materialProduct) {
                      mongoose.disconnect();
                      reject("MaterialProduct not found"); 
                    } else {
                        console.log(materialProduct.prix);
                        console.log(deletedLigneCommande.quantite);
                        const ligneCommandePrice = materialProduct.prix * deletedLigneCommande.quantite;
                      LigneCommande.deleteOne({ _id: id })
                        .then(() => {
                            Commande.findByIdAndUpdate(
                                commandeId,
                                { $inc: { prixTotal: -ligneCommandePrice } },
                                { new: true }
                            )
                            .then((updatedCommande) => {
                              if (!updatedCommande) {
                                mongoose.disconnect();
                                reject("Commande not found");
                              } else {
                                mongoose.disconnect();
                                resolve("LigneCommande deleted and Commande updated successfully");
                              }
                            })
                            .catch((err) => {
                              mongoose.disconnect();
                              reject(err);
                            });
                        })
                        .catch((err) => {
                          mongoose.disconnect();
                          reject(err);
                        });
                    }
                  })
                  .catch((err) => {
                    mongoose.disconnect();
                    reject(err);
                  });
              }
            })
            .catch((err) => {
              mongoose.disconnect();
              reject(err);
            });
        })
        .catch((err) => reject(err));
    });
  };

exports.deleteLigneCommande=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return LigneCommande.deleteMany({idCommande : id})

            .then((done)=>{
                mongoose.disconnect()
                resolve(done)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
}

