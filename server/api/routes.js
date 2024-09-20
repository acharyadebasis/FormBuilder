/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-var */
var express = require('express');
const cors = require('cors'); // Import cors
var FormData = require('./DbData'); // Import the Mongoose model
const SubmittedData = require('./SubmittedData'); // For SubmittedData database
var formDataView = require('./formData');
var updatedFormData=[]

const mongoose = require('mongoose');
var optionsData = [
  { text: 'Text 1', value: '1' },
  { text: 'Text 2', value: '2' },
  { text: 'Text 3', value: '3' },
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/FormData', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});



mongoose.connect('mongodb://localhost:27017/SubmittedData', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});




var app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080' // Replace with your frontend URL
}));

// Route to fetch all form data from MongoDB
app.get('/formdata/forms', async (req, res) => {
  try {
    console.log('Received GET request for /api/formdata/forms');
    const data = await FormData.find();
    console.log(data)
    // data.map(data=>{
    //  return console.log("Retrieved data:",data.task_data );
    // })
    res.status(200).json(data);
  } catch (err) {
    console.error('Failed to retrieve data:', err);
    res.status(500).send('Failed to retrieve data');
  }
});


// Route to handle form data submission and retrieval
app.route('/formdata')
.get((req, res) => {
  // Define the path to save the JSON file
  // Log the form data (if needed)
  // console.log('get formdata: ', formData.data);
  
  // You might want to send some data back, if applicable
   console.log('get formdata body>>>>>>>>>>>>: ', formDataView.data.task_data);

  res.send(updatedFormData.task_data);
})


.post(async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log incoming data

    // Create a new FormData instance
    const newFormData = new FormData({
      task_data: req.body.task_data,
      name: req.body.name // Ensure this is included
    });

    // Save to MongoDB
    await newFormData.save();

    // Send the newly created form data back in the response
    res.status(200).send(newFormData);
  } catch (err) {
    console.error('Failed to save data:', err);
    res.status(500).send('Failed to save data');
  }
});
  app.delete('/formdata/:id', async (req, res) => {
    try {
      const formDataId = req.params.id; // Get the ID from the URL parameters
  
      // Find the document by ID and delete it
      const deletedFormData = await FormData.findByIdAndDelete(formDataId);
  
      if (!deletedFormData) {
        return res.status(404).send('Form data not found');
      }
  
      console.log('Data deleted from MongoDB:', deletedFormData);
      res.status(200).send('Form data deleted successfully');
    } catch (err) {
      console.error('Failed to delete data:', err);
      res.status(500).send('Failed to delete data');
    }
  });


  app.put('/formdata/:id', async (req, res) => {
    try {
      const formDataId = req.params.id; // Get the ID from the URL parameters
      const updatedData = req.body; // Get the updated data from the request body
  
      // Find the document by ID and update it
      updatedFormData = await FormData.findByIdAndUpdate(
        formDataId,
        { task_data: updatedData.task_data }, // Update the task_data field
        { new: true, runValidators: true } // Return the updated document and run validation
      );
      console.log("<<<<<<<<<<<<<<<FormData>>>>>>>>>>>>>>>>",FormData)
  
      if (!updatedFormData) {
        return res.status(404).send('Form data not found');
      }
  
      console.log('Data updated in MongoDB:', updatedFormData);
      res.status(200).send(updatedFormData.task_data);
    } catch (err) {
      console.error('Failed to update data:', err);
      res.status(500).send('Failed to update data');
    }
  });




// Route to handle form data submission to SubmittedData
app.post('/submitteddata', async (req, res) => {
  console.log("<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>",req.body)

  try {
    const newSubmittedData = new SubmittedData({
     
      data: req.body.data 
    });

    await newSubmittedData.save();
    res.status(201).json(newSubmittedData);
  } catch (err) {
    console.error('Failed to save SubmittedData:', err);
    res.status(500).send('Failed to save SubmittedData');
  }
});

  
// Route to serve options data
app.get('/optionsdata', (req, res) => {
  res.send(optionsData);
});

module.exports = app;
