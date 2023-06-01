const Service = require ('../models/service')
const Category = require('../models/category')
const Product = require('../models/product')
const mongoose = require('mongoose')
require('dotenv').config()


var url = process.env.URL


exports.deleteService = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
        .then(() => {
            Category.find({ idService: id })
            .then((categories) => {
                const categoryIds = categories.map((category) => category._id);
                Product.deleteMany({ idCategorie: { $in: categoryIds } })
                .then(() => {
                    Category.deleteMany({ idService: id })
                    .then(() => {
                        Service.findByIdAndDelete(id)
                        .then(() => {
                            mongoose.disconnect()
                            resolve();
                        })
                        .catch((error) => {
                            console.log(error)
                            mongoose.disconnect()
                            reject(error)
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                        mongoose.disconnect()
                        reject(error);
                    })
                })
                .catch((error) => {
                    console.log(error)
                    mongoose.disconnect();
                    reject(error)
                })
            })
            .catch((error) => {
                console.log(error)
                mongoose.disconnect()
                reject(error)
            })
        })
        .catch((error) => {
            console.log(error)
            reject(`Error connecting to database: ${error.message}`)
        })
    })
}

exports.postNewService=(Name,Description,Image,IdAdmin)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{

                let new_service = Service({
                    name:Name,
                    description:Description,
                    image:Image,
                    idAdmin:IdAdmin,
                    isActive:false
                })
                new_service.save().then((done)=>{
                    mongoose.disconnect
                    resolve(done)
                }).catch((err)=>{
                    mongoose.disconnect
                    reject(err)
                })
        })
    }).catch((err)=>reject(err))
}

exports.getAllService=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Service.find({idAdmin:id})

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
exports.getServicetById=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Service.findById(id)

            .then((doc)=>{
                mongoose.disconnect
                resolve(doc)
            }).catch((err)=>{
                mongoose.disconnect
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
}

exports.updateOneService=(id,Name,Description,image)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Service.updateOne({_id : id},{
                name:Name,
                description:Description,
                image:image

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
exports.updateServiceStatus = (serviceId, IsActive) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
        .then(() => {
            Service.findByIdAndUpdate(serviceId, { isActive: IsActive }, { new: true })
            .then((updated) => {
                mongoose.disconnect()
                resolve(updated)
            })
            .catch((error) => {
                mongoose.disconnect()
                reject(error)
            })
        }).catch((error) => {
            reject(`Error connecting to database: ${error.message}`)
        })
    })
}