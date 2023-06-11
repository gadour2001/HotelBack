const route = require('express').Router()
const ServiceProduct = require('../Controllers/ServiceProductController')


route.post('/post',(req,res) =>{
    ServiceProduct.postNewServiceProduct(req.body.name,req.body.description,req.body.prix,req.body.image,req.body.idCategory,req.body.duree,req.body.nbPlace)
    .then((product)=>res.status(200).json({product:product,msg:"Product added"}))
    .catch((err)=>console.log(err))
})

route.put('/put/:id',(req,res) =>{
    ServiceProduct.putServiceProduct(req.params.id,req.body.name,req.body.description,req.body.prix,req.body.image,req.body.nbPlace)
    .then((product)=>res.status(200).json({product:product,msg:"Product added"}))
    .catch((err)=>console.log(err))
})



module.exports = route 