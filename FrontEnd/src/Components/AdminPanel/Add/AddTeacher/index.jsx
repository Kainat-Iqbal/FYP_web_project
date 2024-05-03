import * as React from "react";
import "./addTeacher.css";
import SideBar from "../../SideBar";

function AddTeacher() {
  return (
    <div id="mainAddTeacherDiv">
      <SideBar />
      <div id="teacherWithoutBar">
        <div id="teacherTop">
          <h1>Add Teacher</h1>
        </div>

        <div id="teacherBottom">
          <form id="teacherForm">
            <div id="teacherField">
              <label>Name</label>
              <input type="text" placeholder="Sara Ahmed"></input>
            </div>
            <div id="teacherField">
              <label>Email</label>
              <input type="email" placeholder="abc@gmail.com"></input>
            </div>
            <div id="teacherField">
              <label>Password</label>
              <input type="password"></input>
            </div>
            <div id="teacherField">
              <label>Department</label>
              <input type="text" placeholder="Software Engineering"></input>
            </div>
            <div id="teacherField">
              <label>Designation</label>
              <input type="text" placeholder="Lecturer"></input>
            </div>
            <button>Add Teacher</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddTeacher;
