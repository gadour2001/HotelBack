const route = require('express').Router()
const commandes = require('../Controllers/commandeController')

//****************************** */
route.get('/get/Client/:id',(req,res)=>{
    commandes.getOrderByClientId(req.params.id)
    .then((commande)=>res.status(200).json(commande=commande))
    .catch((err)=>console.log(err))
})

//****************************** */
route.get('/get/Service/:id',(req,res)=>{
    commandes.getOrderByServiceId(req.params.id)
    .then((commande)=>res.status(200).json(commande=commande))
    .catch((err)=>console.log(err))
})

//****************************** */
route.get('/get/Servicefini/:id',(req,res)=>{
    commandes.getOrderByServiceIdfini(req.params.id)
    .then((commande)=>res.status(200).json(commande = commande))
    .catch((err)=>console.log(err))
})

//****************************** */
route.put('/update/status/:id', (req, res) => {
    commandes.updateOrderStatus(req.params.id, req.body.etat)
    .then((updatedOrder) => res.status(200).json({ updatedOrder, msg: "Order status updated successfully" }))
    .catch((error) => console.log(error))
})

//****************************** */
route.delete('/delete/:id',(req,res)=>{
    commandes.deleteOneCommande(req.params.id)
    .then((commande)=>res.status(200).json({msg:"Your Order has been deleted."})) 
    .catch((err)=>res.status(400).json({error:err}))
})

route.put('/put/:id',(req,res) =>{
    commandes.updateOneCommande(req.params.id,req.body.prixTotal)
    .then((commande)=>res.status(200).json({msg:"updated"}))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.post('/post',(req,res) =>{
    commandes.postNewCommande(req.body.prixTotal,req.body.idClient,req.body.idService,req.body.numtable,req.body.lignesCommandes)
    .then((commande)=>res.status(200).json({commande:commande,msg:"Commande added"}))
    .catch((err)=>console.log(err))
})

route.get('/getCommande/:id',(req,res)=>{
    commandes.getOrderById(req.params.id)
    .then((commande)=>res.status(200).json(commande=commande))
    .catch((err)=>console.log(err))
})


module.exports = route