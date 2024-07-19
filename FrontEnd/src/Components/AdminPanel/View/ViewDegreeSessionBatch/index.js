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

  const [batch, setBatch] = useState([]);
  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const res = await axios.get("http://localhost:8081/batch/View");
        setBatch(res.data);
        // console.log("Successfuly fetched", res.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchBatch();
  }, []);

  const [session, setSession] = useState([]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get("http://localhost:8081/sessionUni/View");
        setSession(res.data);
        console.log("Successfuly fetched", res.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchSession();
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
              Batch's Information
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
                  Year
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Session
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Edit
                </th>
              </tr>
            </thead>

            <tbody>
              {batch.map((batchData) => {
                return (
                  <tr key={batchData.id}>
                    <td>{batchData.batchId}</td>
                    <td>{batchData.year}</td>
                    <td>{batchData.session}</td>
                    <td>
                      <Link to={`/updateBatch/${batchData.batchId}`}><Edit /></Link>
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </Table>
        </div>

        <div id="topheading">
            <h1>
              Session's Information
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
                  Academic Year
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Semester
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Class
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Batch
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Edit
                </th>
              </tr>
            </thead>

            <tbody>
              {session.map((sessionData) => {
                return (
                  <tr key={sessionData.id}>
                    <td>{sessionData.sessionId}</td>
                    <td>{sessionData.academic_year}</td>
                    <td>{sessionData.semester}</td>
                    <td>{sessionData.type+'('+sessionData.degree+')'}</td>
                    <td>{sessionData.year+'('+sessionData.session+')'}</td>
                    <td>
                      <Link to={`/updateSession/${sessionData.sessionId}`}><Edit /></Link>
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