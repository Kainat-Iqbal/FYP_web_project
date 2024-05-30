import { useState, useEffect } from "react";
import "./assignCourse.css";
import SideBar from '../SideBar';

function AssignCourse() {
  return (
    <div id="mainAssignCourseDiv">
      <SideBar />
      <div id="assignCourseWithoutBar">
        <div id="assignCourseTop">
          <h1 style={{ color: "#00304B" }}>Assign Course</h1>
        </div>

        <div id="assignCourseBottom">

          <form id="assignCourseForm">

            <div id="assignCourseField">
              <label>Assign Date</label>
              <input
                style={{ width: "14.8vw", height: "6vh" }}
                name="assigningDate"
                type="date"
              ></input>
            </div>

            <div id="assignCourseField">
              <label>Instructor Name</label>
              <input style={{ width: "14.9vw", height: "6vh" }}
                name="name"
                type="text"
                placeholder="Aaliya Zubair "
              ></input>
            </div>

            <div id="assignCourseField">
              <label>Department</label>
              <select name="department" style={{ width: "14.8vw", height: "6vh" }}>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Computer Science">Computer Science</option>
              </select>
            </div>

            <div id="assignCourseField">
              <label>Course Code</label>
              <input style={{ width: "14.9vw", height: "6vh" }}
                name="name"
                type="text"
                placeholder="CSE 4054"
              ></input>
            </div>

            <div id="assignCourseField">
              <label>Course Name</label>
              <input style={{ width: "14.9vw", height: "6vh" }}
                name="name"
                type="text"
                placeholder="Computer Networks"
              ></input>
            </div>

            <div id="assignCourseField">
              <label>Designation</label>
              <select name="designation" style={{ width: "14.8vw", height: "6vh" }}>
                <option value="Lecturer">Lecturer</option>
                <option value="Professor">Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
              </select>
            </div>

          </form>

          <div id="assignButton">
            <button>Assign Course</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AssignCourse;




