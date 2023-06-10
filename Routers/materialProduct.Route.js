const route = require('express').Router()
const materialproducts = require('../Controllers/materialProductController')


route.put('/put/:id',(req,res) =>{
    materialproducts.updateOneMaterialProduct(req.params.id,req.body.name,req.body.description,req.body.prix,req.body.image)
    .then((product)=>res.status(200).json({msg:"updated"}))
    .catch((err)=>res.status(400).json({error:err}))
})

route.put('/editQuantity/:id',(req,res) =>{
    materialproducts.updateQuantity(req.params.id,req.body.quantity)
    .then((product)=>res.status(200).json({msg:"Quantity added"}))
    .catch((err)=>res.status(400).json(console.log(err)))
})

//****************************** */
route.post('/post',(req,res) =>{
    materialproducts.postNewMaterialProduct(req.body.name,req.body.description,req.body.prix,req.body.image,req.body.idCategory,req.body.quantity)
    .then((product)=>res.status(200).json({product:product,msg:"Product added"}))
    .catch((err)=>console.log(err))
})

module.exports = route