import * as React from "react";
import SideBar from "../../SideBar";
import "./degree.css";
import Table from "react-bootstrap/Table";
import { Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

function ViewDegree(){

  const [degree, setDegree] = useState([]);
  useEffect(() => {
    const fetchDegree = async () => {
      try {
        const res = await axios.get("http://localhost:8081/degree/View");
        setDegree(res.data);
        // console.log("Successfuly fetched", res.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDegree();
  }, []);

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
    <div id="mainViewDegreeDiv">
        <div id="sidebar">
            <SideBar/>
        </div>
        <div id="viewDegreeWithoutBar">
        
        <div id="topheading">
            <h1>
              Degree Program's Information
            </h1>
          </div>
          
        <div id="viewDegreeBottom">
          <Table striped bordered hover id="viewDegreeTable">
            <thead>
              <tr>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  ID
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Type
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Degree
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Total Credit Hours
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Edit
                </th>
              </tr>
            </thead>

            <tbody>
              {degree.map((degreeData) => {
                return (
                  <tr key={degreeData.id}>
                    <td>{degreeData.programId}</td>
                    <td>{degreeData.type}</td>
                    <td>{degreeData.degree}</td>
                    <td>{degreeData.total_credit_hours}</td>
                   
                    <td>
                      <Link to={`/updateDegree/${degreeData.programId}`}><Edit /></Link>
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </Table>
        </div>

        <div id="topheading">
            <h1>
              Dean's Information
            </h1>
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

export default ViewDegree;