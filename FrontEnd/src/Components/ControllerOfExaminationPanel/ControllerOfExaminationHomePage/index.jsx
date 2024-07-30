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

            <h5 style={{ marginTop: "1%" }}>Controller of Examination</h5>
            {/* <h5 style={{ marginTop: "-2%" }}>Computer and Software Engineering</h5> */}
            <h5 style={{ marginTop: "-2%" }}>Jinnah University For Women</h5>
          </div>

        </div>

        <div id="COEhomePageWithoutBar">

          <div id="COEhomePageFaculty">
            <h1 style={{ marginTop: "2vh" }}> 60 </h1>
            <div id="COEhomePageNumImage">
              <h2>Faculty</h2>
              <img
                src={require("./teacher.png")}
                style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="COEhomePageStudent">
            <h1 style={{ marginTop: "2vh" }} > 16,000 </h1>
            <div id="COEhomePageNumImage">
              <h2>Students</h2>
              <img src={require("./student.png")} style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="COEhomePagePassStudent">
            <h1 style={{ marginTop: "2vh" }} > 15,000 </h1>
            <div id="COEhomePageNumImage">
              <h2>Passed Students</h2>
              <img src={require("./passStudent.png")} style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="COEhomePageFailStudent">
            <h1 style={{ marginTop: "2vh" }} > 1000 </h1>
            <div id="COEhomePageNumImage">
              <h2>Total Fail Students</h2>
              <img src={require("./fail.png")} style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="COEhomePagePassFailGraph">
            <img
              src={require("./barGraph.png")}
              style={{ width: "100%", height: "100%" }} />
          </div>

          <div id="COEhomePageTotalCourses">
            <h2 style={{ marginTop: "2vh" }} > 350 </h2>
            <h3>Total Courses</h3>
            <img src={require("./course.png")} style={{ width: '100%', height: "40vh" }} />
          </div>

        </div>
      </div>
    </>
  );
}

export default ControllerOfExaminationHomePage;
