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
//****************************** */
route.get('/get/:id',(req,res)=>{
    users.getOneUser(req.params.id)
    .then((user)=>res.status(200).json(user = user))
    .catch((err)=>res.status(400).json({error:err}))
})

route.get('/getResponsables/:id',(req,res)=>{
    users.getResponsables(req.params.id)
    .then((user)=>res.status(200).json(user = user))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.delete('/delete/:id',(req,res)=>{
    users.deleteOneUser(req.params.id)
    .then((user)=>res.status(200).json({msg:"deleted"}))
    .catch((err)=>res.status(400).json({error:err})) 
})
//****************************** */
route.post('/forgotPassword', (req, res) => {
    users.forgotPassword(req.body.email)
    .then(() => res.status(200).json({ message: 'Password reset instructions sent to email' }))
    .catch((err) => console.log(err));
})
//****************************** */
route.put('/putPassword/:id',(req,res) =>{
    users.resetClientPassword(req.params.id,req.body.newPassword,req.body.oldPassword)
    .then((user)=>res.status(200).json({user:user,msg:"updated"}))
    .catch((err)=>res.status(400).json({error:err}))
})


route.put('/put/:id',(req,res) =>{
    users.updateOneUser(req.params.id,req.body.username,req.body.email,req.body.password,req.body.dateBirth)
    .then((user)=>res.status(200).json({msg:"updated"}))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.post('/register',(req,res) =>{
    users.register(req.body.username, req.body.email,req.body.password,req.body.dateBirth)
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
    .catch(
    (err)=>res.status(200).json({error:err})
    )
})



module.exports = route