const Log = require('../models/log')
const mongoose = require('mongoose')
const Responsable = require('../Controllers/responsableClientController')


var url = process.env.URL

exports.getAllLog = (id) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url)
      .then(() => {
        Responsable.getResponsableClient(id)
          .then((res) => {
            const responsableIds = res.map((responsable) => responsable._id)

            Log.find({ idResponsableClient: { $in: responsableIds } })
              .then((log) => {
                mongoose.disconnect()
                resolve(log)
              })
              .catch((err) => {
                mongoose.disconnect()
                reject(err)
              })
          })
          .catch((err) => {
            mongoose.disconnect()
            reject(err)
          });
      })
      .catch((err) => reject(err))
  })
}


exports.postNewLog = (IdClient,IdResponsable,sold)=>{
  return new Promise((resolve,reject)=>{
      mongoose.connect(url).then(()=>{
          let new_log = Log({ 
            idClient:IdClient,
            update_date:Date.now(),
            idResponsableClient:IdResponsable,
            updated_sales:sold
          })
          new_log.save().then((done)=>{
              mongoose.disconnect()
              resolve(done)
          }).catch((err)=>{
              mongoose.disconnect()
              reject(err)
          })
      }).catch((err)=>reject(err)) 
  })
}