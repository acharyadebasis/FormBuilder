import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormRender from './FormRender'; // Adjust path as necessary

const FormRenderWrapper = () => {
  const navigate = useNavigate();
//   {console.log("first>>>>>>")}

  return <FormRender navigate={navigate} name="debasis" />;
};

export default FormRenderWrapper;
