import * as React from "react";
import "./addDegree.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";

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
    type: "BS",
    degree: "SE",
    total_credit_hours: "128*",
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
      axios.post("http://localhost:8081/degree/Add", values).then((res) => {
        console.log("val",values);
        if (res.data === "success") {
          alert("DegreeProgram is added successfully");
          window.location.reload(); // Refresh the page
        } else {
          console.log("error");
        }
      });
  };

  return (
    <div id="mainAddDegreeProgramDiv">
      <SideBar />
      <div id="degreeProgramWithoutBar">
       

        <div id="degreeProgramBottom">
        <div id="degreeProgramTop">
        <h1>A<span className="smaller-text">DD</span> D<span className="smaller-text">EGREE</span> P<span className="smaller-text">ROGRAM</span></h1>
        </div>
          <form id="degreeProgramForm" action="" onSubmit={handleSubmit}>

            <div id="degreeProgramField">
              <label>Type</label>
              <select
                name="type"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" ,border:'1px solid lightgray'}}
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
                style={{ width: "14.8vw", height: "5.8vh",border:'1px solid lightgray' }}
              >
                <option value="SE">Sofware Engineering</option>
                <option value="CS">Computer Science</option>
                <option value="DS">Data Science</option>
              </select>
            </div>

            <div id="degreeProgramField">
              <label>Total Credit Hours</label>
              <select
                name="total_credit_hours"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh",border:'1px solid lightgray' }}
              >
                <option value="128">128</option>
                <option value="130">130</option>
              </select>
            </div>
        
            <button id="DPbutton">Add Degree Program</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddDegreeProgram;
