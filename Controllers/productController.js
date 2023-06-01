const Product = require ('../models/product')
const mongoose = require('mongoose')
require('dotenv').config()


var url = process.env.URL

exports.getProductById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
        .then(() => {
            Product.findById(id)
            .then((product) => {
                mongoose.disconnect()
                resolve(product)
            })
            .catch((error) => {
                mongoose.disconnect()
                reject(error)
            });
        }).catch((error) => {
            reject(`Error connecting to database: ${error.message}`)
    
        })
    })
}


exports.getAllProductByCategory=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Product.find({idCategorie : id})
            .then((doc)=>{
                mongoose.disconnect
                resolve(doc) 
            }).catch((err)=>{
                mongoose.disconnect
                reject(err)
            })
        }).catch((err)=>console.log(err))
    })
}

exports.getAllProduct=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Product.find()
            .then((doc)=>{
                mongoose.disconnect
                resolve(doc)
            }).catch((err)=>{
                mongoose.disconnect
                reject(err)
            })
        }).catch((err)=>console.log(err))
    })
}

exports.deleteOneProduct=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return Product.findByIdAndDelete(id)
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
