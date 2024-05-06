import * as React from "react";
import "./viewTeacher.css";
import SideBar from "../../SideBar";
import Table from "react-bootstrap/Table";
import { Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewTeacher() {
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("http://localhost:8081/teacher/View");
        setTeacher(res.data);
        console.log("Successfuly fetched", res.data);
        // console.log("first",setTeacher)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div id="mainViewTeacherDiv">
      <SideBar />
      <div id="viewTeacherWithoutBar">
        <div id="viewTeacherTop">
          <div id="totalTeacher">
            <h5>Total Teachers</h5>
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

        <div id="viewTeacherBottom">
          <Table striped bordered hover id="viewTeacherTable">
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
              {teacher.map((teacherData) => {
                return (
                  <tr key={teacherData.id}>
                    <td>{teacherData.teacherId}</td>
                    <td>{teacherData.name}</td>
                    <td>{teacherData.email}</td>
                    <td>{teacherData.department}</td>
                    <td>{teacherData.designation}</td>
                    <td>
                      <a href="#">
                        <Edit />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
export default ViewTeacher;
