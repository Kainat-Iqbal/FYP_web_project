import * as React from "react";
import "./assignCourseToBatch.css";
import SideBar from "../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";

function AssignCourseToBatch() {
  const [admin, setAdminId] = useState(null);
  const [course, setCourse] = useState([]);
  const [session, setSession] = useState([]);
  const [filters, setFilters] = useState([]); // For filtering course codes
  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [errors, setErrors] = useState({});

  // Fetch admin ID
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

  // Fetch courses and sessions
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get("http://localhost:8081/assignCourse/Get");
        setCourse(res.data.s_courses);
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

  // Handle checkbox filter changes
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilters((prevFilters) =>
      prevFilters.includes(value)
        ? prevFilters.filter((filter) => filter !== value)
        : [...prevFilters, value]
    );
  };

  // Apply filters to courses
  const filteredCourses = filters.length
    ? course.filter((c) =>
        filters.some((filter) => c.course_code.startsWith(filter))
      )
    : course;

  // Handle course code change
  const handleCodeChange = (event) => {
    const codeName = event.target.value;
    setSelectedCourseCode(codeName);

    const courseObj = course.find((c) => c.course_code === codeName);
    if (courseObj) {
      setSelectedTitle(courseObj.course_title);
      setCourseId(courseObj.courseId);
    }
  };

  // Handle session change
  const handleSessionChange = (selectedOption) => {
    setSelectedSessionId(selectedOption ? selectedOption.value : "");
  };

  // Transform session data for react-select
  const sessionOptions = session.map((sessionData) => ({
    value: sessionData.sessionId,
    label: `${sessionData.academic_year}(${sessionData.semester}) Class:${sessionData.type}(${sessionData.degree}) Batch:${sessionData.year}(${sessionData.session})`,
  }));

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!selectedCourseCode) newErrors.course = "Please select course code";
    if (!selectedSessionId) newErrors.session = "Please select session";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const data = { courseId, selectedSessionId };
        const res = await axios.post(
          "http://localhost:8081/assignCourse/AddCourseToSession",
          data
        );
        if (res.data === "success") {
          alert("Course is assigned successfully");
          window.location.reload();
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
            <h1>
              A<span className="smaller-text">ssign</span> C
              <span className="smaller-text">ourse</span> T
              <span className="smaller-text">o</span> B
              <span className="smaller-text">atch</span>
            </h1>
          </div>
          <form id="batchForm" action="" onSubmit={handleSubmit}>
            {/* Course Code Dropdown */}
            <div id="batchField">
              <label>Course Code</label>
              <div style={{ width: "56%" }}>
                <select
                  id="batchinp"
                  name="courseCode"
                  style={{ height: "7vh" }}
                  value={selectedCourseCode}
                  onChange={handleCodeChange}
                >
                  <option value="" disabled>
                    Select Course Code
                  </option>
                  {filteredCourses.map((courseData) => (
                    <option
                      key={courseData.course_code}
                      value={courseData.course_code}
                    >
                      {courseData.course_code}
                    </option>
                  ))}
                </select>
                {errors.course && <span className="error">{errors.course}</span>}
              </div>
            </div>

            {/* Filter checkboxes */}
            <div
              id="filterField"
              style={{ display: "flex", gap: "10px", alignItems: "center", marginLeft: "110px", marginTop: "-10px" }}
            >
              <label style={{ fontWeight: "normal" }}>
                <input type="checkbox" value="CSS" onChange={handleFilterChange} />
                CSS
              </label>
              <label style={{ fontWeight: "normal" }}>
                <input type="checkbox" value="CSE" onChange={handleFilterChange} />
                CSE
              </label>
              <label style={{ fontWeight: "normal" }}>
                <input type="checkbox" value="DS" onChange={handleFilterChange} />
                DS
              </label>
            </div>

            {/* Course Name */}
            <div id="batchField">
              <label>Course Name</label>
              <div style={{ width: "56%" }}>
                <input
                  id="batchinp"
                  name="courseName"
                  style={{ height: "7vh" }}
                  value={selectedTitle || "Select Course Code First"}
                  readOnly
                />
                {errors.courseName && (
                  <span className="error">{errors.courseName}</span>
                )}
              </div>
            </div>

            {/* Academic Year */}
            <div id="batchField">
              <label>Academic Year</label>
              <div style={{ width: "56%" }}>
                <Select
                  options={sessionOptions}
                  onChange={handleSessionChange}
                  value={
                    selectedSessionId
                      ? sessionOptions.find(
                          (option) => option.value === selectedSessionId
                        )
                      : null
                  }
                  isClearable
                  placeholder="Select Session"
                />
                {errors.session && (
                  <span className="error">{errors.session}</span>
                )}
              </div>
            </div>

            <button>Assign Course</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AssignCourseToBatch;
