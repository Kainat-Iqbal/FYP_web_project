import * as React from "react";
import "./viewStudent.css";
import SideBar from "../../SideBar";
import Table from "react-bootstrap/Table";
import { Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

function ViewStudent() {
  const [student, setStudent] = useState([]);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:8081/student/View");
        setStudent(res.data);
        console.log("Successfuly fetched", res.data);
        // console.log("first",setStudent)
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchStudents();
  }, []);
 
  return (
    <div id="mainViewStudentDiv">
      <div id="sidebar">
        <SideBar />
      </div>
      <div id="viewStudentWithoutBar">
        <div id="viewStudentTop">
          <div id="viewStudentTopheading">
            <h1>Student's Information</h1>
          </div>
          <div id="viewStudentTopMenu">
            <div id="viewStudentLeftM">
              <input
                type="text"
                placeholder="Search..."
                style={{ width: "70%" }}
              />
              <button id="btnsearch" style={{ height: "63%",backgroundColor:"lightBlue", color:"black",width:"18%"  }}>
                <SearchIcon />
              </button>
            </div>
            <div id="viewStudentRight">
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

        <div id="viewStudentBottom">
          <table id="viewStudentTable">
            <thead>
              <tr>
                <th>S#</th>
                <th  >
                  Name
                </th>
                <th  >
                  Father Name
                </th>
                <th  >
                  Email
                </th>
                <th  >
                 CNIC
                </th>
                <th  >
                  Enrollment
                </th>
                <th  >
                  Seat Number
                </th>
                <th  >
                 Phone Number
                </th>
                <th  >
                  Date of admission
                </th>
                <th  >
                  Matric Percentage
                </th>
                <th  >
                  Inter Percentage
                </th>
                <th  >
                  Position
                </th>
                <th  >
                  Status
                </th>
                <th  >
                  Degree Awarded
                </th>
                <th  >
                 Transcript Issued
                </th>
                <th  >
                  Edit
                </th>

              </tr>
            </thead>

            <tbody>
              {student.map((studentData,index) => {
                return (
                  <tr key={studentData.id}>
                    <td>{index+1}</td>
                    <td>{studentData.name}</td>
                    <td>{studentData.fatherName}</td>
                    <td>{studentData.email}</td>
                    <td>{studentData.CNIC}</td>
                    <td>{studentData.th_credit_hr}</td>
                    <td>{studentData.lab_credit_hr}</td>
                    <td>{studentData.max_mid_marks}</td>
                    <td>{studentData.min_mid_marks}</td>
                    <td>{studentData.max_th_marks}</td>
                    <td>{studentData.min_th_marks}</td>
                    <td>{studentData.max_sessional}</td>
                    <td>{studentData.min_sessional}</td>
                    <td>{studentData.max_lab}</td>
                    <td>{studentData.min_lab}</td>
                    <td>
                      <Link to={`/updateStudent/${studentData.studentId}`}>
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
export default ViewStudent;
