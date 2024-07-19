import * as React from "react";
import "./addCourse.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Title } from "@mui/icons-material";

function AddCourse() {
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

   console.log("FVFV ", admin);
  // State variables to hold the input values
  const [values, setValues] = useState({
    code: "",
    title: "",
    type: "Compulsary",
    thHours: 0,
    labHours: 0,
    totalMid: "",
    passingMid:"",
    totalTerminal: "",
    passingTerminal: "",
    totalSessional:"",
    passingSessional:"",
    totalLab: "",
    passingLab:"",
    totalMarks:"",
  });
  useEffect(() => {
    // Update values after admin is set
    if (admin !== null) {
      setValues((prev) => ({
        ...prev,
        adminId: admin,
      }));
    }
  }, [admin]);
  
  // Function to handle changes in input field
  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
console.log(values)
  const handleSubmit = async (event) => {
    event.preventDefault();
      console.log("nhmbkjbhkbhjuu",values)
      axios.post("http://localhost:8081/course/Add", values).then((res) => {
        console.log("val",values);
        if (res.data === "success") {
          alert("Course is added successfully");
          window.location.reload(); // Refresh the page
        } else {
          console.log("error");
        }
      });
  };

  return (
    <div id="mainAddCourseDiv">
      <SideBar />
      <div id="courseWithoutBar">
        <div id="courseTop">
          <h1>Add Course</h1>
        </div>

        <div id="courseBottom">
          <form id="courseForm" action="" onSubmit={handleSubmit}>
            <div id="courseField">
              <label>Course Code</label>
              <input
                name="code"
                type="text"
                placeholder="CSS 1032"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Course Title</label>
              <input
                name="title"
                type="text"
                placeholder="Programming Fundamental"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Course Type</label>
              <select className="DROPDOWN"
                name="type"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Compulsory">Compulsory</option>
                <option value="Elective">Elective</option>
              </select>
            </div>

            <div id="courseField">
              <label>Theory Credit Hr</label>

              <select
                name="thHours"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div id="courseField">
              <label>Lab Credit Hr</label>

              <select
                name="labHours"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div id="courseField">
              <label>Total Mid Marks</label>
              <input
                name="totalMid"
                type="number"
                min={0}
                placeholder="20"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Passing Mid Marks</label>
              <input
                name="passingMid"
                min={0}
                type="number"
                placeholder="12"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Total Terminal Marks</label>
              <input
                name="totalTerminal"
                type="number"
                min={0}
                placeholder="40"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Passing Terminal Marks</label>
              <input
                name="passingTerminal"
                min={0}
                type="number"
                placeholder="24"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Total Sessional Marks</label>
              <input
                name="totalSessional"
                min={0}
                type="number"
                placeholder="10"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Passing Sessional Marks</label>
              <input
                name="passingSessional"
                min={0}
                type="number"
                placeholder="6"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Total Lab Marks</label>
              <input
                name="totalLab"
                type="number"
                min={0}
                placeholder="30"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Passing Lab Marks</label>
              <input
                name="passingLab"
                min={0}
                type="number"
                placeholder="18"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Total Marks</label>
              <input
                name="totalMarks"
                min={0}
                type="number"
                placeholder="100"
                onChange={handleInput}
              ></input>
            </div>

            <button>Add Course</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddCourse;
