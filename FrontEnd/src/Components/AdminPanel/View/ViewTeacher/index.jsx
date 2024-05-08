import * as React from "react";
import "./viewTeacher.css";
import SideBar from "../../SideBar";
import Table from "react-bootstrap/Table";
import { Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

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
      <div id="sidebar">
        <SideBar />
      </div>
      <div id="viewTeacherWithoutBar">
        <div id="viewTeacherTop">
        <div id="topheading">
            <h1>
              Teacher's Information
            </h1>
          </div>
          <div id="topMenu">
            <div id="leftM">
              <input type="text" placeholder="Search..." style={{ width: '80%' }} />
              <button style={{ height: '63%' }}
              ><SearchIcon />
              </button>
            </div>
            <div id="right">
              {/* Sort By Dropdown */}
              <select style={{ width: '40%' }}>
                <option value="id">Sort by ID</option>
                <option value="name">Sort by Name</option>
                <option value="email">Sort by Email</option>
                <option value="deaprtment">Department</option>
                <option value="designation">Designation</option>
              </select>
            </div>
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
