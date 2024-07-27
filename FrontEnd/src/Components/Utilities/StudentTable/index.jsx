import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './table.css';
import { useLocation } from "react-router-dom";

const StudentTable = ({ batchId, labCreditHours, examDate }) => {
  const [students, setStudents] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null); // Track the student being edited

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/teachercourse/view?batchId=${batchId}`);
        console.log("Fetched students data:", response.data);
        const uniqueStudents = Array.from(new Map(response.data.map(student => [student.studentId, student])).values());
        setStudents(uniqueStudents);
        setDataFetched(false);
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };

    if (batchId) {
      fetchStudents();
    }
  }, [batchId]);

  useEffect(() => {
    const fetchResultData = async () => {
      try {
        if (students.length > 0) {
          const results = await Promise.all(
            students.map(student =>
              axios.get(`http://localhost:8081/result/Get/${student.studentId}/${student.assignId}`)
                .then(res => ({ studentId: student.studentId, result: res.data }))
            )
          );

          const updatedStudents = students.map(student => {
            const result = results.find(r => r.studentId === student.studentId)?.result || {};
            return {
              ...student,
              resultId: result.resultId, // Ensure resultId is included
              midMarks: result.midMarks || '',
              terminalMarks: result.terminalMarks || '',
              labMarks: result.labMarks || '0',
            };
          });

          setStudents(updatedStudents);
          console.log("Updated students with results:", updatedStudents);
          setDataFetched(true);
        }
      } catch (error) {
        console.error("Error fetching result data:", error);
      }
    };

    if (batchId && !dataFetched) {
      fetchResultData();
    }
  }, [batchId, students, dataFetched]);

  const handleMarksChange = (e, studentId, fieldName) => {
    let { value } = e.target;
    if (fieldName === 'midMarks') {
      value = Math.min(Math.max(parseInt(value, 10), 0), 20).toString();
    } else if (fieldName === 'terminalMarks') {
      value = labCreditHours === 1 ? Math.min(Math.max(parseInt(value, 10), 0), 50).toString() : Math.min(Math.max(parseInt(value, 10), 0), 80).toString();
    } else if (fieldName === 'labMarks') {
      if (labCreditHours === 0) {
        value = '0';
      } else {
        value = Math.min(Math.max(parseInt(value, 10), 0), 30).toString();
      }}

    const updatedStudents = students.map(student =>
      student.studentId === studentId ? { ...student, [fieldName]: value } : student
    );
    setStudents(updatedStudents);
  };

  const calculateTotalMarks = (midMarks, terminalMarks, labMarks) => {
    const mid = parseFloat(midMarks);
    const terminal = parseFloat(terminalMarks);
    const lab = parseFloat(labMarks);
    return !isNaN(mid) && !isNaN(terminal) && !isNaN(lab) ? mid + terminal + lab : '' ;
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
      submissionDate: " ", // Placeholder, modify as needed
      resultCode: " " // Placeholder, modify as needed
    };
    console.log("Sending result data:", resultData);

    try {
      const postRes = await axios.post("http://localhost:8081/result/Add", resultData);
      console.log("Response from server:", postRes.data);
      if (postRes.data === "success") {
        alert("Result is added successfully");
        window.location.reload(); // Refresh the page
        setIsLocked(true); // Lock fields after saving
        setEditStudentId(null); // Reset editing state
      } else {
        console.log("Error adding result");
      }
    } catch (error) {
      console.log("Error posting result:", error);
    }
  };

  const handleUpdate = async (student) => {
    const resultData = {
      studentId: student.studentId,
      assignId: student.assignId,
      terminalSessionalMarks: student.terminalMarks,
      midMarks: student.midMarks,
      labMarks: student.labMarks,
      totalMarks: calculateTotalMarks(student.midMarks, student.terminalMarks, student.labMarks),
      GPA: calculateGPA(calculateTotalMarks(student.midMarks, student.terminalMarks, student.labMarks)),
      examDate,
      submissionDate: " ", // Placeholder, modify as needed
      resultCode: " " // Placeholder, modify as needed
    };

    console.log("Sending updated result data:", resultData);

    try {
      const putRes = await axios.put(`http://localhost:8081/result/Update/${student.resultId}`, resultData);
      console.log("Response from server:", putRes.data);
      if (putRes.data.updated) {
        alert("Result updated successfully");
        window.location.reload(); // Refresh the page
        setIsLocked(true); // Lock fields after updating
        setEditStudentId(null); // Reset editing state
      } else {
        console.log("Error updating result");
      }
    } catch (error) {
      console.log("Error updating result:", error);
    }
  };

  const handleLockResult = async () => {
    const updatedStudents = students.map(student => ({
      ...student,
      submissionDate: new Date().toISOString().split('T')[0], // Set current date as submission date
      resultCode: `R${student.studentId}-${new Date().getTime()}` // Generate a result code
    }));

    try {
      // Send updated students data to the server
      const responses = await Promise.all(
        updatedStudents.map(student =>
          axios.put(`http://localhost:8081/result/Update/${student.resultId}`, {
            studentId: student.studentId,
            assignId: student.assignId,
            terminalSessionalMarks: student.terminalMarks,
            midMarks: student.midMarks,
            labMarks: student.labMarks,
            totalMarks: calculateTotalMarks(student.midMarks, student.terminalMarks, student.labMarks),
            GPA: calculateGPA(calculateTotalMarks(student.midMarks, student.terminalMarks, student.labMarks)),
            examDate,
            submissionDate: student.submissionDate,
            resultCode: student.resultCode
          })
        )
      );

      const allSuccess = responses.every(res => res.data.updated);
      if (allSuccess) {
        alert("All results locked successfully");
        setStudents(updatedStudents);
        setIsLocked(true); // Lock fields after locking results
      } else {
        console.log("Error locking results");
      }
    } catch (error) {
      console.error("Error locking results:", error);
    }
  };

  const handleEnableEditing = (studentId) => {
    setIsLocked(false); // Unlock fields for editing
    setEditStudentId(studentId);
  };
  const location = useLocation();
  const courseData = location.state?.course;
  const courseName = courseData?.course_title;
  const courseCode = courseData?.course_code;

  const [teacherEmail, setTeacherEmail] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherName, setTeacherName] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/session", {
          withCredentials: true,
        });
        setTeacherEmail(response.data.user);
        setTeacherId(response.data.userId);
        setTeacherName(response.data.userName);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const date = getCurrentDate();

  console.log(
    "first",
    teacherEmail,
    teacherId,
    teacherName,
    courseCode,
    courseName,
    Date
  );

  // State variables to hold the input values
  const [values, setValues] = useState({
    teacherID: teacherId,
    courseCode: courseCode,
    courseName: courseName,
    description: "i want to update",
    dateCreated: date,
    dateUpdated: date,
    currentHandle:"teacher",
    status: "createdByTeacher",
  });
  useEffect(() => {
    // Update values after admin is set
    if (teacherId !== null) {
      setValues((prev) => ({
        ...prev,
        teacherID: teacherId,
      }));
    }
  }, [teacherId]);
  const [errors, setErrors] = useState({});
  console.log("val", values);

  const handleEditRequest = async (event) => {
    event.preventDefault();
    axios.post("http://localhost:8081/editRequest/Add", values).then((res) => {
      
      if (res.data === "success") {
        alert("request is added successfully");
        window.location.reload(); // Refresh the page
      } else {
        console.log("error");
      }
    });
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
            <th>Actions</th>
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
              <td>
                <input
                  type="number"
                  style={{ width: '70px' }}
                  min="0"
                  max="20"
                  value={student.midMarks || ''}
                  onChange={(e) => handleMarksChange(e, student.studentId, 'midMarks')}
                  disabled={isLocked && editStudentId !== student.studentId}
                />
              </td>
              <td>
                <input
                  type="number"
                  style={{ width: '70px' }}
                  min="0"
                  max="30"
                  value={student.labMarks || ''}
                  onChange={(e) => handleMarksChange(e, student.studentId, 'labMarks')}
                  disabled={(isLocked && editStudentId !== student.studentId)}
                />
              </td>
              <td>
                <input
                  type="number"
                  style={{ width: '70px' }}
                  min="0"
                  max={labCreditHours === 1 ? "50" : "80"}
                  value={student.terminalMarks || ''}
                  onChange={(e) => handleMarksChange(e, student.studentId, 'terminalMarks')}
                  disabled={isLocked && editStudentId !== student.studentId}
                />
              </td>
              <td>
                <input
                  type="number"
                  style={{ width: '70px' }}
                  min="0"
                  max="100"
                  value={calculateTotalMarks(student.midMarks, student.terminalMarks, student.labMarks) || ''}
                  readOnly
                />
              </td>
              <td>
                <input
                  type="text"
                  style={{ width: '70px' }}
                  value={calculateGPA(calculateTotalMarks(student.midMarks, student.terminalMarks, student.labMarks)) || ''}
                  readOnly
                />
              </td>
              <td>
                {student.resultId ? (
                  <>
                    {editStudentId === student.studentId ? (
                      <button id='buttons123'
                        onClick={() => handleUpdate(student)}
                        disabled={isLocked}
                      >
                        Update
                      </button>
                    ) : (
                      <button id='buttons123'
                        onClick={() => handleEnableEditing(student.studentId)}
                        disabled={isLocked}
                      >
                        Edit
                      </button>
                    )}
                  </>
                ) : (
                  <button
                  id='buttons123'
                    onClick={() => handleSave(student)}
                    disabled={isLocked}
                  >
                    Save
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttonContainer">
      <button onClick={handleLockResult} disabled={isLocked}>
  Lock Results
</button>
<button onClick={handleEditRequest}>Request for Editing</button>
</div>
    </div>
  );
};

export default StudentTable;
