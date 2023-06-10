const route = require('express').Router()
const Seance = require('../Controllers/SeanceController')


route.get('/get/:id/:date/:place', (req,res)=>{ 
    Seance.getSeance(req.params.id ,req.params.date,req.params.place)
    .then((log)=>res.status(200).json(log=log))
    .catch((err)=>res.status(400).json(console.log(err)))
})
module.exports = route