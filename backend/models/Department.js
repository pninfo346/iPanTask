const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    require: true
  },
  categoryName: {
    type: String,
    require: true
  },
  location: {
    type: String,
    require: true
  },
  salary: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});
var DepartmentModel = mongoose.model('departments', departmentSchema);
module.exports = DepartmentModel;