const route = require('express').Router()
const jwt = require('jsonwebtoken')
const users = require('../Controllers/userController')
require('dotenv').config()

const privateKey = process.env.PRIVATE_KEY
const secretkey = process.env.SECRET_KEY
const clientkey = process.env.CLIENT_KEY



verifytoken=(req,res,next)=>{
    let token = req.headers.authorization
    if(!token)
        res.status(400).json(msg='access rejected...!!')
    try{
        jwt.verify(token,privateKey)
        next()
    }catch(err){
        res.status(400).json({msg:err})
    }
}

verifSecretAndClient=(req,res,next)=>{
    const sk = req.params.secret
    const ck = req.params.client
    if(sk == secretkey && ck == clientkey)
        next()
    else
        res.status(400).json(error="you can't access to this route because you don't sent me secret key and client key")
}


route.get('/',(req,res)=>{
        users.getAllUser()
        .then((user)=>res.status(200).json(user = user ))
        .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.get('/get/:id',(req,res)=>{
    users.getOneUser(req.params.id)
    .then((user)=>res.status(200).json(user = user ))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.get('/Responsable',(req,res)=>{
    users.getResponsable()
    .then((responsable)=>res.status(200).json(responsable = responsable ))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.delete('/delete/:id',(req,res)=>{
    users.deleteOneUser(req.params.id)
    .then((user)=>res.status(200).json({msg:"deleted"}))
    .catch((err)=>res.status(400).json({error:err})) 
})

route.put('/put/:id',(req,res) =>{
    users.updateOneUser(req.params.id,req.body.username,req.body.email,req.body.password,req.body.gender,req.body.dateBirth)
    .then((user)=>res.status(200).json({msg:"updated"}))
    .catch((err)=>res.status(400).json({error:err}))
})

route.post('/register',(req,res) =>{
    users.register(req.body.username, req.body.email,req.body.password,req.body.dateBirth,req.body.addtionData)
    .then((user)=>res.status(200).json({msg:"added"}))
    .catch((err)=> console.log(err))
})

//****************************** */
route.post('/login',(req,res) =>{
    users.login(req.body.email,req.body.password)
    .then((token)=> {
        let user = jwt.decode(token,{complete:true})
        res.status(200).json({token:token , user:user})
    })  
    .catch((err)=>console.log(err))
})
route.post('/forgot-password', (req, res) => {
    users.forget_password(req.body.email)
    .then((user) => res.status(200).json({ user: link, message: 'Password reset email sent' }))
    .catch((error) => console.log(error))
})
route.post('/reset-password', (req, res) => {
    users.sendResetPasswordMail(req.body.email,req.body.username,req.body.token)
    .then(() => res.status(200).json({ success: true, message: 'Check your reset link ' }))
    .catch((error) => res.status(400).json({ success: false, error: error.message }))
})




module.exports = route