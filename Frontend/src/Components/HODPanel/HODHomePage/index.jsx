import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import SideBar from '../SideBar';
import "./hodHome.css";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

function HODHomePage() {
  const nav = useNavigate();
  const [results, setResults] = React.useState([
    {
      CourseCode: 'CSS 1347',
      CourseName: 'Programming Fundamentals',
      Class: 'BS(CS)',
      Batch: '2024',
      Status: null,
      AssignedTeacher: 'Ms. Zara'
    },
    {
      CourseCode: 'CSS 1347',
      CourseName: 'Programming Fundamentals',
      Class: 'BS(CS)',
      Batch: '2024',
      Status: null,
      AssignedTeacher: 'Ms. Zara'
    },
    {
      CourseCode: 'CSS 1347',
      CourseName: 'Programming Fundamentals',
      Class: 'BS(CS)',
      Batch: '2024',
      Status: null,
      AssignedTeacher: 'Ms. Zara'
    },
    {
      CourseCode: 'CSS 1347',
      CourseName: 'Programming Fundamentals',
      Class: 'BS(CS)',
      Batch: '2024',
      Status: null,
      AssignedTeacher: 'Ms. Zara'
    },
    {
      CourseCode: 'CSS 1347',
      CourseName: 'Programming Fundamentals',
      Class: 'BS(CS)',
      Batch: '2024',
      Status: null,
      AssignedTeacher: 'Ms. Zara'
    },
    // Add more data as needed
  ]);

  return (
    <>
      <div id="HODHomeMainDiv">
        <SideBar />

        <div id="HODTopBar">
          <div id="HODprofile">
            <img src={require("./profile.jpg")}
              style={{ height: "88%", width: "90%", borderRadius: "50%", marginTop: "4%" }} />
          </div>
          <div id="HODinfo">
            <h2 style={{ marginTop: "4.5%%" }}>Ms.Laraib Zahid </h2>

            <h5 style={{ marginTop: "-1%" }}>Head Of Department</h5>
            <h5 style={{ marginTop: "-2%" }}>Computer Science and Software Engineering</h5>
            <h5 style={{ marginTop: "-2%" }}>Jinnah University For Women</h5>
          </div>
        </div>

        <div id="HODHomeWithoutBar">

          <div id="HODHomeTeacher">
            <h1 style={{ marginTop: "2vh" }}> 60 </h1>
            <div id="HODNumImage">
              <h2>Faculty</h2>
              <img
                src={require("./teacher.png")}
                style={{ width: "6vw", height: "10vh" }}
              />
            </div>
          </div>

          <div id="HODHomeStudent">
            <h1 style={{ marginTop: "2vh" }} > 14,000 </h1>
            <div id="HODNumImage">
              <h2>Students</h2>
              <img src={require("./student.png")} style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="HODHomePassStudent">
            <h1 style={{ marginTop: "2vh" }} > 10,000</h1>
            <div id="HODNumImage">
              <h2>Passed Students</h2>
              <img src={require("./passStudent.png")} style={{ width: "6vw", height: "10vh" }} />
            </div>
          </div>

          <div id="AssignCourseTable">
            <Table striped bordered hover id="viewResultTable">
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
                {results.map((result) => (
                  <tr key={result.SNo}>
                    <td style={{ textAlign: "center" }}>{result.CourseCode}</td>
                    <td style={{ textAlign: "center" }}>{result.CourseName}</td>
                    <td style={{ textAlign: "center" }}>{result.Class}</td>
                    <td style={{ textAlign: "center" }}>{result.Batch}</td>
                    <td style={{ textAlign: "center" }}>{result.Status}</td>
                    <td style={{ textAlign: "center" }}>{result.AssignedTeacher}</td>
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
