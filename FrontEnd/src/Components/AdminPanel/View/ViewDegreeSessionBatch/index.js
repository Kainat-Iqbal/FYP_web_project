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
              Session's Information
            </h1>
          </div>

          <div id="viewExaminationBottom">
          <table id="viewDegreeSessionBatchTable">
            <thead>
              <tr>
                <th  >S#
                </th>
                <th  >
                  Academic Year
                </th>
                <th  >
                  Semester
                </th>
                <th  >
                  Class
                </th>
                <th  >
                  Batch
                </th>
                <th  >
                  Edit
                </th>
              </tr>
            </thead>

            <tbody>
              {session.map((sessionData,index) => {
                return (
                  <tr key={sessionData.id}>
                    <td>{index+1}</td>
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
          </table>
        </div>
        
        <div id="topheading">
            <h1>
              Degree Program's Information
            </h1>
          </div>
          
        <div id="viewDegreeBottom">
          <table id="viewDegreeSessionBatchTable">
            <thead>
              <tr>
                <th  >
                  S#
                </th>
                <th  >
                  Type
                </th>
                <th  >
                  Degree
                </th>
                <th  >
                  Edit
                </th>
              </tr>
            </thead>

            <tbody>
              {degree.map((degreeData,index) => {
                return (
                  <tr key={degreeData.id}>
                    <td>{index+1}</td>
                    <td>{degreeData.type}</td>
                    <td>{degreeData.degree}</td>                   
                    <td>
                      <Link to={`/updateDegree/${degreeData.programId}`}><Edit /></Link>
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>

        <div id="topheading">
            <h1>
              Batch's Information
            </h1>
          </div>
          
        <div id="viewDeanBottom">
          <table id="viewDegreeSessionBatchTable">
            <thead>
              <tr>
                <th  >
                  S#
                </th>
                <th  >
                  Year
                </th>
                <th  >
                  Session
                </th>
                <th  >
                  Edit
                </th>
              </tr>
            </thead>

            <tbody>
              {batch.map((batchData,index) => {
                return (
                  <tr key={batchData.id}>
                    <td>{index+1}</td>
                    <td>{batchData.year}</td>
                    <td>{batchData.session}</td>
                    <td>
                      <Link to={`/updateBatch/${batchData.batchId}`}><Edit /></Link>
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>

          
        </div>
        
    </div>
);

}

export default ViewDegree;