import * as React from "react";
import "./updateExamination.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import TeacherValidation from "../../Add/AddTeacher/teacherValidation";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UpdateExamination() {

  const {id} = useParams();
  const nav = useNavigate();

// State variables to hold the input values
const [DATA, setData] = useState({
  name: "",
  email: "",
  CNIC: "",
  status: "",
  joiningDate: "",
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
axios.put("http://localhost:8081/examination/Update/"+id,DATA)
.then(res =>{
  if(res.data.updated){
    alert("Controller of examination Updated Succesfully")
    nav("/viewDean");
  }
  else console.log("Wrongggg")
})
setErrors(TeacherValidation(DATA));
}

useEffect(() => {
const fetchExamination = async () => {
  try {
    const res = await axios.get("http://localhost:8081/examination/Edit/"+id);
    setData(res.data[0]);
    console.log("Successfuly fetched", res.data[0]);
    // console.log("first",setTeacher)
  } catch (error) {
    console.log("error", error);
  }
};

fetchExamination();
}, []);


  return (
    <div id="mainAddExaminationDiv">
      <SideBar />
      <div id="ExaminationWithoutBar">
       

        <div id="ExaminationBottom">
        <div id="ExaminationTop">
        <h1>U<span className="smaller-text">PDATE</span> C<span className="smaller-text">ONTROLLER</span> O<span className="smaller-text">F</span> E<span className="smaller-text">XAMINATION</span></h1>
        
        </div>
          <form id="ExaminationForm" action="" onSubmit={handleSubmit}>
            <div id="ExaminationField">
              <label>Name</label>
              <input
              id="Examinationinp"
                name="name"
                type="text"
                value={DATA.name}
                onChange={handleInput}
              ></input>
            </div>
            {errors.name && <span className="text-danger">{errors.name}</span>}

            <div id="ExaminationField">
              <label>Email</label>
              <input
              id="Examinationinp"
                name="email"
                type="email"
                value={DATA.email}
                onChange={handleInput}
                style={{height:'5.8vh'}}
              ></input>
            </div>
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}

            <div id="ExaminationField">
              <label>CNIC</label>
              <input
              id="Examinationinp"
                name="CNIC"
                type="text"
                value={DATA.CNIC}
                onChange={handleInput}
              ></input>
            </div>

            <div id="ExaminationField">
              <label>Status</label>
              <select
              id="Examinationinp"
                name="status"
                onChange={handleInput}
                value={DATA.status}
                style={{ width: "16.7vw", height: "5.8vh" }}
              >
                <option value="Active">Active</option>
                <option value="Leave">Leave</option>
              </select>
            </div>
            <div id="ExaminationField">
              <label>Date of Joining</label>
              <input
              id="Examinationinp"
                style={{ width: "16.7vw", height: "5.8vh" }}
                name="joiningDate"
                type="date"
                value={DATA.joiningDate}
                onChange={handleInput}
              ></input>
            </div>

            <button id="COEbuttonupdate">Update Controller of Examination</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateExamination;
