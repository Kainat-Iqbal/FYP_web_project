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
          <div id="viewCourseTopheading">
            <h1>Course's Information</h1>
          </div>
          <div id="viewCourseTopMenu">
            <div id="viewCourseLeftM">
              <input
                type="text"
                placeholder="Search..."
                style={{width: "70%" }}
              />
              <button id="btnsearch" style={{ height: "63%",backgroundColor:"lightBlue", color:"black",width:"18%"  }}>
                <SearchIcon />
              </button>
            </div>
            <div id="viewCourseRight">
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
          <table id="viewCourseTable">
            <thead>
              <tr>
                <th  >
                S#
                </th>
                <th  >
                  Course Code
                </th>
                <th  >
                  Course Title
                </th>
                <th  >
                  Course Type
                </th>
                <th  >
                  TH-credit-Hr
                </th>
                <th  >
                  Lab-credit-Hr
                </th>
                <th  >
                  Total Mid Marks
                </th>
                <th  >
                  Passing Mid Marks
                </th>
                <th  >
                  Total Theory Marks
                </th>
                <th  >
                  Passing Theory Marks
                </th>
                <th  >
                  Total Sessional Marks
                </th>
                <th  >
                  Passing Sessional Marks
                </th>
                <th  >
                  Total Lab Marks
                </th>
                <th  >
                  Passing Lab Marks
                </th>
                <th  >
                  Total Marks
                </th>
                <th  >
                  Edit
                </th>

              </tr>
            </thead>

            <tbody>
              {course.map((courseData,index) => {
                return (
                  <tr key={courseData.id}>
                    <td>{index+1}</td>
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
          </table>
        </div>
      </div>
    </div>
  );
}
export default ViewCourse;
