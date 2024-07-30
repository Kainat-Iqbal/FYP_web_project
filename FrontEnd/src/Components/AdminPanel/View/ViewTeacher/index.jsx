import * as React from "react";
import "./viewTeacher.css";
import SideBar from "../../SideBar";
import Table from "react-bootstrap/Table";
import { Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { lightBlue } from "@mui/material/colors";

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

  const [admin, setAdminId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/session", {
          withCredentials: true,
        });
        setAdminId(response.data.userId);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const [selectedHOD, setSelectedHOD] = useState(null);
  const handleCheckboxChange = async (teacherId, checked) => {
    if (checked) {
      const selectedTeacher = teacher.find((t) => t.teacherId === teacherId);
      if (selectedTeacher) {
        // setSelectedHOD(teacherId);
        try {
          const data = { adminId: admin, teacherId: teacherId };
          console.log("first",data)
          const res = await axios.post("http://localhost:8081/hod/Add", data);
          if (res.data === "success") {
            alert("HOD is added successfully");
          } else {
            console.log("Error adding HOD");
          }
          console.log("teacher Id is", teacherId);
        } catch (error) {
          console.log("error setting HOD", error);
        }
      }
    } 
  };
  
// Fetch current HOD
useEffect(() => {
  const fetchCurrentHOD = async () => {
    try {
      const res = await axios.get("http://localhost:8081/hod/Get");
      if (res.data && res.data.length > 0) {
        setSelectedHOD(res.data[0].teacherId);
        console.log("SD",res.data[0].teacherId)
      }
    } catch (error) {
      console.log("Error fetching current HOD", error);
    }
  };
  fetchCurrentHOD();
}, []);

useEffect(() => {
  console.log("Selected HOD:", selectedHOD);
}, [selectedHOD]);

 
  return (
    <div id="mainViewTeacherDiv">
      <div id="sidebar">
        <SideBar />
      </div>
      <div id="viewTeacherWithoutBar">
        <div id="viewTeacherTop">
          <div id="topheading">
            <h1>Teacher's Information</h1>
          </div>
          <div id="topMenu">
            <div id="leftM">
              <input
                type="text"
                placeholder="Search..."
                style={{ width: "70%" }}
              />
              <button style={{ height: "63%",backgroundColor:"lightBlue", color:"black",width:"18%" }}>
                <SearchIcon />
              </button>
            </div>
            <div id="right">
              {/* Sort By Dropdown */}
              <select style={{ width: "40%" }}>
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
                  Qualification
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  CNIC
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Joining Date
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Status
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Set HOD
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
                    <td>{teacherData.qualification}</td>
                    <td>{teacherData.CNIC}</td>
                    <td>{teacherData.JoiningDate}</td>
                    <td>{teacherData.status}</td>
                    <td>
                    <input
                        type="checkbox"
                        checked={selectedHOD === teacherData.teacherId}
                        onChange={(e) =>
                          handleCheckboxChange(
                            teacherData.teacherId,
                            e.target.checked
                          )
                        }
                        disabled={
                          selectedHOD !== null &&
                          selectedHOD !== teacherData.teacherId
                        }
                      />
                    </td>
                    <td>
                      <Link to={`/updateTeacher/${teacherData.teacherId}`}
                       className={
                        selectedHOD === teacherData.teacherId
                          ? "disabled-link"
                          : ""
                      }>
                        <Edit />
                      </Link>
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
