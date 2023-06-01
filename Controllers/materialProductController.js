const materialProduct = require ('../models/materialProduct')
const mongoose = require('mongoose')
require('dotenv').config()


var url = process.env.URL


exports.postNewMaterialProduct=(Name,Description,Prix,Image,IdCategory,Quantity)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            let new_product = materialProduct({ 
                name:Name,
                description:Description,
                prix:Prix,
                image : Image,
                idCategorie:IdCategory,
                quantity : Quantity 
            })
            new_product.save().then((done)=>{
                mongoose.disconnect()
                resolve(done)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        }).catch((err)=>reject(err)) 
    })
}

exports.updateOneMaterialProduct=(id,Name,Description,Prix,Image,idCategory)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return materialProduct.updateOne({_id : id},{
                name:Name,
                description:Description,
                prix:Prix,
                image:Image,
                idCategorie:idCategory,

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

exports.updateQuantity=(id,Quantity)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            materialProduct.findById(id)
            .then((res) => {
                return materialProduct.updateOne({_id : id},{
                quantity:(parseInt(Quantity) + parseInt(res.quantity))})
                .then((res) => {
                    mongoose.disconnect
                    resolve(res)
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