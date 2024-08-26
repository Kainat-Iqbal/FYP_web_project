import * as React from "react";
import "./batch.css";
import { useNavigate } from "react-router-dom";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function UpdateBatch() {
    const {id} = useParams();
    const nav = useNavigate();
  
  // State variables to hold the input values
  const [DATA, setData] = useState({
    year: "",
    session: "",
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
  axios.put("http://localhost:8081/batch/Update/"+id,DATA)
  .then(res =>{
    if(res.data.updated){
      alert("Batch Updated Succesfully")
      nav("/viewDegree");
    }
    else console.log("Wrongggg")
  })
  }
  
  useEffect(() => {
  const fetchBatch = async () => {
    try {
      const res = await axios.get("http://localhost:8081/batch/Edit/"+id);
      setData(res.data[0]);
      console.log("Successfuly fetched", res.data[0]);
      console.log("first",DATA)
    } catch (error) {
      console.log("error", error);
    }
  };
  
  fetchBatch();
  }, []);


    // Generate an array of years from the current year to 20 years ago
  const [years, setYears] = useState([]);
  useEffect(() => {
    // Generate an array of years from the current year to 50 years ago
    const currentYear = new Date().getFullYear();
    const yearArray = [];
    for (let i = 0; i <= 50; i++) {
      yearArray.push(currentYear - i);
    }
    setYears(yearArray);
  }, []);


  return (
    <div id="mainAddBatchDiv">
      <SideBar />
      <div id="batchWithoutBar">
        <div id="batchBottom">
        <div id="batchTop">
          <h1>U<span className="smaller-text">PDATE</span> B<span className="smaller-text">ATCH</span></h1>
        </div>
          <form id="batchForm" action="" onSubmit={handleSubmit}>
            <div id="batchField">
              <label>Year</label>
              <select
                name="year"
                onChange={handleInput}
                value={DATA.year}
                style={{ width: "14.8vw", height: "5.8vh",border:'1px solid lightgray' }}
              >
                <option value="" disabled>Select year</option>
                    {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div id="batchField">
              <label>Session</label>
              <select
                name="session"
                value={DATA.session}
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh",border:'1px solid lightgray'}}
              >
                <option value="Spring">Spring</option>
                <option value="Fall">Fall</option>
              </select>
            </div>

            <button>Update Batch</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateBatch;
