import * as React from "react";
import "./viewHOD.css";
import SideBar from "../../SideBar";
import Table from "react-bootstrap/Table";
import { Edit } from "@mui/icons-material";

function ViewHOD() {
  return (
    <div id="mainViewHODDiv">
      <SideBar />
      <div id="viewHODWithoutBar">
        <div id="viewHODTop">
          <div id="totalHOD">
            <h5>Total HODs</h5>
            <h1>32</h1>
          </div>

          <div id="totalAsisProf">
            <h5>Total Assistant Professors</h5>
            <h1>10</h1>
          </div>

          <div id="totalProf">
            <h5>Total Professors</h5>
            <h1>02</h1>
          </div>

          <div id="totalLecturer">
            <h5>Total Lecturers</h5>
            <h1>20</h1>
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
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>
                  <a href="#">
                    <Edit />
                  </a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>
                  <a href="#">
                    <Edit />
                  </a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>
                  <a href="#">
                    <Edit />
                  </a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>
                  <a href="#">
                    <Edit />
                  </a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>
                  <a href="#">
                    <Edit />
                  </a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>
                  <a href="#">
                    <Edit />
                  </a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>
                  <a href="#">
                    <Edit />
                  </a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>
                  <a href="#">
                    <Edit />
                  </a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>
                  <a href="#">
                    <Edit />
                  </a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>
                  <a href="#">
                    <Edit />
                  </a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>
                  <a href="#">
                    <Edit />
                  </a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
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
