const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const randomstring = require('randomstring')
const nodemailer = require('nodemailer')
const Admin = require('../models/Admin')
const ResponsableClient = require('../models/responsableClient')
const ResponsableService = require('../models/responsableService')
const SuperAdmin =require ('../models/superAdmin')
require('dotenv').config()


const url = process.env.URL;

exports.register = (Username, Email, Password, DateBirth) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
        .then(() => {
            return User.findOne({ email: Email })
        }).then((doc) => {
              if (doc) {
                mongoose.disconnect();
                reject('This email already exists');
              } else {
                bcrypt
                  .hash(Password, 10)
                  .then((hashPassword) => {
                    let new_user = new SuperAdmin({
                      username: Username,
                      email: Email,
                      password: hashPassword,
                      dateBirth: DateBirth,
                      role: 'superAdmin',
                    });
                    return new_user.save();
                  })
                  .then(() => {
                    mongoose.disconnect();
                    resolve('Super Admin registered successfully');
                  })
                  .catch((err) => {
                    mongoose.disconnect();
                    reject(err);
                  });
              }
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

var privateKey = process.env.PRIVATE_KEY

exports.login=(Email,Password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return User.findOne({email:Email})
        
        }).then((user)=>{
            if(!user){
                mongoose.disconnect()
                reject("invalide email or password")
            }else{
                bcrypt.compare(Password,user.password).then((same)=>{
                    if(same){
                        let token = jwt.sign({user:user},privateKey,{expiresIn:'24h'})
                        mongoose.disconnect()
                        resolve(token)
                    }else{
                        mongoose.disconnect()
                        reject('invalide email or password')
                    }
                }).catch((err)=>{
                    mongoose.disconnect()
                    reject(err)
                })
            }
        })
    })
}

exports.getOneUser=(id)=>{
  return new Promise((resolve,reject)=>{
      mongoose.connect(url).then(()=>{
          return User.findById(id)
          .then((user)=>{
              mongoose.disconnect
              resolve(user)
          }).catch((err)=>{
              mongoose.disconnect
              reject(err)
          })
      }).catch((err)=>reject(err))
  })
} 

exports.getResponsables=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return ResponsableClient.find({idAdmin:id })
            .then((responsableClient)=>{
              ResponsableService.find({idAdmin:id })
              .then((responsableService)=>{
                mongoose.disconnect
                resolve({responsableClient,responsableService})
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

exports.resetClientPassword = (Id, newPassword, oldPassword) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url)
        .then(() => {
          User.findById(Id)
            .then((res) => {
              if (!res) {
                mongoose.disconnect();
                reject('User does not exist');
              } else {
                bcrypt.compare(oldPassword, res.password)
                  .then((isMatch) => {
                    if (!isMatch) {
                      mongoose.disconnect();
                      reject('Incorrect old password');
                    } else {
                      bcrypt.hash(newPassword, 10)
                        .then((hashPassword) => {
                          User.findByIdAndUpdate(Id, { password: hashPassword }, { new: true })
                            .then((updatedClient) => {
                              mongoose.disconnect();
                              resolve(updatedClient);
                            })
                            .catch((error) => {
                              mongoose.disconnect();
                              reject(error);
                            });
                        })
                        .catch((error) => {
                          mongoose.disconnect();
                          reject(error);
                        });
                    }
                  })
                  .catch((error) => {
                    mongoose.disconnect();
                    reject(error);
                  });
              }
            })
            .catch((error) => {
              mongoose.disconnect();
              reject(error);
            });
        });
    });
  };

  exports.forgotPassword = (Email) => {
    return new Promise((resolve, reject) => {
      mongoose
          .connect(url)
          .then(() => {
            return User.findOne({ email: Email })
          })
          .then((doc) => {
            if (doc) {
              const NewPassword = generatePassword(8);
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'hotelwallet0@gmail.com',
                  pass: 'keguwbhjigdwzqnx',
                },
              });
              const mailOptions = {
                from: 'hotelwallet0@gmail.com',
                to: Email,
                subject: 'Password Reset Request',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'New password : ' + NewPassword + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                }
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.log(error)
                    reject(error)
                  } else {
                    console.log('Email sent: ' + info.response)
                    bcrypt.hash(NewPassword, 10)
                    .then((hashPassword) => {
                        User.updateOne({email:Email} , { password: hashPassword }, { new: true })
                      .then((updatedClient) => {
                          mongoose.disconnect()
                          resolve(updatedClient)
                      })
                      .catch((error) => {
                          mongoose.disconnect()
                          reject(error)
                      })
                    }).catch((err) => {
                        mongoose.disconnect()
                        reject(error)
                    })
                  }
                })
            } else {
              mongoose.disconnect()
              reject('This client dose not exists')
            }
    })              
  })
}
  function generatePassword(length) {
    const characters = '0123456789AZERTYUIOPMLKJHGFDSQWXCVBN+-azertyuiopmlkjhgfdsqwxcvbn';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }

exports.deleteOneUser=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return User.deleteOne({_id : id})
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

exports.updateOneUser=(id,Username,Email,Password,DateBirth)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            let validation = SchemaValidation.validate({username:Username,email:Email,password:Password,dateBirth:DateBirth})
            if(validation.error)
            {
                mongoose.disconnect()
                reject(validation.error.details)
            }
            return User.updateOne({_id : id},{
                username:Username,
                email:Email,
                password:Password,
                gender:Gender,
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

