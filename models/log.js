const mongoose = require('mongoose');

const clientUpdateLogSchema = new mongoose.Schema({
  idClient:{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'client',
  },
  update_date: Date,
  idResponsableClient : {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'responsableClient'
  },
  updated_sales: {
    type: Number,
    default: 0
  },
});


module.exports = Log = mongoose.model('ClientUpdateLog', clientUpdateLogSchema);
