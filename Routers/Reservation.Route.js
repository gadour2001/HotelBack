const route = require('express').Router()
const Reservations = require('../Controllers/reservationController')

route.get('/',(req,res)=>{
    Reservations.getAllReservation()
    .then((Reservations)=>res.status(200).json({Reservations:Reservations}))
    .catch((err)=>res.status(400).json({error:err}))
})

//****************************** */
route.delete('/delete/:id',(req,res)=>{
    Reservations.deleteOneReservation(req.params.id)
    .then((Reservation)=>res.status(200).json({Reservations:Reservations,msg:"deleted"}))
    .catch((err)=>res.status(400).json({error:err}))
})

//****************************** */
route.post('/post',(req,res) =>{
    Reservations.postNewReservation(req.body.prixTotal,req.body.idClient,req.body.idService,req.body.horaire,req.body.nbrPlace,req.body.idProduct)
    .then((Reservation)=>res.status(200).json({Reservation:Reservation,msg:"added"}))
    .catch((err)=>res.status(400).json({error:err}))
})

//****************************** */
route.get('/get/Client/:id',(req,res)=>{
    Reservations.getReservationByClientId(req.params.id)
    .then((reservation)=>res.status(200).json(reservation=reservation))
    .catch((err)=>console.log(err))
})

//****************************** */
route.get('/get',(req,res)=>{
    Reservations.getAllReservation()
    .then((reservation)=>res.status(200).json(reservation=reservation))
    .catch((err)=>console.log(err))
})

//****************************** */
route.get('/get/Service/:id',(req,res)=>{
    Reservations.getReservationByServiceId(req.params.id)
    .then((reservation)=>res.status(200).json(reservation=reservation))
    .catch((err)=>console.log(err))
})

//****************************** */
route.get('/get/Servicefini/:id',(req,res)=>{
    Reservations.getReservationByServiceIdfini(req.params.id)
    .then((reservation)=>res.status(200).json(reservation = reservation))
    .catch((err)=>console.log(err))
})

//****************************** */
route.put('/update/status/:id', (req, res) => {
    Reservations.updateReservationStatus(req.params.id, req.body.etat)
    .then((reservation) => res.status(200).json({ reservation, msg: "Reservation status updated successfully" }))
    .catch((error) => console.log(error))
})


module.exports = route