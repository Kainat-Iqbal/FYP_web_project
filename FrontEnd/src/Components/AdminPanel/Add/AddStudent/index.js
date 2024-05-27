import * as React from "react";
import "./addStudent.css";
import SideBar from "../../SideBar";

function AddStudent() {
  return (
    <div id="mainAddStudent">
      <SideBar />

      <div id="studentWithoutBar">
        <div id="studentTop">
          <h1>Add Teacher</h1>
        </div>
        <div id="studentBottom">
          <form id="studentForm">
            <div id="studentField">
            <input placeholder="Name"></input>
            </div>
            <div id="studentField">
            <input placeholder="Email"></input>
            </div>
            <div id="studentField">
            <input placeholder="Password"></input>
            </div>
            <div id="studentField">
            <input placeholder="CNIC"></input>
            </div>
            <div id="studentField">
            <select
              name="department"
              style={{height: "4.5vh" }}
            >
              <option value="Software Engineering">Software Engineering</option>
              <option value="Computer Science">Computer Science</option>
            </select>
            </div>
            <div  id="studentField">
            <select
                name="designation"
                style={{height: "4.5vh" }}
              >
                <option value="Lecturer">Lecturer</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Professor">Professor</option>
              </select>
            </div>

            <div  id="studentField">
            <select
                name="qualification"
                style={{height: "4.5vh" }}
              >
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div  id="studentField">
            <select
                name="status"
                style={{height: "4.5vh" }}
              >
                <option value="Active">Active</option>
                <option value="Leave">Leave</option>
              </select>
            </div>

            <div  id="studentField">
                <input type="date"></input>
            </div>
            <button>Add Teacher</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddStudent;
