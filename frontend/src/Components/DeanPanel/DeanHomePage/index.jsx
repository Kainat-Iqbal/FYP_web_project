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

            <h5 style={{ marginTop: "1%",fontSize:'1.1rem' }}>Dean Faculty Of Science</h5>
            {/* <h5 style={{ marginTop: "-2%" }}>Faculty Of Science</h5> */}
            <h5 style={{ marginTop: "-2%" ,fontSize:'1.1rem'}}>Jinnah University For Women</h5>
          </div>

        </div>

        <div id="DeanHomePageWithoutBar">

          <div id="DeanHomePageFaculty">
            <h2 style={{ marginTop: "1vh" }}> 60 </h2>
            <div id="DeanHomePageNumImage">
              <h3>Faculty</h3>
              <img
                src={require("./teacher.png")}
                style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="DeanHomePageStudent">
            <h2 style={{ marginTop: "1vh" }} > 16,000 </h2>
            <div id="DeanHomePageNumImage">
              <h3>Students</h3>
              <img src={require("./student.png")} style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="DeanHomePagePassStudent">
            <h2 style={{ marginTop: "1vh" }} > 15,000 </h2>
            <div id="DeanHomePageNumImage">
              <h3>Passed Students</h3>
              <img src={require("./passStudent.png")} style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="DeanHomePageTotalCourses">
            <h2 style={{ marginTop: "1vh" }} > 1000 </h2>
            <div id="DeanHomePageNumImage">
              <h3>Courses</h3>
              <img src={require("./graduation.png")} style={{ marginLeft:'10px',width: "4.5vw", height: "10vh" }} />
            </div>
          </div>

          <div id="DeanHomePagePassFailGraph">
            <img
              src={require("./graph2.jpg")}
              style={{ width: "100%", height: "100%" }} />
          </div>

          <div id="DeanHomePageGraphs">
          <img src= {require("./course.png")} style={{width:'100%',height:"35vh" ,boxShadow:'2px 2px 15px rgba(0, 0, 0, 0.2)',marginTop:"-6vh"}}/>
          <img src= {require("./piechart3.jpg")} style={{width:'100%',height:"30vh",boxShadow:'2px 2px 15px rgba(0, 0, 0, 0.2)',marginTop:'2vh'}}/>
          </div>

        </div>
      </div>
    </>
  );
}

export default DeanHomePage;
