const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    unique : true,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  hobbies: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique : true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  departmentId: {
    type: String,
  },
  departmentName: {
    type: String,
  },
  location: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});
var UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;