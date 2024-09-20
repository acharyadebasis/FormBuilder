import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './src/Home';
import FormPage from './src/FormPage';
import DemoBar from './demobar';
import * as variables from './variables';
import './scss/application.scss';
import FormView from './src/FormView';
import FormRender from './src/FormRender';

// Create a main App component to include routing
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/formView" element={<FormView />} />
      <Route path="/formRender" element={<FormRender />} />
    </Routes>
  </Router>
);

// Ensure you have correct element IDs
ReactDOM.render(
  <App />,
  document.getElementById('form-builder') // Ensure this ID matches the one in index.html
);

// ReactDOM.render(
//   <DemoBar variables={variables} />,
//   document.getElementById('demo-bar') // Ensure this ID matches the one in index.html
// );
