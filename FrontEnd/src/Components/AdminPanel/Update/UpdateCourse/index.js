import * as React from "react";
import "./updateCourse.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UpdateCourse() {
    const {id} = useParams();
    const nav = useNavigate();

    // State variables to hold the input values
const [DATA, setData] = useState({
    course_code: "",
    course_title: "",
    course_type: "",
    th_credit_hr: "",
    lab_credit_hr: "",
    max_mid_marks: "",
    min_mid_marks:"",
    max_th_marks: "",
    min_th_marks: "",
    max_sessional:"",
    min_sessional:"",
    max_lab: "",
    min_lab:"",
    total_marks:"",
  });
  
  // Function to handle changes in input field
  const handleInput = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  console.log(DATA)
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.put("http://localhost:8081/course/Update/"+id,DATA)
    .then(res =>{
      if(res.data.updated){
        alert("Course Updated Succesfully")
        nav("/viewCourse");
      }
      else console.log("Wrongggg")
    })
    }
    
    useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8081/course/Edit/"+id);
        setData(res.data[0]);
        console.log("Successfuly fetched", res.data[0]);
        // console.log("first",setTeacher)
      } catch (error) {
        console.log("error", error);
      }
    };
    
    fetchCourses();
    }, []);
    
  return (
    <div id="mainAddCourseDiv">
      <SideBar />
      <div id="courseWithoutBar">
        

        <div id="courseBottom">
        <div id="courseTop">
        <h1>U<span className="smaller-text">PDATE</span> C<span className="smaller-text">OURSE</span></h1>
        </div>

          <form id="courseForm" action="" onSubmit={handleSubmit}>
            <div id="courseField">
              <label>Course Code</label>
              <input
              id="courseinp"
                name="course_code"
                type="text"
                value={DATA.course_code}
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Course Title</label>
              <input
               id="courseinp"
                name="course_title"
                type="text"
                value={DATA.course_title}
                placeholder="Programming Fundamental"
                onChange={handleInput}
              ></input>
            </div>

            <div id="courseField">
              <label>Course Type</label>
              <select className="DROPDOWN"
                 id="courseinp"
                name="course_type"
                value={DATA.course_type}
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
                name="th_credit_hr"
                onChange={handleInput}
                value={DATA.th_credit_hr}
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
                name="lab_credit_hr"
                value={DATA.lab_credit_hr}
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
                name="max_mid_marks"
                value={DATA.max_mid_marks}
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
                name="min_mid_marks"
                min={0}
                value={DATA.min_mid_marks}
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
                name="max_th_marks"
                type="number"
                value={DATA.max_th_marks}
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
                name="min_th_marks"
                min={0}
                value={DATA.min_th_marks}
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
                name="max_sessional"
                min={0}
                value={DATA.max_sessional}
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
                name="min_sessional"
                value={DATA.min_sessional}
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
                name="max_lab"
                type="number"
                value={DATA.max_lab}
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
                name="min_lab"
                min={0}
                value={DATA.min_lab}
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
                name="total_marks"
                value={DATA.total_marks}
                min={0}
                type="number"
                placeholder="100"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "5.8vh" }}
              ></input>
            </div>

            <button>Update Course</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateCourse;
