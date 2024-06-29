import { useState, useEffect } from "react";
import "./assignCourse.css";
import SideBar from "../SideBar";
import axios from "axios";

function AssignCourse() {
  const [teacher, setTeacher] = useState([]);
  const [course, setCourse] = useState([]);
  const [batch, setBatch] = useState([]);
  const [session, setSession] = useState([]);
  const [degree, setDegree] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("http://localhost:8081/assignCourse/Get");
        setTeacher(res.data.teachers);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get("http://localhost:8081/assignCourse/Get");
        setCourse(res.data.courses);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchCourse();
  }, []);

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const res = await axios.get("http://localhost:8081/assignCourse/Get");
        setBatch(res.data.batch);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchBatch();
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get("http://localhost:8081/assignCourse/Get");
        setSession(res.data.session);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchDegree = async () => {
      try {
        const res = await axios.get("http://localhost:8081/assignCourse/Get");
        setDegree(res.data.degree_program);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDegree();
  }, []);

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [teacherId,setTeacherId] = useState("");

  const handleTeacherChange = (event) => {
    const teacherName = event.target.value;
    setSelectedTeacher(teacherName);

    // Find the department of the selected teacher
    const teacherObj = teacher.find((t) => t.name === teacherName);
    if (teacherObj) {
      setSelectedDepartment(teacherObj.department);
      setTeacherId(teacherObj.teacherId)
    }
  };

  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [courseId, setCourseId] = useState("");

  const handleCodeChange = (event) => {
    const codeName = event.target.value;
    setSelectedCourseCode(codeName);

    // Find the title of the selected course code
    const courseObj = course.find((c) => c.course_code === codeName);
    if (courseObj) {
      setSelectedTitle(courseObj.course_title);
      setCourseId(courseObj.courseId)
    }
  };

  const [selectedSessionId, setSelectedSessionId] = useState("");
  const handleSessionChange = (event) => {
    const selectedId = event.target.value;
    setSelectedSessionId(selectedId);
  };

  const [batchId, setBatchId] = useState("");
  const handleBatchChange = (event) => {
    const selectedId = event.target.value;
    setBatchId(selectedId);
  };

  const [classId, setClassId] = useState("");
  const handleClassChange = (event) => {
    const selectedId = event.target.value;
    setClassId(selectedId);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = currentDate.getFullYear();
  
    return `${day}-${month}-${year}`;
  };
  
  const date = getCurrentDate(); 

  const data = {teacherId,courseId,selectedSessionId,batchId,classId,date}
 
const handleSubmit = async (event) => {
  event.preventDefault();
     axios.post("http://localhost:8081/assignCourse/Add", data).then((res) => {
      console.log("val",data);
      if (res.data === "success") {
        alert("Course is assigned successfully");
      } else {
        console.log("error");
      }
    });
  
};

  return (
    <div id="mainAssignCourseDiv">
      <SideBar />
      <div id="assignCourseWithoutBar">
        <div id="assignCourseTop">
          <h1 style={{ color: "#00304B" }}>Assign Course</h1>
        </div>

        <div id="assignCourseBottom">
          <form id="assignCourseForm" action="" onSubmit={handleSubmit}>
            <div id="assignCourseField">
              <label>Instructor Name</label>
              <select
                name="department"
                style={{ width: "14.8vw", height: "6vh" }}
                value={selectedTeacher}
                onChange={handleTeacherChange}
              >
                <option value="" disabled>
                  Select Instructor Name
                </option>
                {teacher.map((teacherData) => {
                  return <option>{teacherData.name}</option>;
                })}
              </select>
            </div>

            <div id="assignCourseField">
              <label>Department</label>
              <input
                name="department"
                style={{ width: "14.8vw", height: "6vh" }}
                value={selectedDepartment|| "Select Instructor Name First"}
                readOnly
              ></input>
            </div>

            <div id="assignCourseField">
              <label>Course Code</label>
              <select
                name="courseCode"
                style={{ width: "14.8vw", height: "6vh" }}
                value={selectedCourseCode}
                onChange={handleCodeChange}
              >
                <option value="" disabled>
                  Select Course Code
                </option>
                {course.map((courseData) => (
                  <option
                    key={courseData.course_code}
                    value={courseData.course_code}
                  >
                    {courseData.course_code}
                  </option>
                ))}
              </select>
            </div>

            <div id="assignCourseField">
              <label>Course Name</label>
              <input
                name="courseName"
                style={{ width: "14.8vw", height: "6vh" }}
                value={selectedTitle|| "Select Course Code First"}
                readOnly
              >
              </input>
            </div>

            <div id="assignCourseField">
              <label>Class</label>
              <select
                name="department"
                style={{ width: "14.8vw", height: "6vh" }}
                value={classId}
                onChange={handleClassChange}
              >
                <option value="" disabled>Select Class</option>
                {degree.map((degreeData) => {
                  return (
                    <option key={degreeData.programId} value={degreeData.programId}>
                      {degreeData.type + "(" + degreeData.degree + ")"}
                    </option>
                  );
                })}
              </select>
            </div>

            <div id="assignCourseField">
              <label>Batch</label>
              <select
                name="designation"
                style={{ width: "14.8vw", height: "6vh" }}
                value={batchId}
                onChange={handleBatchChange}
              >
                 <option value="" disabled>Select Batch</option>
                {batch.map((batchData) => {
                  return (
                    <option key={batchData.batchId} value={batchData.batchId}>{batchData.year + "  " + batchData.session}</option>
                  );
                })}
              </select>
            </div>

            <div id="assignCourseField">
              <label>Academic year</label>
              <select
                name="session"
                style={{ width: "14.8vw", height: "6vh" }}
                value={selectedSessionId}
                onChange={handleSessionChange}
              >
                <option value="" disabled>Select Session</option>
                {session.map((sessionData) => {
                  return (
                    <option key={sessionData.sessionId} value={sessionData.sessionId}>
                      {sessionData.academic_year + " " + sessionData.semester}
                    </option>
                  );
                })}
              </select>
            </div>
            <div id="assignButton">
            <button>Assign Course</button>
          </div>
          </form>

          
        </div>
      </div>
    </div>
  );
}

export default AssignCourse;
