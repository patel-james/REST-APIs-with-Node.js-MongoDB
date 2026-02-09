const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    age: {
      type: Number
    }
})

const User = mongoose.model('JamesDB', userSchema);
module.exports = User; 