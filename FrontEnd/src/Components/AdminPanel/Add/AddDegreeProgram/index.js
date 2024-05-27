import * as React from "react";
import "./addDegree.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import TeacherValidation from "../../Add/AddTeacher/teacherValidation";

function AddDegreeProgram() {
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
    adminId:"",
    name: "",
    email: "",
    password: "User123*",
    CNIC: "",
    status: "Active",
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
      axios.post("http://localhost:8081/degreeProgram/Add", values).then((res) => {
        console.log("val",values);
        if (res.data === "success") {
          alert("DegreeProgram is added successfully");
        } else {
          console.log("error");
        }
      });
    }
  };

  return (
    <div id="mainAddDegreeProgramDiv">
      <SideBar />
      <div id="degreeProgramWithoutBar">
        <div id="degreeProgramTop">
          <h1>Add Degree Program</h1>
        </div>

        <div id="degreeProgramBottom">
          <form id="degreeProgramForm" action="" onSubmit={handleSubmit}>

            <div id="degreeProgramField">
              <label>Type</label>
              <select
                name="type"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="BS">BS</option>
                <option value="MS">MS</option>
              </select>
            </div>

            <div id="degreeProgramField">
              <label>Degree</label>
              <select
                name="degree"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Sofware Engineering">Sofware Engineering</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>

            <div id="degreeProgramField">
              <label>Total Credit Hours</label>
              <select
                name="degree"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Sofware Engineering">Sofware Engineering</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
        
            <button>Add Degree Program</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddDegreeProgram;
