const Commande = require ('../models/commande')
const LigneCommande = require ('../models/ligneCommande')
const Ligne = require ('../Controllers/ligneCommandeController')
const mongoose = require('mongoose')
const product = require('../Controllers/materialProductController')
const client = require('../models/client')
require('dotenv').config()

const url = process.env.URL  

exports.postNewCommande = (PrixTotal, IdClient, IdService, numtable, LigneCommandes) => {
    return mongoose.connect(url)
      .then(() => {
        let new_commande = Commande({
          date:  (Date.now()+(60*60*1000)),
          prixTotal: PrixTotal,
          etat: 'en attente',
          idClient: IdClient,
          idService: IdService,
          numtable: numtable
        })
        return client.findById(IdClient).then((clientt) => {
            return  client.findByIdAndUpdate(IdClient , {solde : parseFloat(clientt.solde) - parseFloat(PrixTotal)})
            .then(() => {
                return new_commande.save()
                .then((done) => {
                    const saveLigneCommandes = LigneCommandes.map((ligne) => {
                    let new_ligneCommande = LigneCommande({
                        quantite: ligne.quantity,
                        idCommande: done._id,
                        idProduct: ligne._id
                    });
        
                    return new_ligneCommande.save()
                        .then(() => {
                        return materialProduct.findById(ligne._id)
                            .then((res) => {
                            if (res.quantity !== -1) {
                                return materialProduct.updateOne({ _id: ligne._id }, {
                                quantity: parseInt(res.quantity) - parseInt(ligne.quantity)
                                })
                            }
                            })
                        })
                    })
        
                    return Promise.all(saveLigneCommandes)
                    .then(() => {
                        mongoose.disconnect()
                        console.log('Commande saved successfully')
                    })
                })
                .catch((err) => {
                    mongoose.disconnect()
                    throw err
                })
            })
      .catch((err) => {
        throw err
      })
    })
  })
}

// getCommande(idClient)
exports.getOrderByClientId = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).
        then(() => {
            Commande.find({idClient:id , etat:[ "fini" , "en attente" , "en cours"]}).sort({ date: -1 }) .then((commands) => {
                mongoose.disconnect();
                resolve(commands);
            }).catch((error) => {
                mongoose.disconnect();
                reject(error);
            });
        }).catch((error) => {
            reject(`Error fetching client: ${error.message}`);
        });
    })
}

exports.getOrderByServiceIdfini = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {

            Commande.find({idService:id , etat:["fini" , "annuler"]}).sort({ date: -1 }) .then((commands) => {
                resolve(commands)
                mongoose.disconnect() 
            }).catch((error) => {
                reject(error)
                mongoose.disconnect()
            }) 
        }).catch((error) => {
            reject(`Error fetching client: ${error.message}`)
        })
    })
}

// getCommande(idService)
exports.getOrderByServiceId = (id) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url).then(() => {
        return Commande.find({ idService: id, etat: ["en attente", "en cours"] })
          .sort({ date: 1 }) 
          .then((commands) => {
            mongoose.disconnect();
            resolve(commands);
          })
          .catch((error) => {
            mongoose.disconnect();
            reject(error);
          });
      }).catch((error) => {
        reject(`Error fetching client: ${error.message}`)
      })
    })
  }

exports.getOrderById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Commande.findById(id)
            
            .then((commands) => {
                mongoose.disconnect()
                resolve(commands)
            }).catch((error) => {
                mongoose.disconnect()
                reject(error)
            });
        }).catch((error) => {
            reject(`Error fetching client: ${error.message}`)
        })
    })
}

exports.updateOrderStatus = (orderId, newStatus) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
        .then(() => {
            Commande.findByIdAndUpdate(orderId, { etat: newStatus }, { new: true })
            .then((updatedOrder) => {
                mongoose.disconnect()
                resolve(updatedOrder)
            })
            .catch((error) => {
                mongoose.disconnect()
                reject(error)
            })
        }).catch((error) => {
            reject(`Error connecting to database: ${error.message}`)
        })
    })
}

exports.deleteOneCommande=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Commande.findByIdAndDelete(id)

            .then((done)=>{
                LigneCommande.deleteMany({idCommande : id})
                .then((res) => {
                    mongoose.disconnect()
                    resolve(res)
                }).catch((err)=>{
                    mongoose.disconnect()
                    reject(err)
                })
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
}

exports.updateOneCommande=(id,PrixTotal)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Commande.updateOne({_id : id},{
                    prixTotal:PrixTotal,
            }).then((done)=>{
                mongoose.disconnect
                resolve(done)
            }).catch((err)=>{
                mongoose.disconnect
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
}

exports.getTotalRevenueByService = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
        .then(() => {
            Commande.aggregate([
                {
                    $group: {
                        _id: '$idService',
                        totalRevenue: { $sum: '$prixTotal' },
                    },
                },
                {
                    $lookup: {
                        from: 'services',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'service',
                    },
                },
                {
                    $unwind: '$service',
                },
                {
                    $project: {
                        serviceName: '$service.name',
                        totalRevenue: 1,
                        _id: 0,
                    },
                },
            ])
            .then((result) => {
                mongoose.disconnect()
                resolve(result)
            })
            .catch((error) => {
                mongoose.disconnect()
                reject(error)
            })
        })
        .catch((error) => {
            reject(`Error connecting to database: ${error.message}`);
        })
    })
}

exports.getAverageOrderTotalByClient = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
        .then(() => {
            Commande.aggregate([
                {
                    $group: {
                        _id: '$idClient',
                        averageOrderTotal: { $avg: '$prixTotal' },
                    },
                },
                {
                    $lookup: {
                        from: 'clients',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'client',
                    },
                },
                {
                    $unwind: '$client',
                },
                {
                    $project: {
                        clientName: '$client.name',
                        averageOrderTotal: 1,
                        _id: 0,
                    },
                },
            ])
            .then((result) => {
                mongoose.disconnect();
                resolve(result);
            })
            .catch((error) => {
                mongoose.disconnect();
                reject(error);
            });
        })
        .catch((error) => {
            reject(`Error connecting to database: ${error.message}`);
        });
    });
};

exports.getOrdersCountAndTotalPriceByServiceAndDate = (serviceId, date) => {
    return new Promise((resolve, reject) => {
      const startOfDay = new Date(date);
      startOfDay.setUTCHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);
      
      mongoose.connect(url)
        .then(() => {
          Commande.aggregate([
            {
              $match: {
                    idService: serviceId,
                    date: {
                        $gte: startOfDay,
                        $lte: endOfDay
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    orderCount: { $sum: 1 },
                    totalPrice: { $sum: '$prixTotal' }
                }
            },
            {
                $project: {
                    _id: 0,
                    orderCount: 1,
                    totalPrice: 1
                }
            }
            ])
            .then((result) => {
                mongoose.disconnect();
                resolve(result[0]);
            })
            .catch((error) => {
                mongoose.disconnect();
                reject(error);
            });
        })
        .catch((error) => {
            reject(`Error connecting to database: ${error.message}`);
        });
    });
};