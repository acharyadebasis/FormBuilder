import React from 'react';
import FormBuilder from './index'; // Adjust the import according to your file structure
import * as variables from '../variables'; // Adjust the import according to your file structure
import DemoBar from '../demobar';

const url = '/api/formdata';
const saveUrl = '/api/formdata';

const linkStyles = {
  textDecoration: 'none',
  color: 'white',
};
   
const linkContainerStyles = {
  backgroundColor: 'darkred', 
  padding: '15px',
  borderRadius: '5px',
  margin: '4px',
  textAlign: 'center',
  width: '50%', 
  maxWidth: '300px', 
  color: 'white', 
  fontFamily: 'Arial, sans-serif',
  alignItems: 'flex-end'
};

const containerStyles = {
  display: 'flex',
  justifyContent: 'flex-end', // Align items to the right
  alignItems: 'flex-start',  // Align items to the top
  height: '10vh',           // Full viewport height to push content to the top
  padding: '20px',          // Add padding if needed
};

const FormPage = () => (
  <div>
    <h1>Form Page</h1>
    <div style={containerStyles}>
    <div style={linkContainerStyles}>
      <b><a href='/' style={linkStyles}>Back to Home</a><br /></b>
    </div>
  </div>
    <DemoBar variables={variables} />
    <FormBuilder.ReactFormBuilder
      variables={variables}
      url={url}
      saveUrl={saveUrl}
      locale='en'
      saveAlways={false}
    />
  </div>
);

export default FormPage;
