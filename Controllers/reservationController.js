const Reservation = require ('../models/Reservation')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()

var url = process.env.URL

exports.postNewReservation=(Duree,Horaire,NbPlace)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{

                let new_ligneReservation = Reservation({
                    nbPlace:NbPlace,
                    duree:Duree,
                    idProduit:'0',
                    horaire:Horaire
                })
                new_ligneReservation.save().then((done)=>{
                    mongoose.disconnect
                    resolve(done)
                }).catch((err)=>{
                    mongoose.disconnect
                    reject(err)
                })
        })
    }).catch((err)=>reject(err))
}

exports.getAllReservation=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Reservation.find()

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

exports.deleteOneLigneReservation=(id)=>{
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