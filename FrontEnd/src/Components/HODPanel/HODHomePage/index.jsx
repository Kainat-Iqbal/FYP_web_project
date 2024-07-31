import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import SideBar from '../SideBar';
import "./hodHomePage.css";

function HODHomePage() {
  const [hodId, setHodId] = useState(null);
  const [hodName, setHodName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/session", {
          withCredentials: true,
        });
        setHodId(response.data.userId);
        setHodName(response.data.userName);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  console.log("HOD",hodId)

  
  
  const nav = useNavigate();

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8081/assignCourse/GetAllCourses");
        setCourses(res.data);
        console.log("na,e",res.data)
      } catch (error) {
        console.log("Error fetching requests", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <div id="HODHomePageMainDiv">
        <SideBar />

        <div id="HODHomePageTopBar">
          <div id="HODHomePageProfile">
            <img src={require("./profile.jpg")}
              style={{ height: "85%", width: "96%", borderRadius: "50%", marginTop: "7%" }} />
          </div>
          <div id="HODHomePageInfo">
            <h2 style={{ marginTop: "4.5%" }}>Ms. {hodName} </h2>

            <h5 style={{ marginTop: "1%" }}>Head Of Department</h5>
            <h5 style={{ marginTop: "-2%" }}>Computer Science & Software Engineering</h5>
            <h5 style={{ marginTop: "-2%" }}>Jinnah University For Women</h5>
          </div>
        </div>

        <div id="HODHomePageWithoutBar">

          <div id="HODHomePageTeacher">
            <h2 style={{ marginTop: "2vh" }}> 60 </h2>

            <div id="HODHomePageNumImage">
              <h3>Faculty</h3>
              <img
                src={require("./teacher.png")}
                style={{ width: "6vw", height: "10vh",paddingBottom:'2vh' }} />
            </div>
          </div>

          <div id="HODHomePageStudent">
            <h2 style={{ marginTop: "2vh" }} > 14,000 </h2>
            <div id="HODHomePageNumImage">
              <h3>Students</h3>
              <img src={require("./student.png")} style={{ width: "6vw", height: "10vh",paddingBottom:'2vh' }} />
            </div>
          </div>

          <div id="HODHomePagePassStudent">
            <h2 style={{ marginTop: "2vh" }} > 10,000 </h2>
            <div id="HODHomePageNumImage">
              <h3 style={{marginTop:'-2vh'}}>Passed Students</h3>
              <img src={require("./passStudent.png")} style={{ width: "6vw", height: "10vh",paddingBottom:'2vh' }} />
            </div>
          </div>

          <div id="AssignCourseTable">
            <Table striped bordered hover id="viewAssignCourseTable">
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>Course Code</th>
                  <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>Course Name</th>
                  <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>Class</th>
                  <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>Batch</th>
                  <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>Status</th>
                  <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>Assigned Instrucutor</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((result) => (
                  <tr key={result.SNo}>
                    <td style={{ textAlign: "center" }}>{result.course_code}</td>
                    <td style={{ textAlign: "center" }}>{result.course_title}</td>
                    <td style={{ textAlign: "center" }}>{result.class_name}</td>
                    <td style={{ textAlign: "center" }}>{result.batch_name}</td>
                    <td style={{ textAlign: "center" }}>{result.assignment_status}</td>
                    <td style={{ textAlign: "center" }}>{result.teacher_name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

          </div>

        </div>
      </div>
    </>
  );
}

export default HODHomePage;
