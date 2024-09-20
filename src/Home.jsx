import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import FormBuilder from './index'; // Adjust the import according to your file structure
import * as variables from '../variables'; // Adjust the import according to your file structure

const url = '/api/formdata';
const saveUrl = '/api/formdata';
const linkStyles = {
  textDecoration: 'none', // Remove underline from links
  color: 'white', // Link color
};

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: 'grey',
  borderRadius: '8px', // Rounded corners
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow
  margin: '10px',
};

const linkContainerStyles = {
  backgroundColor: 'darkred', // Slightly darker background for better contrast
  padding: '15px',
  borderRadius: '5px',
  margin: '10px',
  textAlign: 'center',
  width: '100%', // Full width for responsive design
  maxWidth: '300px', // Max width for larger screens
  color: 'white', // Text color
  fontFamily: 'Arial, sans-serif', // Font family
};

const Home = () => (
  <div>
    <h1>Home Page</h1>
    {/* <Link to="/form">Go to Form Page</Link> */}
    {/* Ensure FormBuilder is imported and used correctly */}
    {/* <FormBuilder.ReactFormBuilder
      variables={variables}
      url={url}
      saveUrl={saveUrl}
      locale='en'
      saveAlways={false}
    /> */}
  <div style={containerStyles}>
    {/* <div style={linkContainerStyles}>
      <b><a href='/form' style={linkStyles}>Form Creator</a><br /></b>
    </div> */}

    <div style={linkContainerStyles}>
      <b><a href='/formView' style={linkStyles}>Form Data</a></b>
    </div>
    <div style={linkContainerStyles}>
      <b><a href='/formRender' style={linkStyles}>Form Render</a></b>
    </div>
  </div>
  </div>
);

export default Home;
