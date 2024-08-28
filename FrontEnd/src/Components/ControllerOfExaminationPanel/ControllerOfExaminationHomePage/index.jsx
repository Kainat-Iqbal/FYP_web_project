import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import SideBar from '../SideBar';
import "./controllerOfExaminationHomePage.css";

function ControllerOfExaminationHomePage() {

  const [examinationId, setExaminationId] = useState(null);
  const [examinationName, setExaminationName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/session", {
          withCredentials: true,
        });
        setExaminationId(response.data.userId);
        setExaminationName(response.data.userName);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  console.log("Examination",examinationId,examinationName)

  return (
    <>
      <div id="COEhomePageMainDiv">
        <SideBar />

        <div id="COEhomePageTopBar">

          <div id="COEhomePageProfile">
            <img src={require("./profile.jpg")}
              style={{ height: "85%", width: "96%", borderRadius: "50%", marginTop: "7%" }} />
          </div>

          <div id="COEhomePageInfo">
            <h2 style={{ marginTop: "4.3%" }}>Ms. {examinationName} </h2>

            <h5 style={{ marginTop: "1%" ,fontSize:'1.1rem'}}>Controller of Examination</h5>
            {/* <h5 style={{ marginTop: "-2%" }}>Computer and Software Engineering</h5> */}
            <h5 style={{ marginTop: "-2%",fontSize:'1.1rem' }}>Jinnah University For Women</h5>
          </div>

        </div>

        <div id="COEhomePageWithoutBar">
        <div id="COEhomePageFaculty">
            <h2 style={{ marginTop: "1vh" }}> 60 </h2>
            <div id="COEhomePageNumImage">
              <h3>Faculty</h3>
              <img
                src={require("./teacher.png")}
                style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="COEhomePageStudent">
            <h2 style={{ marginTop: "1vh" }} > 16,000 </h2>
            <div id="COEhomePageNumImage">
              <h3>Students</h3>
              <img src={require("./student.png")} style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="COEhomePagePassStudent">
            <h2 style={{ marginTop: "1vh" }} > 15,000 </h2>
            <div id="COEhomePageNumImage">
              <h3>Passed Students</h3>
              <img src={require("./passStudent.png")} style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="COEhomePageTotalCourses">
            <h2 style={{ marginTop: "1vh" }} > 1000 </h2>
            <div id="COEhomePageNumImage">
              <h3>Courses</h3>
              <img src={require("./graduation.png")} style={{ marginLeft:'10px',width: "4.5vw", height: "10vh" }} />
            </div>
          </div>

          <div id="COEhomePagePassFailGraph">
            <img
              src={require("./graph2.jpg")}
              style={{ width: "100%", height: "100%" }} />
          </div>

          <div id="COEhomePageGraphs">
          <img src= {require("./course.png")} style={{width:'100%',height:"35vh" ,boxShadow:'2px 2px 15px rgba(0, 0, 0, 0.2)',marginTop:"-6vh"}}/>
          <img src= {require("./piechart3.jpg")} style={{width:'100%',height:"30vh",boxShadow:'2px 2px 15px rgba(0, 0, 0, 0.2)',marginTop:'2vh'}}/>
          </div>

        </div>      </div>
    </>
  );
}

export default ControllerOfExaminationHomePage;
