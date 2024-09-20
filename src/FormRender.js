import React from 'react';
import axios from 'axios';
import FormBuilder from './index'; // Adjust the import according to your file structure
import * as variables from '../variables'; // Adjust the import according to your file structure
import DemoBar from '../demobar';
// import DynamicForm from './DynamicForm'; 



// import * as variables from '../variables';
import store from './stores/store';
import { ReactFormGenerator } from './index';

const url = '/api/formdata';
const saveUrl = '/api/formdata';
const answers = {};
class FormRender extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      previewVisible: false,
      check: false,
      currentItemId: null,
      currentItemData: null,
      previewData: [],
    };

    const update = this._onChange.bind(this);
    store.subscribe(state => update(state.data));
  }

  componentDidMount() {
    this.fetchData();
    console.log("Fetch>>>>>:",this.state.data)
  }

  fetchData = async () => {
    try {
      const response = await axios.get('/api/formdata/forms');
      console.log(response.data)
      
      this.setState({ data: response.data });
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      alert('An error occurred while fetching data. Check the console for details.');
    }
  };

  // togglePreview = (item) => {
  //   this.setState(prevState => ({
  //     previewVisible: !prevState.previewVisible,
  //     previewData: item ? item.task_data : null,
  //   }));
  // };

  editClick = async (id) => {
    console.log(id);

    const currentItem = this.state.data.find(data => data._id === id);
    console.log(currentItem);

    this.setState({
      check: true,
      currentItemId: id,
      currentItemData: currentItem.task_data,
    });

    try {
      const response = await axios.put(`/api/formdata/${id}`, currentItem.task_data);
      console.log("Update response", response);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  handlePreviewSubmit = (formData) => {
    console.log('Form submitted with data:', formData);
    this.setState({ previewVisible: false });
  };

  closeModal = () => {
    this.setState({ check: false, previewVisible: false });
  };

  handleLinkClick = (item) => {
    console.log('Form Data:', item.task_data);

    const blob = new Blob([JSON.stringify(item.task_data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formdata_${item._id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };




  showPreview=(formData)=> {
    console.log("<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>",formData)
    // this.saveFormData();
    this.setState({
      previewVisible: true,
      previewData:formData
    });
   
  }
  saveFormData() {
    store.dispatch('post');
  }
  _onChange(data) {
    this.setState({
      data,
    });
  }
  closePreview() {
    this.setState({
      previewVisible: false,
      previewData: null
      
    });
    this.fetchData();
  }
  handleSubmit = async (data) => {
    console.log("data=====>>>", data);
  
    axios.post('api/submitteddata', {data})
  .then(response => {
    console.log('Data submitted:', response.data);
  })
  .catch(error => {
    console.error('Error posting data:', error);
  });

  };





  render() {
    const linkContainerStyles = {
      backgroundColor: 'darkred',
      padding: '15px',
      borderRadius: '5px',
      margin: '10px',
      textAlign: 'center',
      width: '50%',
      maxWidth: '300px',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
    };


    let modalClass = 'modal';
    if (this.state.previewVisible) {
      modalClass += ' show d-block';
    }

   

    return (
      <div>
        <h1>Form Render</h1>
        <div style={linkContainerStyles}>
          <b><a href='/' style={{ textDecoration: 'none', color: 'white' }}>Back to Home</a><br /></b>
        </div>


        { this.state.previewVisible &&
          <div className={modalClass} role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                {console.log("answer:",answers)}
                {console.log("data:",this.state.previewData)}
                {console.log("variables:",this.props.variables)}
                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Back"
                  answer_data={answers}
                  onSubmit={(data) => this.handleSubmit(data)} 
                  action_name="Save"
                  form_action="/api/form"
                  form_method="POST"
                  // skip_validations={true}
                  // onSubmit={this._onSubmit}
                  variables={variables}
                  data={this.state.previewData}
                  locale='en'/>

                  <div className="modal-footer">
                    <button type="submit" className="btn btn-default" data-dismiss="modal" onClick={()=>this.closePreview()}>Close</button>
                  </div>

              </div>
            </div>
          </div>
        }

        {/* Edit Form Modal */}
        {this.state.check && (
          <div style={modalStyles}>
            <div style={modalContentStyles}>
              <span style={closeButtonStyles} onClick={this.closeModal}>&times;</span>
              <DemoBar variables={variables} />
              <FormBuilder.ReactFormBuilder
                variables={variables}
                url={url}
                saveUrl={saveUrl}
                locale='en'
                saveAlways={false}
                formData={this.state.currentItemData} // Pass form data for editing
              />
            </div>
          </div>
        )}

<table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #ddd' }}>Forms</th>
      {/* <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #ddd' }}>Actions</th> */}
    </tr>
  </thead>
  <tbody>
    {this.state.data.map((item) => (
      <tr key={item._id}>
        <td style={{ padding: '8px' }}>
          <span style={{ marginRight: '5px', color: '#007BFF' }}>•</span>


          
              <a href="#" onClick={() => this.showPreview(item.task_data)}
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#007BFF',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E0E0E0';
                  e.currentTarget.style.color = '#0056b3';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#007BFF';
                }}>
                Form {item.name}
              </a>
              </td>
              {/* <button onClick={() => this.editClick(item._id)}>Edit</button> */}
              {/* <button onClick={() => this.togglePreview(item)}>Preview</button> */}
              {/* {console.log(item.task_data)} */}
              {/* <button  onClick={}>Preview Form</button> */}
           </tr>
           ))}
           </tbody>
           </table>
           
      </div>
    );
  }
}

const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyles = {
  background: 'white',
  padding: '20px',
  borderRadius: '4px',
  width: '80%',
  height: '90%',
  maxHeight: '90%',
  overflowY: 'auto',
  position: 'relative',
};

const closeButtonStyles = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
  fontSize: '32px',
};


export default FormRender