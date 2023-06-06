const Reservation = require ('../models/Reservation')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()

var url = process.env.URL

exports.postNewReservation=(PrixTotal, IdClient, IdService,Horaire,NbPlace,idProduct)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{

                let new_Reservation = Reservation({
                    date: Date.now(),
                    prixTotal: PrixTotal,
                    etat: 'en attente',
                    idClient: IdClient,
                    idService: IdService,
                    nbPlace:NbPlace,
                    idServiceProduct:idProduct,
                    horaire:Horaire
                })
                new_Reservation.save().then((done)=>{
                    mongoose.disconnect
                    resolve(done)
                }).catch((err)=>{
                    mongoose.disconnect
                    reject(err)
                })
        })
    }).catch((err)=>reject(err))
}

exports.deleteOneReservation=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Reservation.deleteOne({_id : id})

            .then((done)=>{
                mongoose.disconnect
                resolve(done)
            }).catch((err)=>{
                mongoose.disconnect
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
}

exports.updateOneReservation=(id,Duree,Horaire,NbPlace)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Reservation.updateOne({_id : id},{
                    nbPlace:NbPlace,
                    duree:Duree,
                    horaire:Horaire

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

exports.getReservationByClientId = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).
        then(() => {
            Reservation.find({idClient:id , etat:[ "fini" , "en attente"]}).sort({ date: -1 }) .then((reservation) => {
                mongoose.disconnect();
                resolve(reservation);
            }).catch((error) => {
                mongoose.disconnect();
                reject(error);
            });
        }).catch((error) => {
            reject(`Error fetching client: ${error.message}`);
        });
    })
}

exports.getReservationByServiceIdfini = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {

            return Reservation.find({idService:id , etat:["fini" , "annuler"]}).sort({ date: -1 }) .then((reservation) => {
                resolve(reservation)
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
exports.getReservationByServiceId = (id) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url).then(() => {
        return Reservation.find({ idService: id, etat: ["en attente"] })
          .sort({ date: 1 }) 
          .then((reservation) => {
            mongoose.disconnect();
            resolve(reservation);
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