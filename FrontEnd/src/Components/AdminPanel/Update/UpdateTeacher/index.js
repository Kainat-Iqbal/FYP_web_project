import * as React from "react";
import "./updateTeacher.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import TeacherValidation from "../../Add/AddTeacher/teacherValidation";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UpdateTeacher(){
    const {id} = useParams();
    const nav = useNavigate();

  // State variables to hold the input values
  const [DATA, setData] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    CNIC: "",
    qualification: "",
    status: "",
    JoiningDate: "",
    adminId:""
  });

  const [errors, setErrors] = useState({});

  // Function to handle changes in input field
  const handleInput = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
console.log(DATA)

const handleSubmit = async (event) => {
  event.preventDefault();
  axios.put("http://localhost:8081/teacher/Update/"+id,DATA)
  .then(res =>{
    if(res.data.updated){
      alert("Teacher Updated Succesfully")
      nav("/viewTeacher");
    }
    else console.log("Wrongggg")
  })
  setErrors(TeacherValidation(DATA));
}

useEffect(() => {
  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:8081/teacher/Edit/"+id);
      setData(res.data[0]);
      console.log("Successfuly fetched", res.data[0]);
      // console.log("first",setTeacher)
    } catch (error) {
      console.log("error", error);
    }
  };

  fetchTeachers();
}, []);

return(
<div id="mainAddTeacherDiv">
      <SideBar />
      <div id="teacherWithoutBar">
        <div id="teacherBottom">
        <div id="teacherTop">
        <h1>U<span className="smaller-text">PDATE</span> T<span className="smaller-text">EACHER</span></h1>
        </div>
          <form id="teacherForm" action="" onSubmit={handleSubmit}>
            <div id="teacherField">
              <label>Name</label>
              <input
             id="teacherinp"
                name="name"
                type="text"
                value={DATA.name}
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
                value={DATA.email}
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              ></input>
            </div>
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}

            <div id="teacherField">
              <label>Department</label>

              <select
               id="teacherinp"
                name="department"
                value={DATA.department}
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
                value={DATA.designation}
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
                name="CNIC"
                type="text"
                value={DATA.CNIC}
                onChange={handleInput}
              ></input>
            </div>

            <div id="teacherField">
              <label>Qualification</label>

              <select
               id="teacherinp"
                name="qualification"
                value={DATA.qualification}
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
                value={DATA.status}
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
                name="JoiningDate"
                value={DATA.JoiningDate}
                type="date"
                onChange={handleInput}
              ></input>
            </div>

            <button>Update Teacher</button>
          </form>
        </div>
      </div>
    </div>)
}
export default UpdateTeacher;