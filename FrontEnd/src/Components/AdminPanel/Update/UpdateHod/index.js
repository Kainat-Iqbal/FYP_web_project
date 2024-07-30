import * as React from "react";
import "./updateHod.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import TeacherValidation from "../../Add/AddTeacher/teacherValidation";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UpdateHod(){
    const {id} = useParams();
    const nav = useNavigate();

  // State variables to hold the input values
  const [DATA, setData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
    CNIC: "",
    qualification: "",
    status: "",
    JoiningDate: "",
    adminId:"",
    HODId:""
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
  axios.put("http://localhost:8081/hod/Update/"+id,DATA)
  .then(res =>{
    if(res.data.updated){
      alert("HOD Updated Succesfully")
      nav("/viewDean");
    }
    else console.log("Wrongggg")
  })
  setErrors(TeacherValidation(DATA));
}

useEffect(() => {
  const fetchHod = async () => {
    try {
      const res = await axios.get("http://localhost:8081/hod/Edit/"+id);
      setData(res.data[0]);
      console.log("Successfuly fetched", res.data[0]);
      // console.log("first",setTeacher)
    } catch (error) {
      console.log("error", error);
    }
  };

  fetchHod();
}, []);

return(
<div id="mainAddHodDiv">
      <SideBar />
      <div id="hodWithoutBar">
        <div id="hodTop">
          <h1>Update HOD</h1>
        </div>

        <div id="hodBottom">
          <form id="hodForm" action="" onSubmit={handleSubmit}>
            <div id="hodField">
              <label>Name</label>
              <input 
               id="updatehod_input"
                name="name"
                type="text"
                value={DATA.name}
                onChange={handleInput}
              ></input>
            </div>
            {errors.name && <span className="text-danger">{errors.name}</span>}

            <div id="hodField">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={DATA.email}
                onChange={handleInput}
              ></input>
            </div>
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}

            <div id="hodField">
              <label>Password</label>
              <input
               id="updatehod_input"
                name="password"
                type="text"
                onChange={handleInput}
                value={DATA.password}
              ></input>
            </div>
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}

            <div id="hodField">
              <label>Department</label>

              <select
                name="department"
                value={DATA.department}
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
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

            <div id="hodField">
              <label>Designation</label>
              <select
                name="designation"
                value={DATA.designation}
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Lecturer">Lecturer</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Professor">Professor</option>
              </select>
            </div>
            {errors.designation && (
              <span className="text-danger">{errors.designation}</span>
            )}

            <div id="hodField">
              <label>CNIC</label>
              <input
               id="updatehod_input"
                name="CNIC"
                type="text"
                value={DATA.CNIC}
                onChange={handleInput}
              ></input>
            </div>

            <div id="hodField">
              <label>Qualification</label>

              <select
                name="qualification"
                value={DATA.qualification}
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div id="hodField">
              <label>Status</label>
              <select
                name="status"
                value={DATA.status}
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Active">Active</option>
                <option value="Leave">Leave</option>
              </select>
            </div>
            <div id="hodField">
              <label>Date of Joining</label>
              <input
                style={{ width: "14.8vw", height: "4.5vh" }}
                name="JoiningDate"
                value={DATA.JoiningDate}
                type="date"
                onChange={handleInput}
              ></input>
            </div>

            <button>Update HOD</button>
          </form>
        </div>
      </div>
    </div>)
}
export default UpdateHod;