import * as React from "react";
import "./addTeacher.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState } from "react";
import TeacherValidation from "./teacherValidation";

function AddTeacher() {
  // State variables to hold the input values
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    department: "",
    adminEmail:""
  });

  const [errors, setErrors] = useState({});

  // Function to handle changes in input field
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
console.log(values)

const handleSubmit = async (event) => {
  event.preventDefault()
  setErrors(TeacherValidation(values));
  if(errors.email === "" && errors.password==="" && errors.name==="" && errors.department==="" && errors.designation==="" && errors.adminEmail===""){
    axios.post('http://localhost:8081/teacher/Add',values)
    .then(res =>{
      console.log(values)
      if(res.data === "success"){
        alert("teacher is added successfully")
      }
      else{
        console.log("error")
      }
    })
  }
}

  return (
    <div id="mainAddTeacherDiv">
      <SideBar />
      <div id="teacherWithoutBar">
        <div id="teacherTop">
          <h1>Add Teacher</h1>
        </div>

        <div id="teacherBottom">
          <form id="teacherForm" action="" onSubmit={handleSubmit}>
            <div id="teacherField">
              <label>Name</label>
              <input
                name="name"
                type="text"
                placeholder="Sara Ahmed"
                onChange={handleInput}
              ></input>
            </div>
            {errors.name && (<span className="text-danger">{errors.name}</span>)}

            <div id="teacherField">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                onChange={handleInput}
              ></input>
            </div>
            {errors.email && (<span className="text-danger">{errors.email}</span>)}

            <div id="teacherField">
              <label>Password</label>
              <input
                name="password"
                type="password"
                onChange={handleInput}
              ></input>
            </div>
            {errors.password && (<span className="text-danger">{errors.password}</span>)}

            <div id="teacherField">
              <label>Department</label>
              <input
                name="department"
                type="text"
                placeholder="Software Engineering"
                onChange={handleInput}
              ></input>
            </div>
            {errors.department && (<span className="text-danger">{errors.department}</span>)}

            <div id="teacherField">
              <label>Designation</label>
              <input
                name="designation"
                type="text"
                placeholder="Lecturer"
                onChange={handleInput}
              ></input>
            </div>
            {errors.designation && (<span className="text-danger">{errors.designation}</span>)}

            <div id="teacherField">
            <label>Admin Email</label>
              <input
                name="adminEmail"
                type="text"
                placeholder="Admin's email"
                onChange={handleInput}
              ></input>
            </div>
            {errors.adminEmail && (<span className="text-danger">{errors.adminEmail}</span>)}

            <button>Add Teacher</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddTeacher;
