// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, onSave, onFormNameChange }) => {
  if (!isOpen) return null;

  const handleFormNameChange = (e) => {
    onFormNameChange(e.target.value);
  };

  const handleSave = () => {
    onSave();
    onClose(); // Close the modal after saving
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the top
    zIndex: 1000,
  };

  const modalContentStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    marginTop: '20px', // Space from the top
    width: '400px', // Fixed width or max-width
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    fontSize: '20px',
  };

  return (
    <div style={overlayStyle}>
      <div style={modalContentStyle}>
        <span style={closeButtonStyle} onClick={onClose}>&times;</span>
        <h2>Enter Form Name</h2>
        <input
          type="text"
          onChange={handleFormNameChange}
          placeholder="Form Name"
          style={{ width: '100%', padding: '10px', marginTop: '10px' }}
        />
        <button
          onClick={handleSave}
          style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal;
