import * as React from "react";
import "./viewHOD.css";
import SideBar from "../../SideBar";
import Table from "react-bootstrap/Table";
import { Edit } from "@mui/icons-material";

function ViewHOD() {
  return (
    <div id="mainViewHODDiv">
      <div id="sidebar">
      <SideBar />
      </div>
      <div id="viewHODWithoutBar">
      <div id="viewHODTop">
        <div id="topheading">
          <h1>
           HOD Information
          </h1>
        </div>
       
        </div>
    
      

      <div id="viewHODBottom">
        <Table striped bordered hover id="viewHODTable">
          <thead>
            <tr>
              <th style={{ backgroundColor: "#00304B", color: "white" }}>
                ID
              </th>
              <th style={{ backgroundColor: "#00304B", color: "white" }}>
                Name
              </th>
              <th style={{ backgroundColor: "#00304B", color: "white" }}>
                Email
              </th>
              <th style={{ backgroundColor: "#00304B", color: "white" }}>
                Department
              </th>
              <th style={{ backgroundColor: "#00304B", color: "white" }}>
                Designation
              </th>
              <th style={{ backgroundColor: "#00304B", color: "white" }}>
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Sadia</td>
              <td>sana@gmail.com</td>
              <td>Computer Sceince</td>
              <td>Head Of Department</td>
              <td>
                <a href="#">
                  <Edit />
                </a>
              </td>
            </tr>
            </tbody>
        </Table>
      </div>
    </div>
    </div>

  );
}
export default ViewHOD;
