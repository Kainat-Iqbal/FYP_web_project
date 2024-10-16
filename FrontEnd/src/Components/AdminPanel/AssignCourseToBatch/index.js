import * as React from "react";
import "./assignCourseToBatch.css";
import SideBar from "../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";

function AssignCourseToBatch() {
  const [admin, setAdminId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/session", {
          withCredentials: true,
        });
        setAdminId(response.data.userId);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  console.log("FVFV ", admin);
  // State variables to hold the input values

  const [teacher, setTeacher] = useState([]);
  const [course, setCourse] = useState([]);
  const [session, setSession] = useState([]);
  const [errors, setErrors] = useState({});
  const [hodId, setHodId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/session", {
          withCredentials: true,
        });
        setHodId(response.data.userId);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  console.log("HOD",hodId)

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

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const handleTeacherChange = (event) => {
    const teacherName = event.target.value;
    setSelectedTeacher(teacherName);

    // Find the department of the selected teacher
    const teacherObj = teacher.find((t) => t.name === teacherName);
    if (teacherObj) {
      setSelectedDepartment(teacherObj.department);
      setTeacherId(teacherObj.teacherId);
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
      setCourseId(courseObj.courseId);
    }
  };

  const [selectedSessionId, setSelectedSessionId] = useState("");
  const handleSessionChange = (event) => {
    const selectedId = event.target.value;
    setSelectedSessionId(selectedId);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const date = getCurrentDate();

  const data = { teacherId, courseId, selectedSessionId, date ,hodId};

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!selectedTeacher) newErrors.teacher = "Instructor Name is required";
    if (!selectedCourseCode) newErrors.course = "Course Code is required";
    if (!selectedSessionId) newErrors.session = "Session is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:8081/assignCourse/Add", data);
        console.log("val", data);
        if (res.data === "success") {
          alert("Course is assigned successfully");
          window.location.reload(); // Refresh the page
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div id="mainAddBatchDiv">
      <SideBar />
      <div id="batchWithoutBar">
       

        <div id="batchBottom">
        <div id="batchTop">
          <h1>A<span className="smaller-text">ssign</span> C<span className="smaller-text">ourse</span>
          T<span className="smaller-text">o</span> B<span className="smaller-text">atch</span></h1>
        </div>
          <form id="batchForm" action="" onSubmit={handleSubmit}>
          <div id="assignCourseField">
              
              <label>Course Code</label>
              <select
              id="assignCourseinp"
                name="courseCode"
                style={{ height: "6vh" }}
                value={selectedCourseCode}
                onChange={handleCodeChange}
              >
                <option value="" disabled>
                  Select Course Code
                </option>
                {course.map((courseData) => (
                  <option key={courseData.course_code} value={courseData.course_code}>
                    {courseData.course_code}
                  </option>
                ))}
              </select>
            
            {errors.course && <span className="error">{errors.course}</span>}
          </div>

          <div id="assignCourseField">
            
              <label>Course Name</label>
              <input
               id="assignCourseinp"
                name="courseName"
                style={{ height: "6vh" }}
                value={selectedTitle || "Select Course Code First"}
                readOnly
              />
            
            {errors.courseName && <span className="error">{errors.courseName}</span>}
          </div>

          <div id="assignCourseField">
            
              <label>Academic Year</label>
              <select
               id="assignCourseinp"
                name="session"
                style={{ height: "6vh" }}
                value={selectedSessionId}
                onChange={handleSessionChange}
              >
                <option value="" disabled>
                  Select Session
                </option>
                {session.map((sessionData) => (
                  <option key={sessionData.sessionId} value={sessionData.sessionId}>
                    {sessionData.academic_year + "(" + sessionData.semester+ ") Class:"+sessionData.type+"("+sessionData.degree+") Batch:"+sessionData.year+"("+sessionData.session+")" }
                  </option>
                ))}
              </select>
           
            {errors.session && <span className="error">{errors.session}</span>}
          </div>

            <button>Aaaign</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AssignCourseToBatch;
