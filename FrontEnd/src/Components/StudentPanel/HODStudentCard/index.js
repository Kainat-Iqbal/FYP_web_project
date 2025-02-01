import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "chart.js/auto";
import "./StudentCard.css";

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SearchIcon from '@mui/icons-material/Search';
import SideBar from "../../HODPanel/SideBar";

const HODStudentCard = () => {
  const [value, setValue] = React.useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(""); // Manage sorting criteria
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };


  const [students, setStudents] = useState([]);
  const navigate = useNavigate(); // Create navigate function

  // Fetch student data from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/student/ViewPieChart"
        ); // Replace with your API endpoint
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleCardClick = (studentId) => {
    navigate(`/StudentDetailInsights/${studentId}`); // Navigate to the student details page
  };
  // Filter and sort students
  const filteredAndSortedStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "CGPA") {
        return b.CGPA - a.CGPA;
      }
      else if (sortBy === "batch") {
        return a.year.localeCompare(b.year); // Compare batch years as strings
      }
      return 0; // No sorting
    });

  return (
    <div id="mainStudentCardDiv">
      <div id="studentCardSideBar">
        <SideBar/>
      </div>
      <div id="topC">
        <div id="topheading">
          <h1>Student's Insights</h1>
        </div>
        <div id="topMenu">
          <div id="leftM">
            <input id="sinput" type="text" placeholder="Search..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              />
            <button id="searchbutton" style={{ height: "63%" }}>
              <SearchIcon />
            </button>
          </div>
          <div id="centerM">
          </div>
          <div id="right">
            {/* Sort By Dropdown */}
            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
              <option value="name">Sort by Name</option>
              <option value="CGPA">Sort by CGPA</option>
              <option value="batch">Sort by Batch</option>
            </select>
          </div>
        </div>
      </div>

      <div className="student-cards-container">
      {filteredAndSortedStudents.length > 0 ? (
          filteredAndSortedStudents.map((student) => (
            <div
              key={student.studentId}
              className="student-card"
              onClick={() => handleCardClick(student.studentId)} // Navigate when card is clicked
            >
              <h3>{student.name}</h3>
              <p style={{ color: "black" }}>
                <strong>Batch:</strong> {student.year}
              </p>
              <p style={{ color: "black" }}>
                <strong>CGPA:</strong> {student.CGPA.toFixed(2)}
              </p>

              <div className="chart-container">
                <Pie
                  data={{
                    labels: ["Pass", "Fail"],
                    datasets: [
                      {
                        label: "Pass/Fail Ratio",
                        data: [student.passCount, student.failCount],
                        backgroundColor: ["#4CAF50", "#F44336"],
                        hoverBackgroundColor: ["#45A049", "#E53935"],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  }}
                  height={200}
                  width={200}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Loading students...</p>
        )}
      </div>
    </div>
  );
};

export default HODStudentCard;
