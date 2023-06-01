const mongoose = require('mongoose');
const user = require('./user');
mongoose.set('strictQuery', false)

let superAdminSchema = mongoose.Schema({
        
})
module.exports = user.discriminator('superAdmin', superAdminSchema)