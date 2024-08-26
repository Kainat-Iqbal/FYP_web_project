import * as React from "react";
import "./session.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UpdateSession() {
    const {id} = useParams();
    const nav = useNavigate();

  const [batch, setBatch] = useState([]);
  const [degree, setDegree] = useState([]);

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const res = await axios.get("http://localhost:8081/sessionUni/Get");
        setBatch(res.data.batch);
        console.log("batch", batch);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchBatch();
  }, []);

  useEffect(() => {
    const fetchDegree = async () => {
      try {
        const res = await axios.get("http://localhost:8081/SessionUni/Get");
        setDegree(res.data.degree_program);
        console.log("first", degree);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDegree();
  }, []);

  const [DATA, setData] = useState({
    adminId: "",
    academic_year:"" ,
    semester: "",
    batchId: '',
    programId:''
  });
// // Function to handle changes in input field
// const handleInput = (event) => {
//     setData((prev) => ({
//       ...prev,
//       [event.target.name]: event.target.value,
//     }));
//   };

  // Function to handle changes in input field
  const handleInput = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  console.log("val", DATA);
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.put("http://localhost:8081/sessionUni/Update/"+id,DATA)
    .then(res =>{
      if(res.data.updated){
        alert("Session Updated Succesfully")
        nav("/viewDegree");
      }
      else console.log("Wrongggg")
    })
    }
    
    useEffect(() => {
        const fetchBatch = async () => {
          try {
            const res = await axios.get("http://localhost:8081/sessionUni/Edit/"+id);
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
    <div id="mainAddSessionDiv">
      <SideBar />
      <div id="sessionWithoutBar">
        <div id="sessionBottom">
        <div id="sessionTop">
        <h1>A<span className="smaller-text">DD</span> S<span className="smaller-text">ESSION</span></h1>
        </div>
          <form id="sessionForm" action="" onSubmit={handleSubmit}>
            <div id="sessionField">
              <label>Class</label>
              <select
                name="programId"
                value={DATA.programId}
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh",border:'1px solid lightgray' }}
              >
                <option value="" disabled>
                  Select Class
                </option>
                {degree.map((degreeData) => {
                  return (
                    <option
                      key={degreeData.programId}
                      value={degreeData.programId}
                    >
                      {degreeData.type + "(" + degreeData.degree + ")"}
                    </option>
                  );
                })}{" "}
              </select>
            </div>

            <div id="sessionField">
              <label>Batch</label>
              <select
                name="batchId"
                onChange={handleInput}
                value={DATA.batchId}
                style={{ width: "14.8vw", height: "5.8vh",border:'1px solid lightgray' }}
              >
                <option value="" disabled>
                  Select Batch
                </option>
                {batch.map((batchData) => {
                  return (
                    <option key={batchData.batchId} value={batchData.batchId}>
                      {batchData.year + "  " + batchData.session}
                    </option>
                  );
                })}{" "}
              </select>
            </div>

            <div id="sessionField">
              <label>Academic Year</label>
              <select
                name="total_credit_hours"
                onChange={handleInput}
                value={DATA.academic_year}
                style={{ width: "14.8vw", height: "5.8vh",border:'1px solid lightgray' }}
              >
                <option value="" disabled>
                  Select year
                </option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div id="sessionField">
              <label>Semester</label>
              <select
                name="semester"
                onChange={handleInput}
                value={DATA.semester}
                style={{ width: "14.8vw", height: "5.8vh",border:'1px solid lightgray' }}
              >
                <option value="I">I</option>
                <option value="II">II</option>
              </select>
            </div>

            <button>Update Session</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateSession;
