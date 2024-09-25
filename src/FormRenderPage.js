import React, { useContext ,useState} from 'react';
import { FormContext } from './FormContext';
import { ReactFormGenerator } from './index';
import * as variables from '../variables';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Don't forget to import axios
import { theme } from './theme';


const FormRenderPage = () => {
  const navigate = useNavigate();
  const { previewData } = useContext(FormContext); // Access the context
  
//   const [selectedTheme, setSelectedTheme] = useState(themes[0]); // Default to first theme

//   const handleThemeChange = (theme) => {
//     setSelectedTheme(theme);
//   };


const getThemeByName = (themeName) => {
    {console.log("+++++",themeName)}
    return theme.find(theme => theme.name.toLowerCase() === themeName.toLowerCase()) || theme[0]; 
};


  const closePreview = () => {
    navigate('/FormRender');
    console.log("close");
  };

  const handleSubmit = async (data) => {
    console.log("data=====>>>", data); // You can log the data if needed

    try {
      const response = await axios.post('api/submitteddata', { data });
      console.log('Data submitted:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };


  const themeName = previewData.theme; 
    const themes = getThemeByName(themeName);

  return (
    <div>
      <h1>Render Form</h1>
    
      <div >
        <ReactFormGenerator
          download_path=""
          back_action="/"
          back_name="Back"
          answer_data={{}} // Replace with actual answers if needed
          onSubmit={handleSubmit} // Use handleSubmit correctly
          action_name="Submit"
          form_action="/api/form"
          form_method="POST"
          variables={variables}
          data={previewData.task_data}
          locale='en'
          style={{ backgroundColor: themes.backgroundColor, color: themes.textColor }} 
        />

        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closePreview}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default FormRenderPage;
