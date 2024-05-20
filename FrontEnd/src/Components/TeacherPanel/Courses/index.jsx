import React, { useState } from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SideBar from "../Sidebar";
import SearchIcon from '@mui/icons-material/Search';
import "./courseStyle.css";
import CourseCard from "../../Utilities/CourseCard";

function Courses() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [course, setCourses] = useState([
        {
            image: require("./SQE.jpg"),
            name: "Software Engineering"
        },
        {
            image: require("./SQE.jpg"),
            name: "Software Engineering"
        },
        {
            image: require("./SQE.jpg"),
            name: "Software Engineering"
        },
        {
            image: require("./SQE.jpg"),
            name: "Software Engineering"
        }, {
            image: require("./SQE.jpg"),
            name: "Software Engineering"
        },
        {
            image: require("./SQE.jpg"),
            name: "Software Engineering"
        }, {
            image: require("./SQE.jpg"),
            name: "Software Engineering"
        },
        {
            image: require("./SQE.jpg"),
            name: "Software Engineering"
        }
    ])

    return (
        <>
            <div id="mainC">
                <div id="sidebarD">
                    <SideBar />
                </div>
                <div id="topC">
                    <div id="topheading">
                        <h1>
                            Courses
                        </h1>
                    </div>
                    <div id="topMenu">
                        <div id="leftM">
                            <input type="text" placeholder="Search..." />
                            <button style={{ height: '63%' }}
                            ><SearchIcon />
                            </button>
                        </div>
                        <div id="centerM">
                            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <Tabs value={value} onChange={handleChange} centered>
                                    <Tab label="All" />
                                    <Tab label="Current" />
                                    <Tab label="Past" />
                                </Tabs>
                            </Box>
                        </div>
                        <div id="right">
                            {/* Sort By Dropdown */}
                            <select>
                                <option value="name">Sort by Name</option>
                                <option value="lastAccessed">Sort by Last Accessed</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div id="bottomC">
                    <div id="carddiv">
                        <div id="cardWrapper" className="card-wrapper">
                            {course.map((course) => {
                                return (
                                    <CourseCard image={course.image}
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

export default Courses;