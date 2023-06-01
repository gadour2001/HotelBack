const mongoose = require('mongoose');
const user = require('./user');
mongoose.set('strictQuery', false)

let AdminSchema = mongoose.Schema({
        idSuperAdmin :{
            type :mongoose.Schema.Types.ObjectId,
            ref :'superAdmin'
        },
        hotelName:String
})
module.exports = user.discriminator('admin', AdminSchema);