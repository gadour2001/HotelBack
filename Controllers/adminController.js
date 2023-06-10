const Admin = require('../models/Admin')
const Client = require('../models/client')
const ResponsableClient = require('../models/responsableClient')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
require('dotenv').config()

var url = process.env.URL

exports.register=(Username,Email,Password,DateBirth,idSuperAdmin,HotelName)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Admin.findOne({email:Email})
        }).then((doc)=>{
            if(doc){
                mongoose.disconnect()
                reject('this admin  exist')
            }else{
                bcrypt.hash(Password,10).then((hashPassword)=>{
                    let new_admin = Admin({
                        username:Username,
                        email:Email,
                        password:hashPassword,
                        dateBirth:DateBirth,
                        role:'admin',
                        idSuperAdmin :idSuperAdmin,
                        hotelName : HotelName
                    })
                    new_admin.save().then((Admin)=>{
                        mongoose.disconnect
                        resolve(Admin)
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


exports.getAdminById = (id) => {
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Admin.findById(id)
            .then((Admin)=>{
                mongoose.disconnect
                resolve(Admin)
            }).catch((err)=>{
                mongoose.disconnect
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
}

exports.getAllAdmin=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Admin.find()
            .then((Admin)=>{
                mongoose.disconnect
                resolve(Admin)
            }).catch((err)=>{
                mongoose.disconnect
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
}

exports.getHotelName=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Client.findById(id).then((res) => {
                ResponsableClient.findById(res.idResponsableClient).then((res) => {
                    Admin.findById(res.idAdmin).then((res) => {
                        mongoose.disconnect
                        resolve(res.hotelName)
                    }).catch((err)=>{
                        mongoose.disconnect
                        reject(err)
                    })
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
exports.getHotelName = (id) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url)
        .then(() => {
          Client.findById(id)
            .then((client) => {
              ResponsableClient.findById(client.idResponsableClient)
                .then((responsableClient) => {
                  Admin.findById(responsableClient.idAdmin)
                    .then((admin) => {
                      mongoose.disconnect();
                      resolve(admin.hotelName);
                    })
                    .catch((err) => {
                      mongoose.disconnect();
                      reject(err);
                    });
                })
                .catch((err) => {
                  mongoose.disconnect();
                  reject(err);
                });
            })
            .catch((err) => {
              mongoose.disconnect();
              reject(err);
            });
        })
        .catch((err) => reject(err));
    });
  };
  

exports.deleteOneAdmin=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Admin.deleteOne({_id : id})
            .then((Admin)=>{
                mongoose.disconnect
                resolve(Admin)
            }).catch((err)=>{
                mongoose.disconnect
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
}

exports.UpdateAdmin=(id,Username,Email,DateBirth,HotelName)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Admin.updateOne({_id : id},{
                username:Username,
                email:Email,
                dateBirth:DateBirth,
                hotelName:HotelName
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
