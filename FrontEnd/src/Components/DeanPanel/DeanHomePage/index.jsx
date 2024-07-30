import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import SideBar from '../SideBar';
import "./deanHomePage.css";

function DeanHomePage() {

  const [deanId, setDeanId] = useState(null);
  const [deanName, setDeanName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/session", {
          withCredentials: true,
        });
        setDeanId(response.data.userId);
        setDeanName(response.data.userName);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  console.log("Dean",deanId,deanName)

  return (
    <>
      <div id="DeanHomePageMainDiv">
        <SideBar />

        <div id="DeanHomePageTopBar">

          <div id="DeanHomePageProfile">
            <img src={require("./profilePic.png")}
              style={{ height: "85%", width: "94%", borderRadius: "50%", marginTop: "4.5%", backgroundColor: "white" }} />
          </div>

          <div id="DeanHomePageInfo">
            <h2 style={{ marginTop: "4.3%" }}>Ms. {deanName} </h2>

            <h5 style={{ marginTop: "1%" }}>Dean Faculty Of Science</h5>
            {/* <h5 style={{ marginTop: "-2%" }}>Faculty Of Science</h5> */}
            <h5 style={{ marginTop: "-2%" }}>Jinnah University For Women</h5>
          </div>

        </div>

        <div id="DeanHomePageWithoutBar">

          <div id="DeanHomePageFaculty">
            <h1 style={{ marginTop: "2vh" }}> 60 </h1>
            <div id="DeanHomePageNumImage">
              <h2>Faculty</h2>
              <img
                src={require("./teacher.png")}
                style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="DeanHomePageStudent">
            <h1 style={{ marginTop: "2vh" }} > 16,000 </h1>
            <div id="DeanHomePageNumImage">
              <h2>Students</h2>
              <img src={require("./student.png")} style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="DeanHomePagePassStudent">
            <h1 style={{ marginTop: "2vh" }} > 15,000 </h1>
            <div id="DeanHomePageNumImage">
              <h2>Passed Students</h2>
              <img src={require("./passStudent.png")} style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="DeanHomePageFailStudent">
            <h1 style={{ marginTop: "2vh" }} > 1000 </h1>
            <div id="DeanHomePageNumImage">
              <h2>Total Fail Students</h2>
              <img src={require("./fail.png")} style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="DeanHomePagePassFailGraph">
            <img
              src={require("./barGraph.png")}
              style={{ width: "100%", height: "100%" }} />
          </div>

          <div id="DeanHomePageTotalCourses">
            <h2 style={{ marginTop: "2vh" }} > 350 </h2>
            <h3>Total Courses</h3>
            <img src={require("./course.png")} style={{ width: '100%', height: "40vh" }} />
          </div>

        </div>
      </div>
    </>
  );
}

export default DeanHomePage;
