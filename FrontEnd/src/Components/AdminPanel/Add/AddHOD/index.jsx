import * as React from "react";
import "./HOD.css";
import SideBar from "../../SideBar";

function AddHOD() {
  return (
    <div id="mainAddHODDiv">
      <SideBar />
      <div id="HODWithoutBar">
        <div id="HODTop">
          <h1>Add HOD</h1>
        </div>

        <div id="HODBottom">
          <form id="HODForm">
            <div id="HODField">
              <label>Name</label>
              <input type="text" placeholder="Sara Ahmed"></input>
            </div>
            <div id="HODField">
              <label>Email</label>
              <input type="email" placeholder="abc@gmail.com"></input>
            </div>
            <div id="HODField">
              <label>Password</label>
              <input type="password"></input>
            </div>
            <div id="HODField">
              <label>Department</label>
              <input type="text" placeholder="Software Engineering"></input>
            </div>
            <div id="HODField">
              <label>Designation</label>
              <input type="text" placeholder="Head of Department"></input>
            </div>
            <button>Add HOD</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddHOD;
