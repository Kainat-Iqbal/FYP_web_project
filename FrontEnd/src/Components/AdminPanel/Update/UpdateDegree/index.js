import * as React from "react";
import "./degree.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function UpdateDegree() {
    const {id} = useParams();
    const nav = useNavigate();
  
  // State variables to hold the input values
  const [DATA, setData] = useState({
    type: "",
    degree: "",
    total_credit_hours: "",
    adminId:""
  });
  
  
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
  axios.put("http://localhost:8081/degree/Update/"+id,DATA)
  .then(res =>{
    if(res.data.updated){
      alert("Degree Program Updated Succesfully")
      nav("/viewDegree");
    }
    else console.log("Wrongggg")
  })
  }
  
  useEffect(() => {
  const fetchDegree = async () => {
    try {
      const res = await axios.get("http://localhost:8081/degree/Edit/"+id);
      setData(res.data[0]);
      console.log("Successfuly fetched", res.data[0]);
      // console.log("first",setTeacher)
    } catch (error) {
      console.log("error", error);
    }
  };
  
  fetchDegree();
  }, []);
  
  return (
    <div id="mainAddDegreeProgramDiv">
      <SideBar />
      <div id="degreeProgramWithoutBar">
        <div id="degreeProgramTop">
          <h1>Update Degree Program</h1>
        </div>

        <div id="degreeProgramBottom">
          <form id="degreeProgramForm" action="" onSubmit={handleSubmit}>

            <div id="degreeProgramField">
              <label>Type</label>
              <select
                name="type"
                value={DATA.type}
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
                value={DATA.degree}
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
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
                value={DATA.total_credit_hours}
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="128">128</option>
                <option value="130">130</option>
              </select>
            </div>
        
            <button id="update_DP_button">Update Degree Program</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateDegree;
