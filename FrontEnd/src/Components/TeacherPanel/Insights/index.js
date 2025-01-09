import React, { useState,useEffect } from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SideBar from "../Sidebar";
import SearchIcon from '@mui/icons-material/Search';
import "./insightStyle.css";
import CourseCard from "../../Utilities/CourseCard";
import InsightsCard from "../../Utilities/InsightsCard";

function Insights() {
    const [value, setValue] = React.useState(0);
    
    const [filter, setFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("RecentlyAssigned");
    const [searchQuery, setSearchQuery] = useState(""); // State for search input

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) setFilter("all");
        if (newValue === 1) setFilter("current");
        if (newValue === 2) setFilter("past");
    };
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); // Update search query on input
    };
    
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
                        <input id="sinput" type="text" placeholder="Search..."  value={searchQuery}
                                onChange={handleSearchChange}/>
                            <button id="searchbutton" style={{ height: '63%' }}
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
                            <select onChange={handleSortChange} value={sortOrder}>
                                <option value="name">Sort by Name</option>
                                <option value="RecentlyAssigned">Sort by Recently Assigned</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div id="bottomC">
                
                    <div id="carddiv">
                        <div id="cardWrapper" className="card-wrapper">
                            <InsightsCard filter={filter} order={sortOrder} searchQuery={searchQuery}/>
                        {/* {coursesWithImages.map((courseData) => (
                                <CourseCard
                                    key={courseData.courseId}
                                    image={courseData.image}
                                    name={courseData.course_title}
                                />
                            ))} */}</div>
                            
                    </div>
                </div>
            </div >
        </>
    )
}

export default Insights;