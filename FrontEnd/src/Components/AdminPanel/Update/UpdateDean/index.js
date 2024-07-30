import * as React from "react";
import "./updateDean.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import TeacherValidation from "../../Add/AddTeacher/teacherValidation";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UpdateDean(){
  const {id} = useParams();
  const nav = useNavigate();

// State variables to hold the input values
const [DATA, setData] = useState({
  name: "",
  email: "",
  password: "",
  faculty: "",
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
axios.put("http://localhost:8081/dean/Update/"+id,DATA)
.then(res =>{
  if(res.data.updated){
    alert("Dean Updated Succesfully")
    nav("/viewDean");
  }
  else console.log("Wrongggg")
})
setErrors(TeacherValidation(DATA));
}

useEffect(() => {
const fetchDeans = async () => {
  try {
    const res = await axios.get("http://localhost:8081/dean/Edit/"+id);
    setData(res.data[0]);
    console.log("Successfuly fetched", res.data[0]);
    // console.log("first",setTeacher)
  } catch (error) {
    console.log("error", error);
  }
};

fetchDeans();
}, []);


return(
    <div id="mainAddDeanDiv">
      <SideBar />
      <div id="deanWithoutBar">
        <div id="deanTop">
          <h1>Update Dean</h1>
        </div>

        <div id="deanBottom">
          <form id="deanForm" action="" onSubmit={handleSubmit}> 
            <div id="deanField">
              <label>Name</label>
              <input
              id="updatedean_input"
                name="name"
                type="text"
                value={DATA.name}
                onChange={handleInput}
              ></input>
            </div>
            {errors.name && <span className="text-danger">{errors.name}</span>}

            <div id="deanField">
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

            <div id="deanField">
              <label>Password</label>
              <input
               id="updatedean_input"
                name="password"
                type="text"
                value={DATA.password}
                onChange={handleInput}
              ></input>
            </div>
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}

            <div id="deanField">
              <label>Faculty</label>

              <select
                name="faculty"
                onChange={handleInput}
                value={DATA.faculty}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Science">
                  Science
                </option>
                <option value="Social Science">Social Science</option>
              </select>
            </div>

            <div id="deanField">
              <label>CNIC</label>
              <input
               id="updatedean_input"
                name="CNIC"
                value={DATA.CNIC}
                type="text"
                placeholder="42204-3452276-3"
                onChange={handleInput}
              ></input>
            </div>

            <div id="deanField">
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
            <div id="deanField">
              <label>Status</label>
              <select
              value={DATA.status}
                name="status"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Active">Active</option>
                <option value="Leave">Leave</option>
              </select>
            </div>
            <div id="deanField">
              <label>Date of Joining</label>
              <input
                style={{ width: "14.8vw", height: "4.5vh" }}
                name="joiningDate"
                type="date"
                value={DATA.JoiningDate}
                onChange={handleInput}
              ></input>
            </div>

            <button>Update Dean</button>
          </form>
        </div>
      </div>
    </div>
)
}
export default UpdateDean;