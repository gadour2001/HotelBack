const route = require('express').Router()
const services = require('../Controllers/serviceController')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const privateKey = process.env.PRIVATE_KEY
const secretkey = process.env.SECRET_KEY
const clientkey = process.env.CLIENT_KEY

verifytoken=(req,res,next)=>{
    let token = req.headers.authorization
    if(!token)
        res.status(400).json(msg='access rejected...!!')
    try{
        jwt.verify(token,privateKey)
        next()
    }catch(err){
        res.status(400).json({msg:err})
    }
}

verifSecretAndClient=(req,res,next)=>{
    const sk = req.params.secret
    const ck = req.params.client
    if(sk == secretkey && ck == clientkey)
        next()
    else
        res.status(400).json(error="you can't access to this route because you don't sent me secret key and client key")
}
//****************************** */
route.get('/admin/:id',(req,res)=>{
    services.getAllService(req.params.id) 
    .then((services)=>res.status(200).json(services = services))
    .catch((err)=>res.status(400).json({error:err}))
}) 
route.get('/adminActive/:id',(req,res)=>{
    services.getAllServiceActive(req.params.id) 
    .then((services)=>res.status(200).json(services = services))
    .catch((err)=>res.status(400).json({error:err}))
}) 
//****************************** */
route.get('/get/:id',(req,res)=>{
    services.getServicetById(req.params.id)
    .then((service)=>res.status(200).json(service = service))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.delete('/delete/:id', (req, res) => {
    services.deleteService(req.params.id)
    .then((service) => res.status(200).json({ service, msg: "Service deleted successfully" }))
    .catch((error) => console.log(error));
})
//****************************** */
route.put('/put/:id',(req,res) =>{
    services.updateOneService(req.params.id,req.body.name,req.body.description,req.body.image)
    .then((service)=>res.status(200).json({msg:"updated"}))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.post('/post',(req,res) =>{
    services.postNewService(req.body.name,req.body.description,req.body.image,req.body.idAdmin)
    .then((service)=>res.status(200).json({msg:"added"}))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.put('/putStatus/:id',(req,res) =>{
    services.updateServiceStatus(req.params.id,req.body.isActive)
    .then((service)=>res.status(200).json({msg:"updated"}))
    .catch((err)=>res.status(400).json({error:err}))
})


module.exports = route