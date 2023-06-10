const Client = require('../models/client');
const Responsable = require('../Controllers/responsableClientController');
const bcrypt = require('bcrypt');
const nodemailer = require ('nodemailer');
const mongoose = require('mongoose');
const user = require('../models/user');
require('dotenv').config();

const url = process.env.URL;

const verificationCodeLength = 6
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
                const verificationCode = generateVerificationCode(verificationCodeLength);

                let new_user = new Client({
                  username: Username,
                  email: Email,
                  password: hashPassword,
                  dateBirth: DateBirth,
                  role:'client',
                  idPassport: IdPassport,
                  solde: 0,
                  dateEntre:(Date.now()+(60*60*1000)),
                  nbrJour:0,
                  numChambre:0,
                  isActive: false,
                  idResponsableClient:idResp,
                  verificationCode:verificationCode,
                  log : true
                })

                return new_user.save().then((res) => {
                  const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'hotelwallet0@gmail.com',
                      pass: 'keguwbhjigdwzqnx',
                    },
                  });
    
                  const mailOptions = {
                    from: 'hotelwallet0@gmail.com',
                    to: res.email,
                    subject: 'Email Verification',
                    text: `Your verification code is: ${res.verificationCode}`,
                  };
    
                  transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                      console.log(error);
                      reject('Failed to send verification email');
                    } else {
                      console.log('Email sent: ' + info.response);
                      resolve('Client registered successfully');
                    }
                  });
                  mongoose.disconnect()
                  resolve(res)
                }).catch((err) => {
                  mongoose.disconnect()
                  reject(err)
                })
              }).catch((err) => {
                mongoose.disconnect()
                reject(err)
              })
          }
        })
        .catch((err) => {
            reject(err)
        })
    })
}
function generateVerificationCode(length) {
  const characters = '0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}


exports.updateOneUser=(id,Username,DateBirth,IdPassport)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Client.updateOne({_id : id},{
                username:Username,
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
          Client.findById(id)
            .then((client) => {
              const updatedSold = parseInt(client.solde) + parseInt(Sold)
              return Client.updateOne({_id : id},{
                
                  dateEntre:(Date.now()+(60*60*1000)),
                  solde:updatedSold,
                  nbrJour:nbrJour,
                  numChambre:NumChambre,
                  isActive:true,
                  log:false

              }).then((done)=>{
                  mongoose.disconnect
                  resolve(done)
              }).catch((err)=>{
                  mongoose.disconnect
                  reject(err)
              })
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


exports.updateclientidRespo = (id , idRespo) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url)
        .then(() => {
          Client.findByIdAndUpdate(id, { 
            idResponsableClient: idRespo,
            log:true
          })
            .then((updated) => {
              mongoose.disconnect()
              resolve(updated)
            })
            .catch((error) => {
              mongoose.disconnect()
              reject(error)
            })
        })
        .catch((error) => {
          reject(error)
        })
    })
}

exports.updateclientlog = (id) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url)
      .then(() => {
        Client.findByIdAndUpdate(id, { log: true })
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
              const updatedSold = parseInt(client.solde) + parseInt(Sold)
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

exports.getClient = (id) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url)
      .then(() => {
        Responsable.getResponsableClient(id)
          .then((res) => {
            const responsableIds = res.map((responsable) => responsable._id)

            Client.find({ idResponsableClient: { $in: responsableIds } })
              .then((log) => {
                mongoose.disconnect()
                resolve(log)
              })
              .catch((err) => {
                mongoose.disconnect()
                reject(err)
              })
          })
          .catch((err) => {
            mongoose.disconnect()
            reject(err)
          });
      })
      .catch((err) => reject(err))
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

          return Client.find({isActive:true})

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
    return new Promise((resolve, reject) => {
      mongoose.connect(url)
        .then(() => {
          Client.find({
            isActive: false,
            idResponsableClient: id,
            log:true
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



