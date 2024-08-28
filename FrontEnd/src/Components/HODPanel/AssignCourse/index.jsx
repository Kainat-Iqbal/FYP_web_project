import { useState, useEffect } from "react";
import axios from "axios";
import "./assignCourse.css";
import SideBar from "../SideBar";

function AssignCourse() {
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
    <div id="assignCourseMainDiv">
      <SideBar />
      <div id="assignCourseWithoutBar">
        <div id="assignCourseBottom">
        <div id="assignCourseTop">
        <h1>A<span className="smaller-text">SSIGN</span> C<span className="smaller-text">OURSE</span></h1>
        </div>
          <form id="assignCourseForm" action="" onSubmit={handleSubmit}>

            <div id="assignCourseField">
              
                <label>Instructor Name</label>
                <select
                 id="assignCourseinp"
                  name="department"
                  style={{ height: "6vh" }}
                  value={selectedTeacher}
                  onChange={handleTeacherChange}
                >
                  <option value="" disabled>
                    Select Instructor Name
                  </option>
                  {teacher.map((teacherData) => (
                    <option key={teacherData.name}>{teacherData.name}</option>
                  ))}
                </select>
             
              {errors.teacher && <span className="error">{errors.teacher}</span>}
            </div>

            <div id="assignCourseField">
             
                <label>Department</label>
                <input
                 id="assignCourseinp"
                  name="department"
                  style={{ height: "6vh" }}
                  value={selectedDepartment || "Select Instructor Name First"}
                  readOnly
                />
             
              {errors.department && <span className="error">{errors.department}</span>}
            </div>

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

           
              <button>Assign Course</button>
            

          </form>
        </div>
      </div>
    </div>
  );






        //without validation styling
  //   return (
  //     <div id="assignCourseMainDiv">
  //       <SideBar />
  //       <div id="assignCourseWithoutBar">
  //         <div id="assignCourseTop">
  //           <h1 style={{ color: "#00304B" }}>Assign Course</h1>
  //         </div>

  //         <div id="assignCourseBottom">
  //           <form id="assignCourseForm" action="" onSubmit={handleSubmit}>
  //             <div id="assignCourseField">
  //               <label>Instructor Name</label>
  //               <select
  //                 name="department"
  //                 style={{ width: "14.8vw", height: "6vh" }}
  //                 value={selectedTeacher}
  //                 onChange={handleTeacherChange}
  //               >
  //                 <option value="" disabled>
  //                   Select Instructor Name
  //                 </option>
  //                 {teacher.map((teacherData) => {
  //                   return <option key={teacherData.name}>{teacherData.name}</option>;
  //                 })}
  //               </select>
  //               {/* here we display error message that field should not be empty */}
  //               {errors.teacher && <span className="error">{errors.teacher}</span>}
  //             </div>

  //             <div id="assignCourseField">
  //               <label>Department</label>
  //               <input
  //                 name="department"
  //                 style={{ width: "14.8vw", height: "6vh" }}
  //                 value={selectedDepartment || "Select Instructor Name First"}
  //                 readOnly
  //               ></input>
  //             </div>

  //             <div id="assignCourseField">
  //               <label>Course Code</label>
  //               <select
  //                 name="courseCode"
  //                 style={{ width: "14.8vw", height: "6vh" }}
  //                 value={selectedCourseCode}
  //                 onChange={handleCodeChange}
  //               >
  //                 <option value="" disabled>
  //                   Select Course Code
  //                 </option>
  //                 {course.map((courseData) => (
  //                   <option key={courseData.course_code} value={courseData.course_code}>
  //                     {courseData.course_code}
  //                   </option>
  //                 ))}
  //               </select>
  //               {errors.course && <span className="error">{errors.course}</span>}
  //             </div>

  //             <div id="assignCourseField">
  //               <label>Course Name</label>
  //               <input
  //                 name="courseName"
  //                 style={{ width: "14.8vw", height: "6vh" }}
  //                 value={selectedTitle || "Select Course Code First"}
  //                 readOnly
  //               ></input>
  //             </div>

  //             <div id="assignCourseField">
  //               <label>Class</label>
  //               <select
  //                 name="department"
  //                 style={{ width: "14.8vw", height: "6vh" }}
  //                 value={classId}
  //                 onChange={handleClassChange}
  //               >
  //                 <option value="" disabled>
  //                   Select Class
  //                 </option>
  //                 {degree.map((degreeData) => {
  //                   return (
  //                     <option key={degreeData.programId} value={degreeData.programId}>
  //                       {degreeData.type + "(" + degreeData.degree + ")"}
  //                     </option>
  //                   );
  //                 })}
  //               </select>
  //               {errors.class && <span className="error">{errors.class}</span>}
  //             </div>

  //             <div id="assignCourseField">
  //               <label>Batch</label>
  //               <select
  //                 name="designation"
  //                 style={{ width: "14.8vw", height: "6vh" }}
  //                 value={batchId}
  //                 onChange={handleBatchChange}
  //               >
  //                 <option value="" disabled>
  //                   Select Batch
  //                 </option>
  //                 {batch.map((batchData) => {
  //                   return (
  //                     <option key={batchData.batchId} value={batchData.batchId}>
  //                       {batchData.year + "  " + batchData.session}
  //                     </option>
  //                   );
  //                 })}
  //               </select>
  //               {errors.batch && <span className="error">{errors.batch}</span>}
  //             </div>

  //             <div id="assignCourseField">
  //               <label>Academic year</label>
  //               <select
  //                 name="session"
  //                 style={{ width: "14.8vw", height: "6vh" }}
  //                 value={selectedSessionId}
  //                 onChange={handleSessionChange}
  //               >
  //                 <option value="" disabled>
  //                   Select Session
  //                 </option>
  //                 {session.map((sessionData) => {
  //                   return (
  //                     <option key={sessionData.sessionId} value={sessionData.sessionId}>
  //                       {sessionData.academic_year + " " + sessionData.semester}
  //                     </option>
  //                   );
  //                 })}
  //               </select>
  //               {errors.session && <span className="error">{errors.session}</span>}
  //             </div>
  //             <div id="assignButton">
  //               <button>Assign Course</button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   );
}

export default AssignCourse;
