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
          console.log("first", data)
          const res = await axios.post("http://localhost:8081/hod/Add", data);
          if (res.data === "success") {
            alert("HOD is added successfully");
            window.location.reload(); // Refresh the page
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
          console.log("SD", res.data[0].teacherId)
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
      <div id="viewTeacherSidebar">
        <SideBar />
      </div>
      <div id="viewTeacherWithoutBar">
        <div id="viewTeacherTop">
          <div id="viewTeacherTopheading">
            <h1>Teacher's Information</h1>
          </div>
          <div id="viewTeacherTopMenu">
            <div id="viewTeacherLeftM">
              <input
                type="text"
                placeholder="Search..."
                style={{ width: "70%" }}
              />
              <button id="btnsearch" style={{ height: "63%", color: "black", width: "18%" }}>
                <SearchIcon />
              </button>
            </div>
            <div id="viewTeacherRight">
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
          <table id="viewTeacherTable">
            <thead>
              <tr>
                <th>S#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th >
                  Qualification
                </th>
                <th  >
                  CNIC
                </th>
                <th >
                  Joining Date
                </th>
                <th >
                  Status
                </th>
                <th  >
                  Set HOD
                </th>
                <th >
                  Edit
                </th>
              </tr>
            </thead>

            <tbody>
              {teacher.map((teacherData, index) => {
                return (
                  <tr key={teacherData.id}>
                    <td>{index + 1}</td>
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
                        id="chk"
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
          </table>
        </div>
      </div>
    </div>
  );
}
export default ViewTeacher;
