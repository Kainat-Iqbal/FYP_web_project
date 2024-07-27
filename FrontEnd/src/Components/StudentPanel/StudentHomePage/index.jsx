import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import SideBar from '../SideBar';
import "./studentHomePage.css";

function StudentHomePage() {

  return (
    <>
      <div id="StudentHomePageMainDiv">
        <SideBar />

        <div id="StudentHomePageTopBar">

          <div id="StudentHomePageProfile">
            <img src={require("./profilePic.jpg")}
              style={{ height: "85%", width: "96%", borderRadius: "50%", marginTop: "7%" }} />
          </div>

          <div id="StudentHomePageInfo">
            <h2 style={{ marginTop: "4.3%" }}>Laiba Khalid</h2>

            <h5 style={{ marginTop: "1%" }}>Bachelor of Science in Software Engineering (BS(SE))</h5>
            <h5 style={{ marginTop: "-2%" }}>Computer Science & Software Engineering Department</h5>
            <h5 style={{ marginTop: "-2%" }}>Jinnah University For Women</h5>
          </div>

        </div>

        <div id="StudentHomePageWithoutBar">

          <div id="StudentHomePageEnrolledCourses">
            <h1 style={{ marginTop: "2vh" }}> 05 </h1>
            <div id="StudentHomePageNumImage">
              <h2>Enrolled Courses</h2>
              <img
                src={require("./teacher.png")}
                style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="StudentHomePageCompletedCourses">
            <h1 style={{ marginTop: "2vh" }} > 34 </h1>
            <div id="StudentHomePageNumImage">
              <h2> Completed Courses </h2>
              <img src={require("./passStudent.png")} style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="StudentHomePageTotalCourses">
            <h1 style={{ marginTop: "2vh" }} > 44 </h1>
            <div id="StudentHomePageNumImage">
              <h2> Total Courses </h2>
              <img src={require("./student.png")} style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="StudentHomePageFailCourses">
            <h1 style={{ marginTop: "2vh" }} > 0 </h1>
            <div id="StudentHomePageNumImage">
              <h2> Fail Courses </h2>
              <img src={require("./fail.png")} style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="StudentHomePageCGPAGraph">
            <img
              src={require("./barGraph.png")}
              style={{ width: "100%", height: "100%" }} />
          </div>

          {/* <div id="StudentHomePageTotalCourses">
            <h2 style={{ marginTop: "2vh" }} > 350 </h2>
            <h3>Total Courses</h3>
            <img src={require("./course.png")} style={{ width: '100%', height: "40vh" }} />
          </div> */}

        </div>
      </div>
    </>
  );
}

export default StudentHomePage;
