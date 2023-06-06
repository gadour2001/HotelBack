const route = require('express').Router()
const Seance = require('../Controllers/SeanceController')


route.put('/get/:id', (req,res)=>{ 
    Seance.getSeance(req.params.id ,req.body.nbrPlace,req.body.date)
    .then((log)=>res.status(200).json(log=log))
    .catch((err)=>res.status(400).json({error:err}))
})
module.exports = route