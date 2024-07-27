import * as React from "react";
import "./HOD.css";
import SideBar from "../../SideBar";

function AddHOD() {
  return (
    <div id="mainAddHODDiv">
      <SideBar />
      <div id="HODWithoutBar">
        <div id="HODTop">
          <h1>Set HOD</h1>
        </div>

        <div id="HODBottom">
          <form id="HODForm" action="" >
            <div id="HODField">
              <label>Name</label>
              <input
                name="name"
                type="text"
                placeholder="Sara Ahmed"
                //onChange={handleInput}
              ></input>
            </div>

            <div id="HODField">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                //onChange={handleInput}
              ></input>
            </div>

            <div id="HODField">
              <label>Password</label>
              <input
                name="password"
                type="text"
                //onChange={handleInput}
                value={"User123*"}
              ></input>
            </div>

            <div id="HODField">
              <label>Department</label>

              <select
                name="department"
                //onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="Computer Science">Computer Science</option>
              </select>
            </div>

            <div id="HODField">
              <label>Designation</label>
              <select
                name="designation"
                //onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Lecturer">Lecturer</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Professor">Professor</option>
              </select>
            </div>
            
            <div id="HODField">
              <label>CNIC</label>
              <input
                name="cnic"
                type="text"
                placeholder="42204-3452276-3"
                //onChange={handleInput}
              ></input>
            </div>

            <div id="HODField">
              <label>Qualification</label>

              <select
                name="qualification"
                //onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div id="HODField">
              <label>Status</label>
              <select
                name="status"
                //onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Active">Active</option>
                <option value="Leave">Leave</option>
              </select>
            </div>
            <div id="HODField">
              <label>Date of Joining</label>
              <input
                style={{ width: "14.8vw", height: "4.5vh" }}
                name="joiningDate"
                type="date"
                //onChange={handleInput}
              ></input>
            </div>

            <button>Set HOD</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddHOD;
