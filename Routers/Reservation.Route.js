const route = require('express').Router()
const Reservations = require('../Controllers/reservationController')
const bodyParser =require('express').urlencoded({extended:true})


route.get('/',(req,res)=>{
    Reservations.getAllReservation()
    .then((Reservations)=>res.status(200).json({Reservations:Reservations}))
    .catch((err)=>res.status(400).json({error:err}))
})
  
route.delete('/delete/:id',(req,res)=>{
    Reservations.deleteOneLigneReservation(req.params.id)
    .then((ligneReservation)=>res.status(200).json({Reservations:Reservations,msg:"deleted"}))
    .catch((err)=>res.status(400).json({error:err}))
})

route.post('/post',bodyParser,(req,res) =>{
    Reservations.postNewReservation(req.body.duree,req.body.horaire,req.body.nbPlace)
    .then((ligneReservation)=>res.status(200).json({ligneReservation:ligneReservation,msg:"added"}))
    .catch((err)=>res.status(400).json({error:err}))
})

module.exports = route