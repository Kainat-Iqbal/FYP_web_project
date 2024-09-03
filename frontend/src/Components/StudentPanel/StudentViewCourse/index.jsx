import React, { useState } from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SideBar from "../SideBar";
import SearchIcon from '@mui/icons-material/Search';
import "./studentViewCourse.css";
import StudentCourseCard from "../../Utilities/StudentCourseCard";

function StudentViewCourse() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [course, setCourses] = useState([
        {
            image: require("./c1.jfif"),
            name: "Programming Fundamentals"
        },
        {
            image: require("./c2.jfif"),
            name: "Software Engineering"
        },
        {
            image: require("./c3.jfif"),
            name: "Human Computer Interaction"
        },
        {
            image: require("./c4.jfif"),
            name: "Internet Of Things"
        },
        {
            image: require("./c5.jfif"),
            name: "Agile Software Development"
        },
        {
            image: require("./c6.jfif"),
            name: "Cloud Computing"
        }
    ])

    return (
        <>
            <div id="StudentViewCourseMainDiv">
                <SideBar />

                <div id="StudentViewCourseTopBar">
                    <div id="StudentViewCourseMainHeading">
                        <h1 style={{ color: "#00304B", fontSize: "50px" }} >
                            Courses
                        </h1>
                    </div>
                    <div id="StudentViewCourseTopMenu">

                        <div id="StudentViewCourseSearchBar">
                            <input type="text" placeholder="Search..." />
                            <button id="sbutton" style={{ height: '100%' }}
                            ><SearchIcon />
                            </button>
                        </div>

                        <div id="StudentViewCourseCenter">
                            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <Tabs value={value} onChange={handleChange} centered>
                                    <Tab label="Current" />
                                    <Tab label="All" />
                                    <Tab label="Past" />
                                </Tabs>
                            </Box>
                        </div>

                        <div id="StudentViewCourseSort">
                            <p style={{
                                marginRight: '4%',
                                fontSize: '17px',
                                marginTop: '2%'
                            }}>
                                Sort by
                            </p>
                            <select style={{
                                height: '80%',
                                width: '45%',
                                marginRight: '0%'
                            }}>
                                <option value="name"> Course Name </option>
                                <option value="lastAccessed"> Last Accessed </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div id="StudentViewCourseBottom">
                    <div id="StudentViewCourseCardDiv">
                        <div id="cardWrapper" className="StudentViewCourseCardWrapper">
                            {course.map((course) => {
                                return (
                                    <StudentCourseCard image={course.image}
                                        name={course.name} />
                                )
                            }
                            )}</div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default StudentViewCourse;