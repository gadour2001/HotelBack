const route = require('express').Router()
const ligneCommandes = require('../Controllers/ligneCommandeController')

//****************************** */
route.get('/get/:id', (req,res)=>{ 
    ligneCommandes.getLigneCommande(req.params.id)
    .then((ligneCommandes)=>res.status(200).json(ligneCommandes=ligneCommandes))
    .catch((err)=>res.status(400).json({error:err}))
})

route.get('/getOne/:id', (req,res)=>{ 
    ligneCommandes.get(req.params.id)
    .then((ligneCommandes)=>res.status(200).json(ligneCommandes=ligneCommandes))
    .catch((err)=>res.status(400).json({error:err}))
})

route.delete('/delete/:id',(req,res)=>{
    ligneCommandes.deleteOneLigneCommande(req.params.id)
    .then((ligneCommande)=>res.status(200).json({ligneCommande:ligneCommande,msg:"deleted"}))
    .catch((err)=>res.status(400).json(console.log(err)))
})

route.post('/post',(req,res) =>{
    ligneCommandes.postNewLigneCommande(req.body.quantite,req.body.idCommande,req.body.idProduct)
    .then((ligneCommande)=>res.status(200).json({ligneCommande:ligneCommande,msg:"added"}))
    .catch((err)=>res.status(400).json(console.log(err)))
})

module.exports = route