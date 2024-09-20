const mongoose = require('mongoose');

const submittedDataURI = 'mongodb://localhost:27017/SubmittedData';
mongoose.connect(submittedDataURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'SubmittedData connection error:'));
db.once('open', () => {
  console.log('Connected to SubmittedData MongoDB');
});

module.exports = db;
