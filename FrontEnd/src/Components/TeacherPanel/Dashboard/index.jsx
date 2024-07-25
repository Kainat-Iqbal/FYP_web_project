import * as React from "react"
import "./TeacherStyle.css";
import SideBar from "../Sidebar";
import { useState, useEffect } from "react";
import CourseCard from "../../Utilities/CourseCard";
import axios from 'axios';

function Dashboard() {

    const [teacherEmail, setTeacherEmail] = useState(null);
    const [teacherId, setTeacherId] = useState(null);
    const [teacherName, setTeacherName] = useState(null);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8081/session", {
            withCredentials: true,
          });
          setTeacherEmail(response.data.user);
          setTeacherId(response.data.userId);
          setTeacherName(response.data.userName);
         
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchData();
    }, []);

    return (
        <>
            <div id="mainD">
                <div id="topD">
                    <SideBar />
                </div>
                <div id="bottomD">
                    <div id="teacherD">
                        <div id="imgT">
                            <img src={require("./profilepic.jpg")}
                                style={{ height: "90%", width: "90%", borderRadius: "50%" }} />
                        </div>
                        <div id="Tinfo">
                            <h2 style={{ marginTop: "4%" }}>Ms.{teacherName}</h2>
                            <h4 style={{ marginTop: "-4%" }}>Lecturer</h4>
                            <h5 style={{ marginTop: "-4%" }}>Jinnah University For Women</h5>
                        </div>
                    </div>
                    <div id="carddiv">
                        <div id="cardWrapper" className="card-wrapper">
                            <CourseCard/>
                            </div>
                    </div>

                </div>
            </div>
        </>

    );
}
export default Dashboard;