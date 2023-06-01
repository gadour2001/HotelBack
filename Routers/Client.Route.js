const route = require('express').Router()
const jwt = require('jsonwebtoken')
const clients = require('../Controllers/clientController')

const privateKey = process.env.PRIVATE_KEY
const secretkey = process.env.SECRET_KEY
const clientkey = process.env.CLIENT_KEY

//****************************** */
route.post('/register', (req, res) => {
    clients.register(req.body.username,req.body.email,req.body.password,req.body.dateBirth,req.body.idPassport,req.body.idResp)
    .then((user) => res.status(200).json(user=user))
    .catch((err) => console.log(err));
})

route.post('/forgotPassword', (req, res) => {
    clients.forgotPassword(req.body.email)
    .then(() => res.status(200).json({ message: 'Password reset instructions sent to email' }))
    .catch((err) => console.log(err));
})

route.put('/edit/:id',(req,res) =>{
    clients.updateOneClient(req.params.id,req.body.sold,req.body.nbrJour,req.body.numChambre)
    .then((user)=>res.status(200).json({user:user,msg:"updated"}))
    .catch((err)=>res.status(400).json({error:err}))
})

route.put('/put/:id',(req,res) =>{
    clients.updateOneUser(req.params.id,req.body.username,req.body.email,req.body.password,req.body.dateBirth,req.body.idPassport)
    .then((user)=>res.status(200).json({user:user,msg:"updated"}))
    .catch((err)=>res.status(400).json({error:err}))
})

route.put('/updateSold/:id',(req,res) =>{
    clients.updateClientSold(req.params.id,req.body.sold)
    .then((user)=>res.status(200).json({user:user,msg:"updated"}))
    .catch((err)=>res.status(400).json({error:err}))
})

//****************************** */
route.put('/put/status/:id',(req,res) =>{
    clients.updateclientStatus(req.params.id,req.body.isActive)
    .then(()=>res.status(200).json({msg:"updated"}))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.put('/put/dateEntre/:id',(req,res) =>{
    clients.updateclientDate(req.params.id)
    .then(()=>res.status(200).json({msg:"updated"}))
    .catch((err)=>res.status(400).json(console.log(err)))
})

//****************************** */
route.get('/getByResponsable/:id',(req,res)=>{
    clients.getAllClient(req.params.id)
    .then((client)=>res.status(200).json(client = client ))
    .catch((err)=>res.status(400).json({error:err}))
})

route.get('/getByResponsable',(req,res)=>{
    clients.getAll()
    .then((client)=>res.status(200).json(client = client ))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.get('/get/:id',(req,res)=>{
    clients.getTodayClient(req.params.id)
    .then((client)=>res.status(200).json(client = client ))
    .catch((err)=>res.status(400).json({error:err}))
})

//****************************** */
route.get('/isActive',(req,res)=>{
    clients.getAllClientIsActive()
    .then((client)=>res.status(200).json(client = client ))
    .catch((err)=>res.status(400).json({error:err}))
})
module.exports = route