import * as React from "react";
import SideBar from "../../SideBar";
import "./dean.css";
import Table from "react-bootstrap/Table";
import { Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

function ViewDeanHodExam(){

  const [dean, setDean] = useState([]);
  useEffect(() => {
    const fetchDean = async () => {
      try {
        const res = await axios.get("http://localhost:8081/dean/View");
        setDean(res.data);
        // console.log("Successfuly fetched", res.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDean();
  }, []);

  const [examination, setExamination] = useState([]);

  useEffect(() => {
    const fetchExamination = async () => {
      try {
        const res = await axios.get("http://localhost:8081/examination/View");
        setExamination(res.data);
        console.log("Successfuly fetched", res.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchExamination();
  }, []);
return(
    <div id="mainViewDeanDiv">
        <div id="sidebar">
            <SideBar/>
        </div>
        <div id="viewDeanWithoutBar">
        <div id="viewDeanTop">
        <div id="topMenu">
              <div id="leftM">
              <input type="text" placeholder="Search..." style={{ width: '80%' }} />
              <button style={{ height: '63%' }}
              ><SearchIcon />
              </button>
            </div>
            <div id="right">
              {/* Sort By Dropdown */}
              <select style={{ width: '40%' }}>
                <option value="id">Sort by ID</option>
                <option value="name">Sort by Name</option>
                <option value="email">Sort by Email</option>
                <option value="deaprtment">Department</option>
                <option value="designation">Designation</option>
              </select>
            </div>
          </div>

        <div id="topheading">
            <h1>
              Dean's Information
            </h1>
          </div>
          
        </div>


        <div id="viewDeanBottom">
          <Table striped bordered hover id="viewDeanTable">
            <thead>
              <tr>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  ID
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Name
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Email
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Faculty
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Qualification
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  CNIC
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Joining Date
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Status
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Edit
                </th>
              </tr>
            </thead>

            <tbody>
              {dean.map((deanData) => {
                return (
                  <tr key={deanData.id}>
                    <td>{deanData.deanId}</td>
                    <td>{deanData.name}</td>
                    <td>{deanData.email}</td>
                    <td>{deanData.faculty}</td>
                    <td>{deanData.qualification}</td>
                    <td>{deanData.CNIC}</td>
                    <td>{deanData.JoiningDate}</td>
                    <td>{deanData.status}</td>
                    <td>
                      <Link to={`/updateDean/${deanData.deanId}`}><Edit /></Link>
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </Table>
        </div>
        <div id="topheading">
            <h1>
              Controller of Examination's Information
            </h1>
          </div>
          <div id="viewExaminationBottom">
          <Table striped bordered hover id="viewDeanTable">
            <thead>
              <tr>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  ID
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Name
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Email
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  CNIC
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Joining Date
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Status
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Edit
                </th>
              </tr>
            </thead>

            <tbody>
              {examination.map((examinationData) => {
                return (
                  <tr key={examinationData.id}>
                    <td>{examinationData.examinationId}</td>
                    <td>{examinationData.name}</td>
                    <td>{examinationData.email}</td>
                    <td>{examinationData.CNIC}</td>
                    <td>{examinationData.joiningDate}</td>
                    <td>{examinationData.status}</td>
                    <td>
                      <Link to={`/updateExamination/${examinationData.examinationId}`}><Edit /></Link>
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </Table>
        </div>
          
        </div>
        
    </div>
);

}

export default ViewDeanHodExam;