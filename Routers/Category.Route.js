const route = require('express').Router()
const categorys = require('../Controllers/categorieController')

//****************************** */
route.get('/getCtegorys/:id',(req,res) =>{
    categorys.getCategoryByIdService(req.params.id)
    .then((categorys)=>res.status(200).json(categorys=categorys))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.get('/get/:id',(req,res) =>{
    categorys.getCategoryById(req.params.id)
    .then((categorys)=>res.status(200).json(categorys=categorys))
    .catch((err)=>res.status(400).json({error:err}))
})
//****************************** */
route.delete('/delete/:id',(req,res)=>{
    categorys.deleteOneCategory(req.params.id)
    .then(()=>res.status(200).json({msg:"deleted"}))
    .catch((err)=>res.status(400).json({error:err}))
})
// delete category with his product 
// route.delete('/delete/:id', (req, res) => {
//     categorys.deleteCategorywithProduct(req.params.id)
//     .then(() => res.status(200).json({ msg: "Category deleted successfully"}))
//     .catch((err) => console.log(err))
// });

//****************************** */
route.put('/put/:id',(req,res) =>{
    categorys.updateOneCategory(req.params.id,req.body.name,req.body.description,req.body.image)
    .then(()=>res.status(200).json({msg:"updated"}))
    .catch((err)=>res.status(400).json({error:err}))
})

//****************************** */
route.post('/post',(req,res) =>{
    categorys.postNewCategory(req.body.name,req.body.description,req.body.image,req.body.idService)
    .then(()=>res.status(200).json({msg:"added"}))
    .catch((err)=>console.log(err))
})

module.exports = route