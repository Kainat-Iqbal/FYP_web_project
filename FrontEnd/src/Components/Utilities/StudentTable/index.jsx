import React, { useState, useEffect } from "react";
import axios from "axios";
import "./table.css";
import { useLocation } from "react-router-dom";
import Dialogue from "../../HODPanel/Dialogue";

const StudentTable = ({ batchId, labCreditHours, examDate }) => {
  const [students, setStudents] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null); // Track the student being edited

  const location = useLocation();
  const courseData = location.state?.course;
  const courseName = courseData?.course_title;
  const courseCode = courseData?.course_code;
  const assignId = courseData?.assignId;
  const [teacherEmail, setTeacherEmail] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherName, setTeacherName] = useState(null);
  // console.log("COURSE DATA",courseData)
  // setAssignId(courseData.assignId)
  const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility
  console.log("firstASSIGN.....", assignId);
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

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/teachercourse/view?batchId=${batchId}`
        );
        console.log("Fetched students data:", response.data);
        const uniqueStudents = Array.from(
          new Map(
            response.data.map((student) => [student.studentId, student])
          ).values()
        );
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
            students.map((student) =>
              axios
                .get(
                  `http://localhost:8081/result/Get/${student.studentId}/${assignId}`
                )
                .then((res) => ({
                  studentId: student.studentId,
                  result: res.data,
                }))
            )
          );
          const updatedStudents = students.map((student) => {
            const result =
              results.find((r) => r.studentId === student.studentId)?.result ||
              {};
            return {
              ...student,
              resultId: result.resultId, // Ensure resultId is included
              midMarks: result.midMarks || "",
              terminalMarks: result.terminalMarks || "",
              labMarks: result.labMarks || "0",
            };
          });

          setStudents(updatedStudents);
          // console.log("Updated students with results:", updatedStudents);
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

  console.log("ASSIGNID Is:", assignId);

  const handleMarksChange = (e, studentId, fieldName) => {
    let { value } = e.target;
    if (fieldName === "midMarks") {
      value = Math.min(Math.max(parseInt(value, 10), 0), 20).toString();
    } else if (fieldName === "terminalMarks") {
      value =
        labCreditHours === 1
          ? Math.min(Math.max(parseInt(value, 10), 0), 50).toString()
          : Math.min(Math.max(parseInt(value, 10), 0), 80).toString();
    } else if (fieldName === "labMarks") {
      if (labCreditHours === 0) {
        value = "0";
      } else {
        value = Math.min(Math.max(parseInt(value, 10), 0), 30).toString();
      }
    }

    const updatedStudents = students.map((student) =>
      student.studentId === studentId
        ? { ...student, [fieldName]: value }
        : student
    );
    setStudents(updatedStudents);
  };

  const calculateTotalMarks = (midMarks, terminalMarks, labMarks) => {
    const mid = parseFloat(midMarks);
    const terminal = parseFloat(terminalMarks);
    const lab = parseFloat(labMarks);
    return !isNaN(mid) && !isNaN(terminal) && !isNaN(lab)
      ? mid + terminal + lab
      : "";
  };

  const calculateGPA = (totalMarks) => {
    const marks = parseFloat(totalMarks);
    if (marks >= 85) return "4.00";
    else if (marks >= 80) return "3.66";
    else if (marks >= 75) return "3.33";
    else if (marks >= 70) return "3.00";
    else if (marks >= 65) return "2.66";
    else if (marks >= 60) return "2.22";
    else if (marks < 60) return "2.00";
    else return "";
  };


  const handleSave = async (student) => {
    const isAttempt = [
      student.midMarks,
      student.terminalMarks,
      student.labMarks,
    ].every((mark) => parseInt(mark, 10) === 0)
      ? 0
      : 1;

    const resultData = {
      studentId: student.studentId,
      assignId: assignId,
      terminalSessionalMarks: student.terminalMarks,
      midMarks: student.midMarks,
      labMarks: student.labMarks,
      totalMarks: calculateTotalMarks(
        student.midMarks,
        student.terminalMarks,
        student.labMarks
      ),
      isAttempt,
      GPA: calculateGPA(
        calculateTotalMarks(
          student.midMarks,
          student.terminalMarks,
          student.labMarks
        )
      ),
      examDate,
      submissionDate: " ", // Placeholder, modify as needed
      resultCode: " ", // Placeholder, modify as needed
    };
   

    try {
      const postRes = await axios.post(
        "http://localhost:8081/result/Add",
        resultData
      );
      console.log("Sending result data:", resultData);
      // console.log("Response from server:", postRes.data);
      if (postRes.data === "success") {
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
    const isAttempt = [
      student.midMarks,
      student.terminalMarks,
      student.labMarks,
    ].every((mark) => parseInt(mark, 10) === 0)
      ? 0
      : 1;
    const resultData = {
      studentId: student.studentId,
      assignId: student.assignId,
      terminalSessionalMarks: student.terminalMarks,
      midMarks: student.midMarks,
      labMarks: student.labMarks,
      totalMarks: calculateTotalMarks(
        student.midMarks,
        student.terminalMarks,
        student.labMarks
      ),
      isAttempt,
      GPA: calculateGPA(
        calculateTotalMarks(
          student.midMarks,
          student.terminalMarks,
          student.labMarks
        )
      ),
      examDate,
      submissionDate: " ", // Placeholder, modify as needed
      resultCode: " ", // Placeholder, modify as needed
    };

    // console.log("Sending updated result data:", resultData);

    try {
      const putRes = await axios.put(
        `http://localhost:8081/result/Update/${student.resultId}`,
        resultData
      );
      // console.log("Response from server:", putRes.data);
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

  const handleEnableEditing = (studentId) => {
    setIsLocked(false); // Unlock fields for editing
    setEditStudentId(studentId);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const date = getCurrentDate();

  // State variables to hold the input values
  const [values, setValues] = useState({
    teacherID: teacherId,
    courseCode: courseCode,
    courseName: courseName,
    AssignId: assignId,
    description: "i want to update",
    dateCreated: date,
    dateUpdated: date,
    currentHandle: "teacher",
    status: "createdByTeacher",
  });

  console.log("val", values);

  useEffect(() => {
    // Update values after admin is set
    if (teacherId !== null) {
      setValues((prev) => ({
        ...prev,
        teacherID: teacherId,
      }));
      setLockResultValues((prev) => ({
        ...prev,
        teacherID: teacherId,
      }));
    }
  }, [teacherId]);

  useEffect(() => {
    if (assignId) {
      setValues((prevValues) => ({
        ...prevValues,
        AssignId: assignId,
      }));
      setLockResultValues((prevValues) => ({
        ...prevValues,
        AssignId: assignId,
      }));
    }
  }, [assignId]);

  const handleEditRequestClick = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleEditRequest = async (reason) => {
    // console.log("Sending edit request data:", values,reason);
    try {
      const postRes = await axios.post(
        "http://localhost:8081/editRequest/Add",
        { values, reason }
      );
      console.log("Response from server:", postRes.data);
      if (postRes.data === "success") {
        alert("Request for editing sent successfully");
      } else {
        console.log("Error sending edit request");
      }
    } catch (error) {
      console.log("Error sending edit request:", error);
    } finally {
      setShowDialog(false);
    }
  };

  const [lockResultValues, setLockResultValues] = useState({
    teacherID: teacherId,
    AssignId: assignId,
    lockResult: "Yes",
  });

  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function generateResultCode() {
  const prefix = "JUWRC|";
  const formattedDate = new Date().toLocaleDateString("en-GB"); // Format date as dd/mm/yyyy
  const formattedTime = new Date().toLocaleTimeString("en-GB", { hour12: false }); // Format time as HH:mm:ss

  const resultCode = `${prefix}|${courseData?.type+courseData?.degree}|${formattedDate}|${formattedTime}`;
  return resultCode;
}
  const handleLockResult = async () => {
    if (!window.confirm("Are you sure you want to lock the results?")) {
      return;
    }

    const updatedStudents = students.map((student) => ({
      ...student,
      submissionDate: getDate(),
      resultCode: generateResultCode(),
    })); 
  
    try {
       // Update all students' results with submissionDate and resultCode
       await Promise.all(
        updatedStudents.map((student) => {
          const isAttempt = [
            student.midMarks,
            student.terminalMarks,
            student.labMarks,
          ].every((mark) => parseInt(mark, 10) === 0)
            ? 0
            : 1;

          return axios.put(`http://localhost:8081/result/Update/${student.resultId}`, {
            studentId: student.studentId,
            assignId: student.assignId,
            terminalSessionalMarks: student.terminalMarks,
            midMarks: student.midMarks,
            labMarks: student.labMarks,
            totalMarks: calculateTotalMarks(
              student.midMarks,
              student.terminalMarks,
              student.labMarks
            ),
            isAttempt,
            GPA: calculateGPA(
              calculateTotalMarks(
                student.midMarks,
                student.terminalMarks,
                student.labMarks
              )
            ),
            examDate,
            submissionDate:getDate(),
            resultCode: generateResultCode(),
          })
    })
      ); 
  

    console.log("Sending lock result request data:", lockResultValues);
   
      const postRes = await axios.post(
        "http://localhost:8081/lockResult/Add",
        lockResultValues
      );
      console.log("Response from server:", postRes.data);
      if (postRes.data === "success") {
        alert("Result is locked");
        window.location.reload(); // Refresh the page
      } else {
        console.log("Error sending edit request");
      }
    } catch (error) {
      console.log("Error sending edit request:", error);
    }
  };

  const [lockResultAssignId, setLockResultAssignId] = useState(null);



  useEffect(() => {
    const fetchLockedResults = async () => {
      try {
        const res = await axios.get("http://localhost:8081/lockResult/View");
        const lockedResults = res.data; // List of all locked results

        console.log("Fetched locked results:", lockedResults);
        console.log("assignId:", assignId, "teacherId:", teacherId);

        // Check if lockedResults is an array
        if (Array.isArray(lockedResults)) {
          // Find if there's a result that matches both assignId and teacherId
          const matchedResult = lockedResults.find(
            (result) =>
              result.assignId === assignId && result.teacherId === teacherId
          );

          // Update the state based on the matched result
          if (matchedResult) {
            console.log(
              "Matched Result:",
              matchedResult.assignId,
              matchedResult.teacherId
            );
            setLockResultAssignId(assignId); // Set assignId if it and teacherId match a locked result
          } else {
            setLockResultAssignId(null); // Clear the state if no match found
          }
        } else {
          console.warn("Expected an array but found:", lockedResults);
          setLockResultAssignId(null);
        }
      } catch (error) {
        console.error("Error fetching locked results:", error);
      }
    };

    if (assignId && teacherId) {
      fetchLockedResults();
    }
  }, [assignId, teacherId]);

  console.log("first,,,,,", lockResultAssignId);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>S#</th>
            <th>Seat No.</th>
            <th>Enrollment No.</th>
            <th className="name">Student's Name</th>
            <th className="name">Father's Name</th>
            <th className="marks">Mid (20)</th>
            <th className="marks">Lab (30)</th>
            <th className="marks">Assign + Term (50/80)</th>
            <th className="marks">Grand Total</th>
            <th className="marks">GP</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.seatNo}</td>
              <td>{student.enrollment}</td>
              <td>{student.name}</td>
              <td>{student.fatherName}</td>
              <td>
                <input
                  type="number"
                  style={{ width: "70px" }}
                  min="0"
                  max="20"
                  value={student.midMarks || ""}
                  onChange={(e) =>
                    handleMarksChange(e, student.studentId, "midMarks")
                  }
                  disabled={!!lockResultAssignId}
                />
              </td>
              <td>
                <input
                  type="number"
                  style={{ width: "70px" }}
                  min="0"
                  max="30"
                  value={student.labMarks || ""}
                  onChange={(e) =>
                    handleMarksChange(e, student.studentId, "labMarks")
                  }
                  disabled={!!lockResultAssignId}
                />
              </td>
              <td>
                <input
                  type="number"
                  style={{ width: "70px" }}
                  min="0"
                  max={labCreditHours === 1 ? "50" : "80"}
                  value={student.terminalMarks || ""}
                  onChange={(e) =>
                    handleMarksChange(e, student.studentId, "terminalMarks")
                  }
                  disabled={!!lockResultAssignId}
                />
              </td>
              <td>
                <input
                  type="number"
                  style={{ width: "70px" }}
                  min="0"
                  max="100"
                  value={
                    calculateTotalMarks(
                      student.midMarks,
                      student.terminalMarks,
                      student.labMarks
                    ) || ""
                  }
                  readOnly
                  disabled={!!lockResultAssignId}
                />
              </td>
              <td>
                <input
                  type="text"
                  style={{ width: "70px" }}
                  value={
                    calculateGPA(
                      calculateTotalMarks(
                        student.midMarks,
                        student.terminalMarks,
                        student.labMarks
                      )
                    ) || ""
                  }
                  readOnly
                  disabled={!!lockResultAssignId}
                />
              </td>
              <td>
                {student.resultId ? (
                  <>
                    {editStudentId === student.studentId ? (
                      <button
                        id="buttons123"
                        onClick={() => handleUpdate(student)}
                        disabled={isLocked}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        id="buttons123"
                        onClick={() => handleEnableEditing(student.studentId)}
                        disabled={!!lockResultAssignId}
                        style={{
                          backgroundColor: !!lockResultAssignId
                            ? "grey"
                            : "lightBlue", // Change 'blue' to your desired enabled color
                          cursor: !!lockResultAssignId
                            ? "not-allowed"
                            : "pointer",
                          color: "black", // Button text color
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    id="buttons123"
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
      <Dialogue
        show={showDialog}
        handleClose={handleCloseDialog}
        handleSend={(reason) => {
          handleEditRequest(reason);
          setShowDialog(false);
        }}
      />
      <div className="buttonContainer">
        <button
          onClick={handleLockResult}
          disabled={!!lockResultAssignId}
          style={{
            backgroundColor: !!lockResultAssignId ? "grey" : "#4c90af", // Change 'blue' to your desired enabled color
            cursor: !!lockResultAssignId ? "not-allowed" : "pointer",
            color: "white", // Button text color
          }}
        >
          Lock Results
        </button>
        <button
          disabled={!lockResultAssignId}
          style={{
            backgroundColor: !lockResultAssignId ? "grey" : "#4c90af", // Change 'blue' to your desired enabled color
            cursor: !lockResultAssignId ? "not-allowed" : "pointer",
            color: "white", // Button text color
          }}
          onClick={handleEditRequestClick}
        >
          Request for Editing
        </button>
      </div>
    </div>
  );
};

export default StudentTable;