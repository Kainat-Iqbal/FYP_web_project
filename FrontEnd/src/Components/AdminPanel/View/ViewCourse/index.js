import * as React from "react";
import "./viewCourse.css";
import SideBar from "../../SideBar";
import Table from "react-bootstrap/Table";
import { Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

function ViewCourse() {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8081/course/View");
        setCourse(res.data);
        console.log("Successfuly fetched", res.data);
        // console.log("first",setCourse)
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchCourses();
  }, []);
 
  return (
    <div id="mainViewCourseDiv">
      <div id="sidebar">
        <SideBar />
      </div>
      <div id="viewCourseWithoutBar">
        <div id="viewCourseTop">
          <div id="topheading">
            <h1>Course's Information</h1>
          </div>
          <div id="topMenu">
            <div id="leftM">
              <input
                type="text"
                placeholder="Search..."
                style={{width: "70%" }}
              />
              <button style={{ height: "63%",backgroundColor:"lightBlue", color:"black",width:"18%"  }}>
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

        <div id="viewCourseBottom">
          <Table striped bordered hover id="viewCourseTable">
            <thead>
              <tr>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  ID
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Course Code
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Course Title
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Course Type
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  TH-credit-Hr
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Lab-credit-Hr
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Total Mid Marks
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Passing Mid Marks
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Total Theory Marks
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Passing Theory Marks
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Total Sessional Marks
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Passing Sessional Marks
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Total Lab Marks
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Passing Lab Marks
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Total Marks
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Edit
                </th>

              </tr>
            </thead>

            <tbody>
              {course.map((courseData) => {
                return (
                  <tr key={courseData.id}>
                    <td>{courseData.courseId}</td>
                    <td>{courseData.course_code}</td>
                    <td>{courseData.course_title}</td>
                    <td>{courseData.course_type}</td>
                    <td>{courseData.th_credit_hr}</td>
                    <td>{courseData.lab_credit_hr}</td>
                    <td>{courseData.max_mid_marks}</td>
                    <td>{courseData.min_mid_marks}</td>
                    <td>{courseData.max_th_marks}</td>
                    <td>{courseData.min_th_marks}</td>
                    <td>{courseData.max_sessional}</td>
                    <td>{courseData.min_sessional}</td>
                    <td>{courseData.max_lab}</td>
                    <td>{courseData.min_lab}</td>
                    <td>{courseData.total_marks}</td>
                    <td>
                      <Link to={`/updateCourse/${courseData.courseId}`}>
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
export default ViewCourse;
