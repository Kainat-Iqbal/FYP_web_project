import * as React from "react";
import "./addTeacher.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import TeacherValidation from "./teacherValidation";

function AddTeacher() {
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
    department: "Software Engineering",
    designation: "Lecturer",
    cnic: "",
    qualification: "Bachelors",
    status: "Active",
    adminEmail: "",
    joiningDate: "",
    photo:"",
    adminId: "",
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(TeacherValidation(values));
    if (
      errors.email === "" &&
      errors.password === "" &&
      errors.name === "" &&
      errors.date === "" &&
      errors.cnic === ""
    ) {
      console.log("nhmbkjbhkbhjuu")
      axios.post("http://localhost:8081/teacher/Add", values).then((res) => {
        console.log("val",values);
        if (res.data === "success") {
          alert("teacher is added successfully");
          window.location.reload(); // Refresh the page
        } 
        else if(res.data === "emailAlreadyExist"){
          alert("This Email already associate with another account")
        }else {
          console.log("error");
        }
      });
    }
  };

  return (
    <div id="mainAddTeacherDiv">
      <SideBar />
      <div id="teacherWithoutBar">
      

        <div id="teacherBottom">
        <div id="teacherTop">
        <h1>A<span className="smaller-text">DD</span> T<span className="smaller-text">EACHER</span></h1>
        </div>
          <form id="teacherForm" action="" onSubmit={handleSubmit}>
            <div id="teacherField">
              <label>Name</label>
              <input
              id="teacherinp"
                name="name"
                type="text"
                placeholder="Sara Ahmed"
                onChange={handleInput}
              ></input>
            </div>
            {errors.name && <span className="text-danger">{errors.name}</span>}

            <div id="teacherField">
              <label>Email</label>
              <input
               id="teacherinp"
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              ></input>
            </div>
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}

            <div id="teacherField">
              <label>Password</label>
              <input
               id="teacherinp"
                name="password"
                type="text"
                onChange={handleInput}
                value={"User123*"}
              ></input>
            </div>
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}

            <div id="teacherField">
              <label>Department</label>

              <select
               id="teacherinp"
                name="department"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              >
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="Computer Science">Computer Science</option>
              </select>
            </div>
            {errors.department && (
              <span className="text-danger">{errors.department}</span>
            )}

            <div id="teacherField">
              <label>Designation</label>
              <select
               id="teacherinp"
                name="designation"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              >
                <option value="Lecturer">Lecturer</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Professor">Professor</option>
              </select>
            </div>
            {errors.designation && (
              <span className="text-danger">{errors.designation}</span>
            )}

            <div id="teacherField">
              <label>CNIC</label>
              <input
               id="teacherinp"
                name="cnic"
                type="text"
                placeholder="42204-3452276-3"
                onChange={handleInput}
              ></input>
            </div>
            <span className="text-danger">{errors.cnic}</span>

            <div id="teacherField">
              <label>Qualification</label>

              <select
               id="teacherinp"
                name="qualification"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              >
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div id="teacherField">
              <label>Status</label>
              <select
               id="teacherinp"
                name="status"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              >
                <option value="Active">Active</option>
                <option value="Leave">Leave</option>
              </select>
            </div>
            <div id="teacherField">
              <label>Date of Joining</label>
              <input
               id="teacherinp"
                style={{ width: "14.8vw", height: "5.8vh" }}
                name="joiningDate"
                type="date"
                onChange={handleInput}
              ></input>
            </div>
            <span className="text-danger">{errors.date}</span>

            <div id="teacherField">
              <label>Picture</label>
              <input
               
                style={{ width: "14.8vw", height: "5.8vh" }}
                name="photo"
                type="file"
                onChange={handleInput}
              ></input>
            </div>

            <button>Add Teacher</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddTeacher;