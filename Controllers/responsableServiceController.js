const Responsable = require('../models/responsableService')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const responsableService = require('../models/responsableService')
require('dotenv').config()

var url = process.env.URL

exports.register=(Username,Email,Password,DateBirth,IdService,IdAdmin)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return responsableService.findOne({email:Email})
        }).then((doc)=>{
            if(doc){
                mongoose.disconnect()
                reject('this Responsable  exist')
            }else{
                bcrypt.hash(Password,10).then((hashPassword)=>{
                    let new_responsable = Responsable({
                        username:Username,
                        email:Email,
                        password:hashPassword,
                        dateBirth:DateBirth,
                        role:'responsableService',
                        idService:IdService,
                        idAdmin:IdAdmin
                    })
                    new_responsable.save().then((Responsable)=>{
                        mongoose.disconnect
                        resolve(Responsable)
                    }).catch((err)=>{
                        mongoose.disconnect
                        reject(err)
                    })
                }).catch((err)=>{
                        mongoose.disconnect
                        reject(err)
                })
            }
        })
    })
}

exports.getResponsableService=(id)=>{ 
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return responsableService.find({idAdmin:id})
            .then((responsable)=>{
                mongoose.disconnect
                resolve(responsable)
            }).catch((err)=>{
                mongoose.disconnect
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
}


exports.updateOneResponsable=(id,Username,Email,DateBirth,IdService)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return responsableService.updateOne({_id : id},{
                username:Username,
                email:Email,
                dateBirth:DateBirth,
                idService:IdService

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
exports.getResponsablesCountByService = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            Responsable.aggregate([
                {
                    $group: {
                        _id: '$idService',
                        count: { $sum: 1 }
                    }
                }
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
            reject(`Error connecting to database: ${error.message}`)
        })
    })
}
