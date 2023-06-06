const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
require('dotenv').config();
const responsableClient = require ('../models/responsableClient')
const Client = require('../models/client')
const url = process.env.URL 


exports.register=(Username,Email,Password,DateBirth,IdAdmin)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return responsableClient.findOne({email:Email})
        }).then((doc)=>{
            if(doc){
                mongoose.disconnect()
                reject('this ResponsableClient   exist')
            }else{
                bcrypt.hash(Password,10).then((hashPassword)=>{
                    let new_responsableClient = responsableClient({
                        username:Username,
                        email:Email,
                        password:hashPassword,
                        dateBirth:DateBirth,
                        role:'responsableClient',
                        idAdmin:IdAdmin
                    })
                    new_responsableClient.save().then((ResponsableClient)=>{
                        mongoose.disconnect
                        resolve(ResponsableClient)
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


exports.getResponsableClient=(id)=>{ 
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return responsableClient.find({idAdmin:id})
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

exports.updateOneResponsableClient=(id,Username,Email,Password,DateBirth)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return responsableClient.updateOne({_id : id},{
                username:Username,
                email:Email,
                password:Password,
                dateBirth:DateBirth,

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

exports.updateClientSolde = (email, newSolde) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
        .then(() => {
            Client.findOne({ email })
            .then((client) => {
            if (!client) {
                return reject('Client not found');
            }

                client.solde = newSolde;

              // Save the updated client
                return client.save()
            })
            .then((updatedClient) => {
                mongoose.disconnect()
                resolve(updatedClient)
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