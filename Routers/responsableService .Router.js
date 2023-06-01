const route = require('express').Router()
const jwt = require('jsonwebtoken')
const responsableService = require('../Controllers/responsableServiceController')
require('dotenv').config()

const privateKey = process.env.PRIVATE_KEY
const secretkey = process.env.SECRET_KEY
const clientkey = process.env.CLIENT_KEY
//****************************** */
route.post('/register',(req,res) =>{
    responsableService.register(req.body.username,req.body.email,req.body.password,req.body.dateBirth,req.body.idService,req.body.idAdmin)
    .then((user)=>res.status(200).json({user:user,msg:"added"}))
    .catch((err)=>console.log(err))
})
//****************************** */
route.put('/put/:id',(req,res) =>{
    responsableService.updateOneResponsable(req.params.id,req.body.username,req.body.email,req.body.password,req.body.gender,req.body.dateBirth,req.body.idService)
    .then((user)=>res.status(200).json({user:user,msg:"updated"}))
    .catch((err)=>res.status(400).json({error:err}))
})


module.exports = route