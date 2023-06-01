const express = require ('express')
const route = express.Router()
const responasbleClients = require('../Controllers/responsableClientController')
const mongoose = require('mongoose')
require('dotenv').config()

 
//****************************** */
route.post('/register',(req,res) =>{
    responasbleClients.register(req.body.username,req.body.email,req.body.password,req.body.dateBirth,req.body.idAdmin)
    .then((user)=>res.status(200).json({user : user ,msg:"registred successfully"}))
    .catch((err)=>res.status(400).json({error:err}))
})

//****************************** */
route.put('/put/:id',(req,res) =>{
    responasbleClients.updateOneResponsableClient(req.params.id,req.body.username,req.body.email,req.body.password,req.body.dateBirth)
    .then((user)=>res.status(200).json({user : user ,msg:"updated"}))
    .catch((err)=>res.status(400).json({error:err}))
})

module.exports = route