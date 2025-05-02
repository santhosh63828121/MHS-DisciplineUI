

// import React, { useState } from 'react';
// import axios from 'axios';
// import './Home.css'

// const StudentDisciplineSystem = () => {
//   const [qrCode, setQrCode] = useState('');
//   const [studentData, setStudentData] = useState(null);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleQrCodeChange = (e) => {
//     setQrCode(e.target.value);
//   };

//   const handleScan = async () => {
//     if (!qrCode.trim()) {
//       setMessage('Please enter a valid QR Code.');
//       return;
//     }

//     setLoading(true);
//     setMessage('');
//     setStudentData(null);

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/scan', {
//         qr_code: qrCode,
//       });

//       const student = response.data.student;

//       const normalizedStudent = {
//         id: student['S.No'],
//         qrCode: student['QR Code'],
//         name: student['Name'],
//         studentClass: student['Class'],
//         disrespectCount: student['Disrespect Count'],
//         dateAdded: student['Date Added'],
//         disrespectHistory: student['Disrespect History'] || []
//       };

//       setStudentData(normalizedStudent);
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage('Error occurred or student not found.');
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <h1>🎓 Student Discipline Tracker</h1>

//       <div style={{ marginBottom: '10px' }}>
//         <label>Enter QR Code:</label><br />
//         <input
//           type="text"
//           value={qrCode}
//           onChange={handleQrCodeChange}
//           placeholder="Enter QR Code"
//           style={{ padding: '8px', width: '100%', marginTop: '5px' }}
//         />
//       </div>

//       <button onClick={handleScan} style={{ padding: '10px 20px' }}>
//         {loading ? 'Scanning...' : 'Scan'}
//       </button>

//       {message && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{message}</p>}

//       {studentData && (
//         <div
//           style={{
//             marginTop: '20px',
//             border: '1px solid #ccc',
//             padding: '15px',
//             borderRadius: '8px',
//           }}
//         >
//           <h3>Student Info</h3>
//           <p><strong>S.No:</strong> {studentData.id}</p>
//           <p><strong>Name:</strong> {studentData.name}</p>
//           <p><strong>Class:</strong> {studentData.studentClass}</p>
//           <p><strong>QR Code:</strong> {studentData.qrCode}</p>
//           <p style={{ color: 'red', fontWeight: 'bold' }}>
//             <strong>Indiscipline Count:</strong> {studentData.disrespectCount}
//           </p>
//           <p><strong>Date Added:</strong> {studentData.dateAdded}</p>

//           {studentData.disrespectHistory.length > 0 && (
//   <div className="indiscipline-history">
//     <h4>📅 Indiscipline History</h4>
//     <ul>
//       {studentData.disrespectHistory.map((entry, index) => (
//         <li key={index}>
//           <strong>Disrespect {entry.count}:</strong> {new Date(entry.timestamp).toLocaleString()}
//         </li>
//       ))}
//     </ul>
//   </div>
// )}

//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentDisciplineSystem;

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const StudentDisciplineSystem = () => {
  const [qrCode, setQrCode] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus(); // Auto-focus when component mounts
  }, []);

  const handleQrCodeChange = (e) => {
    setQrCode(e.target.value);
  };

  const handleScan = async () => {
    if (!qrCode.trim()) {
      setMessage('Please enter a valid QR Code.');
      return;
    }

    setLoading(true);
    setMessage('');
    setStudentData(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/scan', {
        qr_code: qrCode,
      });

      const student = response.data.student;

      const normalizedStudent = {
        id: student['S.No'],
        qrCode: student['QR Code'],
        name: student['Name'],
        studentClass: student['Class'],
        disrespectCount: student['Disrespect Count'],
        dateAdded: student['Date Added'],
        disrespectHistory: student['Disrespect History'] || [],
      };

      setStudentData(normalizedStudent);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error occurred or student not found.');
    } finally {
      setLoading(false);
      setQrCode(''); // Clear input after scan
      inputRef.current?.focus(); // Refocus on input after scan
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🎓 Student Discipline Tracker</h1>

      <div style={{ marginBottom: '10px' }}>
        <label>Enter QR Code:</label><br />
        <input
          ref={inputRef}
          type="text"
          value={qrCode}
          onChange={handleQrCodeChange}
          placeholder="Enter QR Code"
          style={{ padding: '8px', width: '100%', marginTop: '5px' }}
        />
      </div>

      <button onClick={handleScan} style={{ padding: '10px 20px' }}>
        {loading ? 'Scanning...' : 'Scan'}
      </button>

      {message && (
        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{message}</p>
      )}

      {studentData && (
        <div
          style={{
            marginTop: '20px',
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <h3>Student Info</h3>
          <p><strong>S.No:</strong> {studentData.id}</p>
          <p><strong>Name:</strong> {studentData.name}</p>
          <p><strong>Class:</strong> {studentData.studentClass}</p>
          <p><strong>QR Code:</strong> {studentData.qrCode}</p>
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            <strong>Indiscipline Count:</strong> {studentData.disrespectCount}
          </p>
          <p><strong>Date Added:</strong> {studentData.dateAdded}</p>

          {studentData.disrespectHistory.length > 0 && (
            <div className="indiscipline-history">
              <h4>📅 Indiscipline History</h4>
              <ul>
                {studentData.disrespectHistory.map((entry, index) => (
                  <li key={index}>
                    <strong>Disrespect {entry.count}:</strong>{' '}
                    {new Date(entry.timestamp).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDisciplineSystem;
