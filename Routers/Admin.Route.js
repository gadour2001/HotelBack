const route = require('express').Router()
const Admin = require('../Controllers/adminController')

//****************************** */
route.post('/register',(req,res)=>{
    Admin.register(req.body.username,req.body.email,req.body.password,req.body.dateBirth,req.body.idSuperAdmin,req.body.hotelName)
    .then((admin)=>res.status(200).json(admin=admin))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.get('/',(req,res)=>{
    Admin.getAllAdmin()
    .then((admin)=>res.status(200).json(admin=admin))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.get('/get/:id',(req,res)=>{
    Admin.getAdminById(req.params.id)
    .then((admin)=>res.status(200).json(admin=admin))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.delete('/delete/:id',(req,res)=>{
    Admin.deleteOneAdmin(req.params.id)
    .then((admin)=>res.status(200).json(admin=admin))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.put('/put/:id',(req,res)=>{
    Admin.UpdateAdmin(req.params.id,req.body.username,req.body.email,req.body.dateBirth,req.body.hotelName)
    .then((admin)=>res.status(200).json(admin=admin))
    .catch((err)=>res.status(400).json({error:err}))
})


module.exports = route