const Client = require('../models/client');
const bcrypt = require('bcrypt');
const nodemailer = require ('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.URL;


exports.register = (Username, Email, Password, DateBirth, IdPassport , idResp) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url)
        .then(() => {
          return Client.findOne({ email: Email })
        })
        .then((doc) => {
          if (doc) {
            mongoose.disconnect();
            reject('This client already exists')
          } else { 
            bcrypt
              .hash(Password, 10)
              .then((hashPassword) => {
                let new_user = new Client({
                  username: Username,
                  email: Email,
                  password: hashPassword,
                  dateBirth: DateBirth,
                  role:'client',
                  idPassport: IdPassport,
                  solde: 0,
                  dateEntre: Date.now(),
                  nbrJour:0,
                  numChambre:0,
                  isActive: false,
                  idResponsableClient:idResp
                })
                return new_user.save()
              })
              .then(() => {
                mongoose.disconnect()
                resolve('Client registered successfully')
              })
              .catch((err) => {
                mongoose.disconnect()
                reject(err)
              });
          }
        })
        .catch((err) => {
            reject(err)
        })
    })
}

exports.updateOneUser=(id,Username,Email,Password,Gender,DateBirth,IdPassport)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Client.updateOne({_id : id},{
                username:Username,
                email:Email,
                password:Password,
                gender:Gender,
                dateBirth:DateBirth,
                idPassport:IdPassport

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

exports.updateOneClient=(id,Sold,nbrJour,NumChambre)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Client.updateOne({_id : id},{
                solde:Sold,
                nbrJour:nbrJour,
                numChambre:NumChambre,
                isActive:true

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
////////////////////////////////////
exports.updateclientStatus = (ClientId, isActive) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
        .then(() => {
            Client.findByIdAndUpdate(ClientId, { isActive: isActive }, { new: true })
            .then((updated) => {
                mongoose.disconnect()
                resolve(updated)
            })
            .catch((error) => {
                mongoose.disconnect()
                reject(error)
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

exports.updateclientDate = (ClientId) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url)
        .then(() => {
          Client.findByIdAndUpdate(ClientId, { dateEntre: Date.now() })
            .then((updated) => {
              mongoose.disconnect()
              resolve(updated)
            })
            .catch((error) => {
              mongoose.disconnect()
              reject(error)
            });
        })
        .catch((error) => {
          reject(error)
        })
    })
}

exports.updateClientSold = (ClientId, Sold) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url)
        .then(() => {
          Client.findById(ClientId)
            .then((client) => {
              const updatedSold = parseFloat(client.solde) + parseFloat(Sold)
              Client.findByIdAndUpdate(ClientId , {solde : updatedSold})
              .then((res) => {
                mongoose.disconnect()
                resolve(res)
              }).catch((error) => {
                mongoose.disconnect()
                reject(error);
              })
            }).catch((error) => {
              mongoose.disconnect()
              reject(error)
            })
        })
        .catch((error) => {
          reject(error)
        })
    });
  };

exports.getClientById = (Id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
        .then(() => {
            Client.findById(Id)
            .then((client) => {
                mongoose.disconnect()
                resolve(client)
            })
            .catch((error) => {
                mongoose.disconnect()
                reject(error)
            });
        }).catch((error) => {
            reject(error)
    
        })
    })
}

exports.getAllClient=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Client.find({idResponsableClient : id})

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

exports.getAll=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Client.find()

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

exports.getTodayClient = (id) => {
    const today = new Date(); // Get today's date
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 to compare with the dates in the database
  
    return new Promise((resolve, reject) => {
      mongoose.connect(url)
        .then(() => {
          Client.find({
            dateEntre: {
              $gte: today, // Greater than or equal to today's date
              $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Less than tomorrow's date
            },
            isActive: false,
            idResponsableClient: id
          })
            .then((clients) => {
              mongoose.disconnect()
              resolve(clients)
            })
            .catch((err) => {
              mongoose.disconnect()
              reject(err)
            })
        })
        .catch((err) => reject(err))
    })
}

exports.getAllClientIsActive=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Client.find({isActive : true})

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


exports.searchClientsByUsername = (username) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
        .then(() => {
            Client.find({ username: { $regex: username, $options: 'i' } })
                .then((clients) => {
                    mongoose.disconnect()
                    resolve(clients)
                })
                .catch((error) => {
                    mongoose.disconnect()
                    reject(error)
                });
        })
        .catch((error) => {
            reject(error)
        });
    });
}

exports.resetClientPassword = (clientId, newPassword) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
        .then(() => {
            bcrypt.hash(newPassword, 10)
            .then((hashPassword) => {
                Client.findByIdAndUpdate(clientId, { password: hashPassword }, { new: true })
                    .then((updatedClient) => {
                        mongoose.disconnect()
                        resolve(updatedClient)
                    })
                    .catch((error) => {
                        mongoose.disconnect()
                        reject(error)
                    });
            })
                .catch((error) => {
                    mongoose.disconnect()
                    reject(error)
                });
            })
            .catch((error) => {
                reject(error)
            })
        })
}

