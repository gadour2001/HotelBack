const ServiceProduct = require('../models/serviceProduct')
const Horaire = require ('../models/Horaire')
const Seance = require('../models/Seance')
const mongoose = require('mongoose')
require('dotenv').config()
 

var url = process.env.URL

exports.postNewServiceProduct=(Name,Description,Prix,Image,IdCategory,duree,nbPlace)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            let new_product = ServiceProduct({ 
                name:Name,
                description:Description,
                prix:Prix,
                image : Image,
                idCategorie:IdCategory,
                duree:duree,
                nbPlace:nbPlace,
            })
            new_product.save().then((product)=>{
                        let X = 8
                        while (X <= 18){
                            console.log(X);
                            let new_seance = Seance({
                                time: setTime(X),
                                etat:true,
                                idServiceProduct:product._id,
                            })
                            new_seance.save().then((done)=>{
                                console.log('mrgll')
                                
                            }).catch((err)=>{
                                console.log(err)
                            })
                            X = X + duree
                        }
                        resolve('fini')
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        }).catch((err)=>reject(err)) 
    })
}

function setTime(hour) {
    const date = new Date(); // Get the current date
    date.setHours(hour, 0, 0, 0); // Set the hour
    return date;
  }

exports.updateOneServiceProduct=(id,Name,Description,Prix,Image,idCategory,duree,nbPlace)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return ServiceProduct.updateOne({_id : id},{
                name:Name,
                description:Description,
                prix:Prix,
                image:Image,
                idCategorie:idCategory,
                duree:duree,
                nbPlace:nbPlace,

            }).then((done)=>{
                mongoose.disconnect()
                resolve(done)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
}