/* import React, { useState ,useEffect} from 'react';
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

  // Load data from local storage on component mount
  useEffect(() => {
    const savedStudents = localStorage.getItem("studentResults");
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  // Function to save students to local storage
  const saveToLocalStorage = (students) => {
    localStorage.setItem("studentResults", JSON.stringify(students));
  };

  // Function to handle input changes
  const handleMarksChange = (e, studentId, fieldName) => {
    let { value } = e.target;
    // Ensure marks are within the specified range
    switch (fieldName) {
      case 'midMarks':
        value = Math.min(Math.max(parseInt(value, 10), 0), 20).toString();
        break;
      case 'terminalMarks':
        value = Math.min(Math.max(parseInt(value, 10), 0), 50).toString();
        break;
      case 'labMarks':
        value = Math.min(Math.max(parseInt(value, 10), 0), 30).toString();
        break;
      default:
        break;
    }
    const updatedStudents = students.map(student =>
      student.id === studentId ? { ...student, [fieldName]: value } : student
    );
    setStudents(updatedStudents);
    saveToLocalStorage(updatedStudents);
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
              <td><input type="number" style={{ width: '70px' }} min="0" max="20" value={student.midMarks} onChange={(e) => handleMarksChange(e, student.id, 'midMarks')} disabled={student.isLocked} /></td>
              <td><input type="number" style={{ width: '70px' }} min="0" max="30" value={student.labMarks} onChange={(e) => handleMarksChange(e, student.id, 'labMarks')} disabled={student.isLocked} /></td>
              <td><input type="number" style={{ width: '70px' }} min="0" max="50" value={student.terminalMarks} onChange={(e) => handleMarksChange(e, student.id, 'terminalMarks')} disabled={student.isLocked} /></td>
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
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './table.css';

const StudentTable = ({ batchId, labCreditHours, examDate }) => {
  const [students, setStudents] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/course/view?batchId=${batchId}`);
        console.log("Fetched students data:", response.data);
        const uniqueStudents = Array.from(new Map(response.data.map(student => [student.studentId, student])).values());
        setStudents(uniqueStudents);
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };

    if (batchId) {
      fetchStudents();
    }
  }, [batchId]);

  const handleMarksChange = (e, studentId, fieldName) => {
    let { value } = e.target;
    if (fieldName === 'midMarks') {
      value = Math.min(Math.max(parseInt(value, 10), 0), 20).toString();
    } else if (fieldName === 'terminalMarks') {
      value = labCreditHours === 1 ? Math.min(Math.max(parseInt(value, 10), 0), 50).toString() : Math.min(Math.max(parseInt(value, 10), 0), 80).toString();
    } else if (fieldName === 'labMarks') {
      value = labCreditHours === 1 ? Math.min(Math.max(parseInt(value, 10), 0), 30).toString() : '0';
    }

    const updatedStudents = students.map(student =>
      student.studentId === studentId ? { ...student, [fieldName]: value } : student
    );
    setStudents(updatedStudents);
  };

  const calculateTotalMarks = (midMarks, terminalMarks, labMarks) => {
    const mid = parseFloat(midMarks);
    const terminal = parseFloat(terminalMarks);
    const lab = parseFloat(labMarks);
    return !isNaN(mid) && !isNaN(terminal) && !isNaN(lab) ? mid + terminal + lab : '';
  };

  const calculateGPA = (totalMarks) => {
    const marks = parseFloat(totalMarks);
    if (marks >= 85) return '4.00';
    else if (marks >= 80) return '3.66';
    else if (marks >= 75) return '3.33';
    else if (marks >= 70) return '3.00';
    else if (marks >= 65) return '2.66';
    else if (marks >= 60) return '2.22';
    else if (marks < 60) return '2.00';
    else return '';
  };

  const handleSave = async (student) => {
    const isAttempt = [student.midMarks, student.terminalMarks, student.labMarks].every(mark => parseInt(mark, 10) === 0) ? 0 : 1;

    const resultData = {
      studentId: student.studentId,
      assignId: student.assignId,
      terminalSessionalMarks: student.terminalMarks,
      midMarks: student.midMarks,
      labMarks: student.labMarks,
      totalMarks: calculateTotalMarks(student.midMarks, student.terminalMarks, student.labMarks),
      isAttempt,
      GPA: calculateGPA(calculateTotalMarks(student.midMarks, student.terminalMarks, student.labMarks)),
      examDate,
      submissionDate: "", // Add submissionDate if needed
      resultCode: "" // Add resultCode if needed
    };

    try {
      const addResponse = await axios.post('http://localhost:8081/result/Add', resultData);
      if (addResponse.data.success) {
        const resultId = addResponse.data.resultId;
        console.log("rr",(resultId));
        const getResponse = await axios.get(`http://localhost:8081/result/Get/${resultId}`);
        if (getResponse.data) {
          console.log("ss",getResponse.data)
          console.log("stu",student.studentId)
          console.log("students",student)
          // Update only the result-related fields in the corresponding student row
        const updatedStudents = students.map(s =>
          s.studentId === student.studentId
              ? {
                  ...s,
                  midMarks: getResponse.data.midMarks,
                  terminalSessionalMarks: getResponse.data.terminalMarks,
                  labMarks: getResponse.data.labMarks,
                  totalMarks: getResponse.data.totalMarks,
                  GPA: getResponse.data.GPA
              }
              : s
            
      );
      console.log('Updated Students:', updatedStudents);
        setStudents(updatedStudents);
        }
      }
      alert('Result saved and fetched successfully');
    } catch (error) {
      alert('Error saving and fetching result:', error);
    }
  };

  const handleLockResult = () => setIsLocked(true);
  const handleEnableEditing = () => setIsLocked(false);

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
            <th>Edit</th>
            <th>Save</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.seatNo}</td>
              <td>{student.enrollment}</td>
              <td>{student.name}</td>
              <td>{student.fatherName}</td>
              <td><input type="number" style={{ width: '70px' }} min="0" max="20" value={student.midMarks || ''} onChange={(e) => handleMarksChange(e, student.studentId, 'midMarks')} disabled={isLocked} /></td>
              <td><input type="number" style={{ width: '70px' }} min="0" max="30" value={student.labMarks || ''} onChange={(e) => handleMarksChange(e, student.studentId, 'labMarks')} disabled={labCreditHours === 0 || isLocked} /></td>
              <td><input type="number" style={{ width: '70px' }} min="0" max={labCreditHours === 1 ? "50" : "80"} value={student.terminalMarks || ''} onChange={(e) => handleMarksChange(e, student.studentId, 'terminalMarks')} disabled={isLocked} /></td>
              <td><input type="number" style={{ width: '70px' }} value={calculateTotalMarks(student.midMarks, student.terminalMarks, student.labMarks) || ''} readOnly /></td>
              <td><input type="text" style={{ width: '70px' }} value={calculateGPA(calculateTotalMarks(student.midMarks, student.terminalMarks, student.labMarks)) || ''} readOnly /></td>
              <td><button className='btn btn-primary' onClick={handleEnableEditing}>Edit</button></td>
              <td><button className='btn btn-primary' onClick={() => handleSave(student)}>Save</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLockResult}>Lock Result</button>
    </div>
  );
};

export default StudentTable;
