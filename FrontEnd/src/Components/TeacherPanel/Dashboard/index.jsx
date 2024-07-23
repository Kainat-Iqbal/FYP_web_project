import * as React from "react"
import "./TeacherStyle.css";
import SideBar from "../Sidebar";
import { useState } from "react";
import CourseCard from "../../Utilities/CourseCard";

function Dashboard() {
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
                            <h2 style={{ marginTop: "4%" }}>Ms.Faiza</h2>
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