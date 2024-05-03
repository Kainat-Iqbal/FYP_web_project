import * as React from "react";
import SideBar from "../SideBar";
import "./home.css";

function Home() {
  return (
    <>
      <div id="HomeMainDiv">
        <SideBar />
        <div id="HomeWithoutBar">

          <div id="homeTeacher">
            <h5>Current Teachers</h5>
            <div id="numImage">
              <h1>45</h1>
              <img
                src={require("./teacher.png")}
                style={{ width: "6vw", height: "10vh" }}
              />
            </div>
          </div>

          <div id="homeStudent">
            <h5>Total Students</h5>
            <div id="numImage">
              <h1>5600</h1>
              <img src={require("./student.png")} style={{ width: "6vw", height:"10vh" }} />
            </div>
          </div>

          <div id="homePassStudent">
            <h5>Total Pass Students</h5>
            <div id="numImage">
              <h1>5400</h1>
              <img src={require("./passStudent.png")} style={{ width: "6vw", height:"10vh" }} />
            </div>
          </div>

          <div id="homeFailStudent">
            <h5>Total Fail Students</h5>
            <div id="numImage">
              <h1>200</h1>
              <img src={require("./fail.png")} style={{ width: "4vw", height:"10vh" }} />
            </div>
          </div>

          {/* <div id="homeStudent"></div>

          <div id="homeCourse"></div> */}

          <div id="PassFail">
            <img
              src={require("./barGraph.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div id="homeCourse">
            <h5>Total Number of Courses</h5>
            <h1>340</h1>
            <img src= {require("./course.png")} style={{width:'100%',height:"40vh"}}/>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
