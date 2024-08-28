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
        
        <div id="courseBottom">
        <div id="courseTop">
        <h1>A<span className="smaller-text">DD</span> C<span className="smaller-text">OURSE</span></h1>
        </div>

          <form id="courseForm" action="" onSubmit={handleSubmit}>
            <div id="courseField">
              <label>Course Code</label>
              <input
              id="courseinp"
                name="code"
                type="text"
                placeholder="CSS 1032"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              ></input>
            </div>

            <div id="courseField">
              <label>Course Title</label>
              <input
             id="courseinp"
                name="title"
                type="text"
                placeholder="Programming Fundamental"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              ></input>
            </div>

            <div id="courseField">
              <label>Course Type</label>
              <select className="DROPDOWN"
               id="courseinp"
                name="type"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              >
                <option value="Compulsory">Compulsory</option>
                <option value="Elective">Elective</option>
              </select>
            </div>

            <div id="courseField">
              <label>Theory Credit Hr</label>

              <select
               id="courseinp"
                name="thHours"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
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
               id="courseinp"
                name="labHours"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
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
               id="courseinp"
                name="totalMid"
                type="number"
                min={0}
                placeholder="20"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              ></input>
            </div>

            <div id="courseField">
              <label>Passing Mid Marks</label>
              <input
               id="courseinp"
                name="passingMid"
                min={0}
                type="number"
                placeholder="12"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              ></input>
            </div>

            <div id="courseField">
              <label>Total Terminal Marks</label>
              <input
               id="courseinp"
                name="totalTerminal"
                type="number"
                min={0}
                placeholder="40"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              ></input>
            </div>

            <div id="courseField">
              <label>Passing Terminal Marks</label>
              <input
               id="courseinp"
                name="passingTerminal"
                min={0}
                type="number"
                placeholder="24"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              ></input>
            </div>

            <div id="courseField">
              <label>Total Sessional Marks</label>
              <input
               id="courseinp"
                name="totalSessional"
                min={0}
                type="number"
                placeholder="10"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              ></input>
            </div>

            <div id="courseField">
              <label>Passing Sessional Marks</label>
              <input
               id="courseinp"
                name="passingSessional"
                min={0}
                type="number"
                placeholder="6"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              ></input>
            </div>

            <div id="courseField">
              <label>Total Lab Marks</label>
              <input
               id="courseinp"
                name="totalLab"
                type="number"
                min={0}
                placeholder="30"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              ></input>
            </div>

            <div id="courseField">
              <label>Passing Lab Marks</label>
              <input
               id="courseinp"
                name="passingLab"
                min={0}
                type="number"
                placeholder="18"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              ></input>
            </div>

            <div id="courseField">
              <label>Total Marks</label>
              <input
               id="courseinp"
                name="totalMarks"
                min={0}
                type="number"
                placeholder="100"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
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
