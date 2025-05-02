

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './delete.css';

// const StudentList = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch students on component mount
//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     setLoading(true);
//     setError(null); // Reset previous errors
//     try {
//       const response = await axios.get('http://localhost:5000/view_students');
//       setStudents(response.data.students); // Update the students list
//     } catch (error) {
//       setError('Error fetching students.'); // Show error if the request fails
//       console.error('Error fetching students:', error);
//     } finally {
//       setLoading(false); // Stop the loading indicator once the request finishes
//     }
//   };

//   const deleteStudent = async (qrCode) => {
//     if (!window.confirm('Are you sure you want to delete this student?')) return;

//     setLoading(true); // Set loading true during the delete operation
//     setError(null); // Reset any previous errors

//     try {
//       // Send delete request to the backend
//       await axios.delete(`http://localhost:5000/delete_student/${qrCode}`);
//       alert('Student deleted successfully');
//       fetchStudents(); // Refresh the student list after successful deletion
//     } catch (error) {
//       setError('Failed to delete student.'); // Set error if deletion fails
//       console.error('Error deleting student:', error);
//       alert('Failed to delete student');
//     } finally {
//       setLoading(false); // Stop loading after delete operation finishes
//     }
//   };

//   return (
//     <div className="student-list">
//       <h2>Student List</h2>

//       {/* Loading state */}
//       {loading && <div className="loading">Loading...</div>}

//       {/* Error message */}
//       {error && <div className="error-message">{error}</div>}

//       {/* Empty state if no students are found */}
//       {!loading && !students.length && <div>No students found.</div>}

//       {/* List of students */}
//       {students.map((student) => (
//         <div key={student["QR Code"]} className="student-card">
//           <strong>{student.Name}</strong> ({student.Class}) <br />
//           QR Code: {student["QR Code"]} <br />
//           Disrespect Count: {student["Disrespect Count"]} <br />

//           <button
//             onClick={() => deleteStudent(student["QR Code"])}
//             className="delete-button"
//             disabled={loading} // Disable button while loading
//           >
//             {loading ? 'Deleting...' : 'Delete'}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StudentList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './delete.css'; // Style as needed

const StudentList = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/view_students');
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDelete = async (qr_code) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete_student/${qr_code}`);
      console.log('Deleted:', response.data);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="student-list-container">
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>QR Code</th>
              <th>Name</th>
              <th>Class</th>
              <th>Disrespect Count</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student['S.No']}>
                <td>{student['S.No']}</td>
                <td>{student['QR Code']}</td>
                <td>{student['Name']}</td>
                <td>{student['Class']}</td>
                <td>{student['Disrespect Count']}</td>
                <td>{student['Date Added']}</td>
                <td>
                  <button onClick={() => handleDelete(student['QR Code'])}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
