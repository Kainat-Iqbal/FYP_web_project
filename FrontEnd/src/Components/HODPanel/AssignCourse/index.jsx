import { useState, useEffect } from "react";
import axios from "axios";
import "./assignCourse.css";
import SideBar from "../SideBar";
import Select from "react-select";
function AssignCourse() {
  const [teacher, setTeacher] = useState([]);
  const [course, setCourse] = useState([]);
  const [session, setSession] = useState([]);
  const [errors, setErrors] = useState({});
  const [hodId, setHodId] = useState(null);
  const [filters, setFilters] = useState({
    CSS: false,
    CSC: false,
    DS: false,
    Elective: false,
    Compulsory: false,
  });

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
  console.log("HOD", hodId)

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

  // Inside the AssignCourse component:
  const instructorOptions = teacher.map((teacherData) => ({
    value: teacherData.teacherId, // Use teacherId as value
    label: teacherData.name, // Display name as label
  }));

  const handleInstructorChange = (selectedOption) => {
    setSelectedTeacher(selectedOption.label); // Set selected name
    setSelectedDepartment(
      teacher.find((t) => t.teacherId === selectedOption.value)?.department || ""
    );
    setTeacherId(selectedOption.value); // Set teacherId
  };
  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [courseId, setCourseId] = useState("");

  const courseOptions = course.map((courseData) => ({
    value: courseData.courseId, // Use courseId as value
    label: courseData.course_code, // Display course_code as label
  }));

  const handleCourseChange = (selectedOption) => {
    setSelectedCourseCode(selectedOption.label); // Set selected course code
    const courseObj = course.find((c) => c.courseId === selectedOption.value);
    setSelectedTitle(courseObj?.course_title || ""); // Set course title
    setCourseId(selectedOption.value); // Set courseId
  };

  const [selectedSessionId, setSelectedSessionId] = useState("");
  // Inside the AssignCourse component:
  const sessionOptions = session.map((sessionData) => ({
    value: sessionData.sessionId, // Use sessionId as the value
    label: `${sessionData.academic_year} (${sessionData.semester}) Class: ${sessionData.type} (${sessionData.degree}) Batch: ${sessionData.year} (${sessionData.session})`, // Concatenate relevant data for the label
  }));

  const handleSessionChange = (selectedOption) => {
    setSelectedSessionId(selectedOption.value); // Update sessionId
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const date = getCurrentDate();

  const data = { teacherId, courseId, selectedSessionId, date, hodId };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!selectedTeacher) newErrors.teacher = "Please select instructor name";
    if (!selectedCourseCode) newErrors.course = "Please select course code";
    if (!selectedSessionId) newErrors.session = "Please select session";

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
  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const filteredCourseOptions = course
    .filter((courseData) => {
      if (
        filters.CSS ||
        filters.CSC ||
        filters.DS ||
        filters.Elective ||
        filters.Compulsory
      ) {
        if (filters.CSS && courseData.course_code.startsWith("CSS")) return true;
        if (filters.CSC && courseData.course_code.startsWith("CSC")) return true;
        if (filters.DS && courseData.course_code.startsWith("DS")) return true;
        if (
          filters.Elective &&
          courseData.course_type === "Elective"
        )
          return true;
        if (
          filters.Compulsory &&
          (courseData.course_type === "Compulsory" || courseData.course_type === "Compulsary")
        )
          return true;
        return false;
      }
      return true; // Return all options if no filter is selected
    })
    .map((courseData) => ({
      value: courseData.courseId,
      label: courseData.course_code,
    }));

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
              <div style={{ width: "49%" }}>
                <Select
                  id="selectinput"
                  options={instructorOptions} // Options from teacher data
                  value={instructorOptions.find((option) => option.label === selectedTeacher)}
                  onChange={handleInstructorChange}
                  placeholder="Select Instructor Name"
                />
                {errors.teacher && <span className="error">{errors.teacher}</span>}
              </div>
            </div>

            <div id="assignCourseField">
              <label>Department</label>
              <div style={{ width: "49%" }}>
                <input
                  id="assignCourseinp"
                  name="department"
                  style={{ height: "7vh" }}
                  value={selectedDepartment || "Select Instructor Name First"}
                  readOnly
                />
                {errors.department && <span className="error">{errors.department}</span>}
              </div>
            </div>

            <div id="assignCourseField">
              <label>Course Code</label>
              <div style={{ width: "49%" }}>
                <Select
                  id="selectinput"
                  options={filteredCourseOptions} // Options from course data
                  value={courseOptions.find((option) => option.label === selectedCourseCode)}
                  onChange={handleCourseChange}
                  placeholder="Select Course Code"
                />
                {errors.course && <span className="error">{errors.course}</span>}
              </div>
            </div>
            <div id="assignCourseField">
            <div style={{ fontSize:"0.9rem",display: 'flex',columnGap:'10px', fontWeight: 'bold',marginLeft:'210px',flexWrap:"wrap" }}>
                {["CSS", "CSC", "DS", "Elective", "Compulsory"].map((filter) => (
                  <label key={filter}>
                    <input
                      type="checkbox"
                      checked={filters[filter]}
                      onChange={() => handleFilterChange(filter)}
                    />
                    {filter}
                  </label>
                ))}
              </div>
            </div>
            <div id="assignCourseField">
              <label>Course Name</label>
              <div style={{ width: "49%" }}>
                <input
                  id="assignCourseinp"
                  name="courseName"
                  style={{ height: "7vh" }}
                  value={selectedTitle || "Select Course Code First"}
                  readOnly
                />
                {errors.courseName && <span className="error">{errors.courseName}</span>}
              </div>
            </div>

            <div id="assignCourseField">
              <label>Academic Year</label>
              <div style={{ width: "49%" }}>
                <Select
                  id="selectinput"
                  options={sessionOptions} // Options from session data
                  value={sessionOptions.find((option) => option.value === selectedSessionId)}
                  onChange={handleSessionChange}
                  placeholder="Select Academic Year"
                />
                {errors.session && <span className="error">{errors.session}</span>}
              </div>
            </div>

            <button>Assign Course</button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default AssignCourse;