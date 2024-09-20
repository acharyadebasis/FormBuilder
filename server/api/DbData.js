const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  task_data: {
    type: Object,
    required: true
  },
  name: {  // Ensure to include 'name' if it's part of your data model
    type: String,
    required: true
  }
});

const FormData = mongoose.model('FormData', formDataSchema);
module.exports = FormData;
