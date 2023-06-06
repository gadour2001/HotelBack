const route = require('express').Router()
const log = require('../Controllers/logController')


route.get('/getAllLog/:id', (req,res)=>{ 
    log.getAllLog(req.params.id)
    .then((log)=>res.status(200).json(log=log))
    .catch((err)=>res.status(400).json({error:err}))
})

route.post('/postLog', (req, res) => {
  log.postNewLog(req.body.idClient, req.body.idResponsable, req.body.sold)
    .then((log) => res.status(200).json({ log: log, msg: "deleted" }))
    .catch((err) => res.status(400).json(console.log(err)));
});

module.exports = route