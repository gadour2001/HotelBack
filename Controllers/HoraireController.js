// const Horaire = require ('../models/Horaire')
// const Seance = require('../models/Seance')
// const Product = require ('../models/serviceProduct')
// const mongoose = require('mongoose')
// require('dotenv').config()


// const url = process.env.URL  


// exports.getHoraire=(id)=>{
//     return new Promise((resolve,reject)=>{
//         mongoose.connect(url).then(()=>{  
//             return Horaire.find({idServiceProduct:id})

//             .then((done)=>{
//                 mongoose.disconnect()
//                 resolve(done)
//             }).catch((err)=>{
//                 mongoose.disconnect()
//                 reject(err)
//             })
//         }).catch((err)=>reject(err))
//     })
// } 