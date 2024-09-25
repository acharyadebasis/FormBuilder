const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  task_data: {
    type: Object,
    required: true
  },
  name: {  // Ensure to include 'name' if it's part of your data model
    type: String,
    required: true
  },
  theme: {
    type: String,
    default: 'defaultTheme' // Set your default theme value here
  }

});

const FormData = mongoose.model('FormData', formDataSchema);
module.exports = FormData;
