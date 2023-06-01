const route = require('express').Router()
const Products = require('../Controllers/productController')


//****************************** */
route.get('/getCategory/:id',(req,res) =>{ 
    Products.getAllProductByCategory(req.params.id)
    .then((products)=>res.status(200).json(products = products))
    .catch((err)=>res.status(400).json({error:err}))
    
})
//****************************** */
route.get('/',(req,res) =>{ 
    Products.getAllProduct()
    .then((products)=>res.status(200).json(products = products))
    .catch((err)=>res.status(400).json({error:err}))
    
})
//****************************** */
route.get('/get/:id', (req, res) => {
    Products.getProductById(req.params.id)
    .then((product) => res.status(200).json(product=product))
    .catch((error) => console.log(error));
})

//****************************** */
route.delete('/delete/:id',(req,res)=>{
    Products.deleteOneProduct(req.params.id)
    .then((product)=>res.status(200).json({product ,msg:"deleted"}))
    .catch((err)=>res.status(400).json({error:err}))
})


module.exports = route