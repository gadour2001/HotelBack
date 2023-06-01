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
            return SuperAdmin.findOne({ email: Email })
        }).then((doc) => {
              if (doc) {
                mongoose.disconnect();
                reject('This client already exists');
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
                    resolve('Client registered successfully');
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

const sendResetPasswordMail = (username, email, token) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Password',
            html: `<p>Hi ${username}, please click the link to reset your password: <a href="http://localhost:5000/user/reset-password?token=${token}">Reset Password</a></p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                mongoose.disconnect()
                reject(error);
            } else {
                mongoose.disconnect()
                resolve(info.response)
            }
        })
        }).catch((err) => {
            reject(err)
        })
    })
}

exports.forget_password = (email) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return User.findOne({ email: email })
        })
        .then((user) => {
        if (user) {
            const randomString = randomstring.generate();
            return User.updateOne({ email: email }, { $set: { token: randomString } })
        } else {
            throw new Error('User not found')
        }
        })
        .then((userData) => {
            return sendResetPasswordMail(userData.username, userData.email, userData.randomString)
        })
        .then((response) => {
            resolve({ success: true, msg: 'Please check your email and reset your password' })
        })
        .catch((error) => {
            reject({ success: false, msg: error.message })
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
                reject("we don't have this email in our database")
            }else{
                bcrypt.compare(Password,user.password).then((same)=>{
                    if(same){
                        let token = jwt.sign({user:user},privateKey,{expiresIn:'24h'})
                        mongoose.disconnect()
                        resolve(token)
                    }else{
                        mongoose.disconnect()
                        reject('invalide password')
                    }
                }).catch((err)=>{
                    mongoose.disconnect()
                    reject(err)
                })
            }
        })
    })
}
exports.getAllUser=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return User.find()
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

exports.getResponsable=()=>{ 
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return User.find({role : ['responsableClient','responsableService']})
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

