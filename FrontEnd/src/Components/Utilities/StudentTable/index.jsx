import React, { useState } from 'react';
import './table.css';

const StudentTable = () => {
  // State for dynamic marks
  const [students, setStudents] = useState([
    {
      id: 1,
      seatNo: '7829122',
      enrollmentNo: '2021/Comp/BSSE/25637',
      name: 'John Doe',
      fatherName: 'Michael Doe',
      midMarks: '',
      terminalMarks: '',
      labMarks: ''
    },
    {
      id: 2,
      seatNo: '7829122',
      enrollmentNo: '2021/Comp/BSSE/25637',
      name: 'John Doe',
      fatherName: 'Michael Doe',
      midMarks: '',
      terminalMarks: '',
      labMarks: ''
    },
    {
      id: 3,
      seatNo: '7829122',
      enrollmentNo: '2021/Comp/BSSE/25637',
      name: 'John Doe',
      fatherName: 'Michael Doe',
      midMarks: '',
      terminalMarks: '',
      labMarks: ''
    },
    {
      id: 4,
      seatNo: '7829122',
      enrollmentNo: '2021/Comp/BSSE/25637',
      name: 'John Doe',
      fatherName: 'Michael Doe',
      midMarks: '',
      terminalMarks: '',
      labMarks: ''
    }
  ]);

  // Function to handle input changes
  const handleInputChange = (e, studentId, fieldName) => {
    let { value } = e.target;
    // Ensure marks are within the specified range
    switch (fieldName) {
      case 'midMarks':
        value = Math.min(Math.max(parseInt(value), 0), 20).toString();
        break;
      case 'terminalMarks':
        value = Math.min(Math.max(parseInt(value), 0), 50).toString();
        break;
      case 'labMarks':
        value = Math.min(Math.max(parseInt(value), 0), 30).toString();
        break;
      default:
        break;
    }
    setStudents(prevStudents => prevStudents.map(student =>
      student.id === studentId ? { ...student, [fieldName]: value } : student
    ));
  };

  // Function to calculate total marks
  const calculateTotalMarks = (midMarks, terminalMarks, labMarks) => {
    const mid = parseFloat(midMarks);
    const terminal = parseFloat(terminalMarks);
    const lab = parseFloat(labMarks);
    return !isNaN(mid) && !isNaN(terminal) && !isNaN(lab) ? mid + terminal + lab : '';
  };

  // Function to calculate GPA
  const calculateGPA = (totalMarks) => {
    const marks = parseFloat(totalMarks);
    if (marks >= 85) {
      return '4.00';
    } else if (marks >= 80) {
      return '3.66';
    } else if (marks >= 75) {
      return '3.33';
    } else if (marks >= 70) {
      return '3.00';
    } else if (marks >= 65) {
      return '2.66';
    } else if (marks >= 60) {
      return '2.22';
    }
    else if (marks < 60) {
      return '2.00';
    } else {
      return '';
    }
  };

  const handleLockResult = () => {
    // Disable editing of marks
    const updatedStudents = students.map(student => ({
      ...student,
      isLocked: true
    }));
    setStudents(updatedStudents);
  };
  const handleEnableEditing = () => {
    // Enable editing of marks
    const updatedStudents = students.map(student => ({
      ...student,
      isLocked: false
    }));
    setStudents(updatedStudents);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>S#</th>
            <th>Seat No.</th>
            <th>Enrollment No.</th>
            <th className='name'>Student's Name</th>
            <th className='name'>Father's Name</th>
            <th className="marks">Mid (20)</th>
            <th className="marks">Lab (30)</th>
            <th className="marks">Assign + Term (50/80)</th>
            <th className="marks">Grand Total</th>
            <th className="marks">GP</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.seatNo}</td>
              <td>{student.enrollmentNo}</td>
              <td>{student.name}</td>
              <td>{student.fatherName}</td>
              <td><input type="number" style={{ width: '70px' }} min="0" max="20" value={student.midMarks} onChange={(e) => handleInputChange(e, student.id, 'midMarks')} disabled={student.isLocked} /></td>
              <td><input type="number" style={{ width: '70px' }} min="0" max="30" value={student.labMarks} onChange={(e) => handleInputChange(e, student.id, 'labMarks')} disabled={student.isLocked} /></td>
              <td><input type="number" style={{ width: '70px' }} min="0" max="50" value={student.terminalMarks} onChange={(e) => handleInputChange(e, student.id, 'terminalMarks')} disabled={student.isLocked} /></td>
              <td>{calculateTotalMarks(student.midMarks, student.terminalMarks, student.labMarks)}</td>
              <td>{calculateGPA(calculateTotalMarks(student.midMarks, student.terminalMarks, student.labMarks))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttonContainer">
        <button onClick={handleLockResult}>Lock Results</button>
        <button onClick={handleEnableEditing}>Enable Editing</button>
      </div>
    </div>
  );
};

export default StudentTable;
