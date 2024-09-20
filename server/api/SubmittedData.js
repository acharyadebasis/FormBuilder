const mongoose = require('mongoose');

const submittedDataSchema = new mongoose.Schema({
  data: { type: mongoose.Schema.Types.Mixed, required: true },
 
});





const SubmittedData = mongoose.model('SubmittedData', submittedDataSchema);
module.exports = SubmittedData;


// module.exports = submittedDataSchema; // Export the schema directly
