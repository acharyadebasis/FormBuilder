import React, { useState } from 'react';




const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px', // space between form elements
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const buttonStyles = {
  width: '150px', // Fixed width for the button
  padding: '10px 20px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  textAlign: 'center', // Center text within the button
};

const buttonHoverStyles = {
  backgroundColor: '#0056b3',
};

// Inline styles for modal
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

// Helper function to render different form elements based on JSON data
const renderField = (field, handleChange, values) => {
  const {
    element,
    field_name,
    label,
    src,
    content,
    href,
    dateFormat,
    timeFormat,
    showTimeSelect,
    showTimeSelectOnly,
    showTimeInput,
    readOnly,
    required,
    options,
    class_name,
    col_count,
    step,
    default_value,
    min_value,
    max_value,
    min_label,
    max_label,
    file_path,
    _href
  } = field;

  switch (element) {
    case 'Header':
      return (
        <div key={field_name} style={{ margin: '10px 0' }}>
          <h3 dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      );
    case 'Label':
      return (
        <div key={field_name} style={{ margin: '10px 0' }}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <strong>{content}</strong>
        </div>
      );
    case 'Paragraph':
      return (
        <div key={field_name} style={{ margin: '10px 0' }}>
          <p>{content}</p>
        </div>
      );
    case 'LineBreak':
      return (
        <div key={field_name} style={{ margin: '10px 0' }}>
          <hr />
        </div>
      );
    case 'Dropdown':
      return (
        <div key={field_name}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <select
            id={field_name}
            name={field_name}
            value={values[field_name] || ''}
            onChange={handleChange}
            required={required}
          >
            {options && options.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      );
    case 'Tags':
      return (
        <div key={field_name}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <select
            id={field_name}
            name={field_name}
            multiple
            value={values[field_name] || []}
            onChange={handleChange}
            required={required}
          >
            {options && options.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      );
    case 'EmailInput':
      return (
        <div key={field_name}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <input
            type="email"
            id={field_name}
            name={field_name}
            value={values[field_name] || ''}
            onChange={handleChange}
          />
        </div>
      );
    case 'TextInput':
      return (
        <div key={field_name}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <input
            type="text"
            id={field_name}
            name={field_name}
            value={values[field_name] || ''}
            onChange={handleChange}
          />
        </div>
      );
    case 'NumberInput':
      return (
        <div key={field_name}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <input
            type="number"
            id={field_name}
            name={field_name}
            value={values[field_name] || ''}
            onChange={handleChange}
          />
        </div>
      );
    case 'Textarea':
      return (
        <div key={field_name}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <textarea
            id={field_name}
            name={field_name}
            value={values[field_name] || ''}
            onChange={handleChange}
            required={required}
          />
        </div>
      );
    case 'Select':
      return (
        <div key={field_name}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <select
            id={field_name}
            name={field_name}
            value={values[field_name] || ''}
            onChange={handleChange}
            required={required}
          >
            {options && options.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      );
    case 'RadioButtons':
      return (
       
        <div key={field_name}>
          <label>{label}</label>
          {options && options.map(option => (
            <div key={option.value}>
              <input
                type="radio"
                id={`${field_name}_${option.value}`}
                name={field_name}
                value={option.value}
                checked={values[field_name] === option.value}
                onChange={handleChange}
                required={required}
              />
              <label htmlFor={`${field_name}_${option.value}`}>{option.text}</label>
            </div>
          ))}
        </div>
      );
    case 'Checkboxes':
      return (
        <div key={field_name}>
          <label>{label}</label>
          {options && options.map(option => (
            <div key={option.value}>
              <input
                type="checkbox"
                id={`${field_name}_${option.value}`}
                name={field_name}
                value={option.value}
                checked={values[field_name] && values[field_name].includes(option.value)}
                onChange={handleChange}
              />
              <label htmlFor={`${field_name}_${option.value}`}>{option.text}</label>
            </div>
          ))}
        </div>
      );
    case 'PhoneNumber':
      return (
        <div key={field_name} style={{ margin: '10px 0' }}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <input
            type="tel"
            id={field_name}
            name={field_name}
            value={values[field_name] || ''}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>
      );
    case 'TextArea':
      return (
        <div key={field_name} style={{ margin: '10px 0' }}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <textarea
            id={field_name}
            name={field_name}
            value={values[field_name] || ''}
            onChange={handleChange}
            required={required}
            placeholder="Enter text here"
          />
        </div>
      );
    case 'FieldSet':
      return (
        <fieldset key={field_name} style={{ margin: '10px 0' }}>
          <legend>{label}</legend>
          {field.childItems && field.childItems.map(child => renderField(child, handleChange, values))}
        </fieldset>
      );
    case 'TwoColumnRow':
      return (
        <div key={field_name} style={{ display: 'flex', gap: '10px' }}>
          {field.childItems && field.childItems.map((child, index) => (
            <div key={index} style={{ flex: '1' }}>
              {renderField(child, handleChange, values)}
            </div>
          ))}
        </div>
      );
    case 'ThreeColumnRow':
      return (
        <div key={field_name} style={{ display: 'flex', gap: '10px' }}>
          {field.childItems && field.childItems.map((child, index) => (
            <div key={index} style={{ flex: '1' }}>
              {renderField(child, handleChange, values)}
            </div>
          ))}
        </div>
      );
    case 'MultiColumnRow':
      return (
        <div key={field_name} className={`multi-column-row ${class_name || ''}`} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {field.childItems && field.childItems.map((child, index) => (
            <div key={index} style={{ flex: `1 1 ${100 / col_count}%` }}>
              {renderField(child, handleChange, values)}
            </div>
          ))}
        </div>
      );
    case 'Image':
      return (
        <div key={field_name} style={{ margin: '10px 0', textAlign: 'center' }}>
          {src ? (
            <img
              src={src}
              alt={label || 'Image'}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
      );
    case 'Rating':
      return (
        <div key={field_name} style={{ margin: '10px 0' }}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <select
            id={field_name}
            name={field_name}
            value={values[field_name] || ''}
            onChange={handleChange}
            required={required}
          >
            <option value="">Select a rating</option>
            {[1, 2, 3, 4, 5].map(rating => (
              <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      );
    case 'DatePicker':
      return (
        <div key={field_name} style={{ margin: '10px 0' }}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <input
            type="date"
            id={field_name}
            name={field_name}
            value={values[field_name] || ''}
            onChange={handleChange}
            required={required}
          />
        </div>
      );
    case 'Signature':
      return (
        <div key={field_name} style={{ margin: '10px 0' }}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <div style={{ border: '1px solid black', width: '100%', height: '150px' }}>
            {/* Placeholder for signature capture */}
            <p>Signature placeholder</p>
          </div>
        </div>
      );
    case 'HyperLink':
      return (
        <div key={field_name} style={{ margin: '10px 0' }}>
          <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>
        </div>
      );
    case 'Download':
      return (
        <div key={field_name} style={{ margin: '10px 0' }}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          {file_path ? (
            <a href={file_path} download>
              {content || 'Download File'}
            </a>
          ) : (
            <p>No file available</p>
          )}
        </div>
      );
    case 'Range':
      return (
        <div key={field_name} style={{ margin: '10px 0' }}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <input
            type="range"
            id={field_name}
            name={field_name}
            step={step || 1}
            min={min_value || 0}
            max={max_value || 100}
            value={values[field_name] || default_value || 0}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{min_label || 'Min'}</span>
            <span>{max_label || 'Max'}</span>
          </div>
        </div>
      );
    case 'Camera':
      return (
        <div key={field_name} style={{ margin: '10px 0' }}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <input type="file" />
          {/* Uncomment and implement camera functionality if needed */}
          {/* <button onClick={() => alert('Camera functionality not implemented')}>
            Open Camera
          </button> */}
        </div>
      );
    case 'FileUpload':
      return (
        <div key={field_name} style={{ margin: '10px 0' }}>
          <label htmlFor={field_name} dangerouslySetInnerHTML={{ __html: label }} />
          <input
            type="file"
            id={field_name}
            name={field_name}
            onChange={handleChange}
          />
        </div>
      );
    default:
      return <div>Unable to render field. Check DynamicForm.jsx</div>;
  }
};

// DynamicForm Component
const DynamicForm = ({ data, onSubmit, onClose }) => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues(prevValues => {
      if (type === 'checkbox') {
        const updatedValues = { ...prevValues };
        if (!updatedValues[name]) {
          updatedValues[name] = [];
        }
        if (checked) {
          updatedValues[name].push(value);
        } else {
          updatedValues[name] = updatedValues[name].filter(val => val !== value);
        }
        return updatedValues;
      }
      return {
        ...prevValues,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(formValues);
    }
  };

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <span style={closeButtonStyles} onClick={onClose}>&times;</span>
        <h2>Dynamic Form</h2>
        <form
          onSubmit={handleSubmit}
          style={formStyles}
        >
          {data.map(field => renderField(field, handleChange, formValues))}
          <button
            type="submit"
            style={buttonStyles}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};


export default DynamicForm;
