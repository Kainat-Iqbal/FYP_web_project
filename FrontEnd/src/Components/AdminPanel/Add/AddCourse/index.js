import * as React from "react";
import "./addCourse.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import TeacherValidation from "../../Add/AddTeacher/teacherValidation";

function AddCourse() {
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
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "User123*",
    faculty: "Science",
    CNIC: "",
    qualification: "Bachelors",
    status: "Active",
    adminId: "",
    joiningDate: "",
  });
  useEffect(() => {
    // Update values after admin is set
    if (admin !== null) {
      setValues((prev) => ({
        ...prev,
        adminId: admin,
      }));
    }
  }, [admin]);
  const [errors, setErrors] = useState({});

  // Function to handle changes in input field
  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
console.log(values)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(TeacherValidation(values));
    console.log("first",errors)
    if (
      errors.email === "" &&
      errors.password === "" &&
      errors.name === "" &&
      errors.date === "" &&
      errors.cnic === ""
    ) {
      console.log("nhmbkjbhkbhjuu",values)
      axios.post("http://localhost:8081/course/Add", values).then((res) => {
        console.log("val",values);
        if (res.data === "success") {
          alert("Course is added successfully");
        } else {
          console.log("error");
        }
      });
    }
  };

  return (
    <div id="mainAddCourseDiv">
      <SideBar />
      <div id="courseWithoutBar">
        <div id="courseTop">
          <h1>Add Course</h1>
        </div>

        <div id="courseBottom">
          <form id="courseForm" action="" onSubmit={handleSubmit}>
            <div id="courseField">
              <label>Course Code</label>
              <input
                name="name"
                type="text"
                placeholder="Sara Ahmed"
                onChange={handleInput}
              ></input>
            </div>
            {errors.name && <span className="text-danger">{errors.name}</span>}

            <div id="courseField">
              <label>Course Title</label>
              <input
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                onChange={handleInput}
              ></input>
            </div>
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}

            <div id="courseField">
              <label>Course Type</label>
              <select
                name="faculty"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Science">
                  Science
                </option>
                <option value="Social Science">Social Science</option>
              </select>
            </div>
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}

            <div id="courseField">
              <label>Theory Credit Hr</label>

              <select
                name="faculty"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Science">
                  Science
                </option>
                <option value="Social Science">Social Science</option>
              </select>
            </div>

            <div id="courseField">
              <label>Lab Credit Hr</label>

              <select
                name="faculty"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Science">
                  Science
                </option>
                <option value="Social Science">Social Science</option>
              </select>
            </div>

            <div id="courseField">
              <label>Max Mid Marks</label>
              <input
                name="CNIC"
                type="text"
                placeholder="42204-3452276-3"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Min Mid Marks</label>
              <input
                name="CNIC"
                type="text"
                placeholder="42204-3452276-3"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Max Terminal Marks</label>
              <input
                name="CNIC"
                type="text"
                placeholder="42204-3452276-3"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Min Terminal Marks</label>
              <input
                name="CNIC"
                type="text"
                placeholder="42204-3452276-3"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Max Sessional Marks</label>
              <input
                name="CNIC"
                type="text"
                placeholder="42204-3452276-3"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Min Sessional Marks</label>
              <input
                name="CNIC"
                type="text"
                placeholder="42204-3452276-3"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Max Lab Marks</label>
              <input
                name="CNIC"
                type="text"
                placeholder="42204-3452276-3"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Min Lab Marks</label>
              <input
                name="CNIC"
                type="text"
                placeholder="42204-3452276-3"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Total Marks</label>
              <input
                name="CNIC"
                type="text"
                placeholder="42204-3452276-3"
                onChange={handleInput}
              ></input>
            </div>

            <button>Add Course</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddCourse;
