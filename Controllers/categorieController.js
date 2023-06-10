const Category = require ('../models/category')
const materialProduct = require('../models/materialProduct')
const Product = require('../models/product')
const mongoose = require('mongoose')
require('dotenv').config()

var url = process.env.URL 

exports.postNewCategory=(Name,Description,Image,IdService,Type)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{

                let new_category = new Category({
                    name:Name,
                    description:Description,
                    image:Image,
                    idService:IdService,
                    type:Type
                })
                new_category.save().then((done)=>{
                    mongoose.disconnect
                    resolve(done)
                }).catch((err)=>{
                    mongoose.disconnect
                    reject(err)
                })
        }).catch((err)=>reject(err))
    })
}

exports.getCategoryByIdService=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Category.find({idService : id})
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

exports.deleteAllCategoriesByServiceId = (idService) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
        .then(() => {
            Category.find({ idService: idService })
            .then((categories) => {
                const categoryIds = categories.map((category) => category._id);
                Product.deleteMany({ idCategorie: { $in: categoryIds } })
                .then(() => {
                    Category.deleteMany({ idService: idService })
                    .then(() => {
                        mongoose.disconnect()
                        resolve();
                    })
                    .catch((error) => {
                        mongoose.disconnect()
                        reject(error)
                    });
                }).catch((error) => {
                    mongoose.disconnect()
                    reject(error)
                });
            })
            .catch((error) => {
                mongoose.disconnect()
                reject(error)
            })
        })
        .catch((error) => {
            reject(`Error connecting to database: ${error.message}`);
        })
    })
}

exports.getCategoryById=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Category.findById(id)
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

exports.deleteOneCategory=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Category.findByIdAndDelete(id)

            .then((done)=>{
                Product.deleteMany({idCategorie : id})
            }).catch((err)=>{
                mongoose.disconnect
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
}

exports.updateOneCategory=(id,Name,Description,Image,Type)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Category.updateOne({_id : id},{
                name:Name,
                description:Description,
                image:Image,
                type:Type

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