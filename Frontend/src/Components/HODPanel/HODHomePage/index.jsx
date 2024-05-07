// HodHomePage.js
import React from 'react';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import "./style.css";

function HodHomePage() {
  return (
    <>
    <div>
      <TopBar />
      </div>

<div id="HomeMainDiv">
  <SideBar />
  <div id="HomeWithoutBar">

     <div id="homeTeacher">
     <h1 style={{marginTop:"2vh"}}> 60 </h1>
      <div id="numImage">
        <h2>Faculty</h2>
        <img
          src={require("./teacher.png")}
          style={{ width: "6vw", height: "10vh" }}
        />
      </div>
    </div>

    <div id="homeStudent">
    <h1 style={{marginTop:"2vh"}} > 14,000 </h1>
      <div id="numImage">
      <h2>Students</h2>
        <img src={require("./student.png")} style={{ width: "6vw", height:"10vh" }} />
      </div>
    </div>

    <div id="homePassStudent">
    <h1 style={{marginTop:"2vh"}} > 10,000</h1>
      <div id="numImage">
      <h2>Passed Students</h2>
        <img src={require("./passStudent.png")} style={{ width: "6vw", height:"10vh" }} />
      </div>
    </div>

    {/* <div id="homeFailStudent">
    <h1> 150</h1>
      <div id="numImage">
      <h2>Failed Students</h2>
        <img src={require("./fail.png")} style={{ width: "4vw", height:"10vh" }} />
      </div>  
    </div>

    <div id="homeCourse">
    <h1> 150</h1>
    <h2>Courses</h2>
            <img src= {require("./course.png")} style={{width:'100%',height:"40vh"}}/>
    </div> */}

    

    
  </div>
</div>
</>
  );
}

export default HodHomePage;
