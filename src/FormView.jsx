import React from 'react';
import axios from 'axios';
import FormBuilder from './index'; // Adjust the import according to your file structure
import * as variables from '../variables'; // Adjust the import according to your file structure
import DemoBar from '../demobar';
import DynamicForm from './DynamicForm'; // Import the DynamicForm component
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';




const url = '/api/formdata';
const saveUrl = '/api/formdata';

class FormView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      previewVisible: false,
      check: false,
      currentItemId: null,
      currentItemData: null,
      previewData: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get('/api/formdata/forms');
      this.setState({ data: response.data });
      // console.log(this.state.data)
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      alert('An error occurred while fetching data. Check the console for details.');
    }
  };

  togglePreview = (item) => {
    this.setState(prevState => ({
      previewVisible: !prevState.previewVisible,
      previewData: item ? item.task_data : null,
    }));
  };

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

  deleteFormData = async (id) => {
    try {
      const response = await axios.delete(`/api/formdata/${id}`);
      console.log(response.data); // Log the response

      // Update state to remove the deleted item
      this.setState(prevState => ({
        data: prevState.data.filter(item => item._id !== id)
      }));

      alert('Form data deleted successfully');
    } catch (error) {
      console.error('Error deleting data:', error.response ? error.response.data : error.message);
      alert('An error occurred while deleting data. Check the console for details.');
    }
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

    return (
      <div>
        <h1>Form View</h1>
        <div style={linkContainerStyles}>
          <b><a href='/' style={{ textDecoration: 'none', color: 'white' }}>Back to Home</a>
          </b>
        </div>
        <div style={linkContainerStyles}>
          <b><a href='/form' style={{ textDecoration: 'none', color: 'white' }}>New Form</a><br /></b>
        </div>

       

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

        <ul>
          {console.log("<<<<<<<<<<<<data",this.state.data)}
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #ddd' }}>Item</th>
      <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #ddd' }}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {this.state.data.map((item) => (
      <tr key={item._id}>
        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
          <span style={{ marginRight: '5px', color: '#007BFF' }}>•</span>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); this.handleLinkClick(item); }} 
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
            }}
          >
            {item.name}
          </a>
        </td>
        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
          <button onClick={() => this.editClick(item._id) } style={{ backgroundColor : '#dc3545' }}
             onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#c82333'; }}
             onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#dc3545'; }}
             >
            <FaEdit style={{ marginRight: '5px' }} /> Edit
          </button>


          <button 
              onClick={() => this.deleteFormData(item._id)} 
              style={{backgroundColor : '#dc3545'}}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#c82333'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#dc3545'; }}
            >
              <FaTrash style={{ marginRight: '5px' }} /> Delete
            </button>

          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>



        </ul>
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

export default FormView;
