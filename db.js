const mongoose = require('mongoose')
const url = process.env.URL 

mongoose.connect(url)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Failed to connect to MongoDB:', error));

module.exports = mongoose;