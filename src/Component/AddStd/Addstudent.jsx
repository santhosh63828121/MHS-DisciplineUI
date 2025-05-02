import React, { useState } from 'react';
import axios from 'axios';
import './Addstuden.css'

const AddStudent = () => {
  const [qrCode, setQrCode] = useState('');
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [message, setMessage] = useState('');

  const handleQrCodeChange = (e) => {
    setQrCode(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleClassChange = (e) => {
    setStudentClass(e.target.value);
  };

  const handleAddStudent = () => {
    // Post data to the backend to add student
    axios.post('http://127.0.0.1:5000/add_student', {
      qr_code: qrCode,
      name: name,
      class: studentClass,
    })
    .then((response) => {
      setMessage(response.data.message);
    })
    .catch((error) => {
      setMessage('Error occurred while adding the student');
    });
  };

  return (
    <div className="add-student-container">
      <h1>Add New Student</h1>
      <form className="student-form">
        <label>QR Code:</label>
        <input 
          type="text" 
          value={qrCode} 
          onChange={handleQrCodeChange} 
          placeholder="Enter QR Code"
        />

        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={handleNameChange} 
          placeholder="Enter Name"
        />

        <label>Class:</label>
        <input 
          type="text" 
          value={studentClass} 
          onChange={handleClassChange} 
          placeholder="Enter Class"
        />

        <button type="button" onClick={handleAddStudent}>Add Student</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddStudent;
