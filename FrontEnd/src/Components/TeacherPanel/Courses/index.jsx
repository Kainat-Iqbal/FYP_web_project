import React, { useState,useEffect } from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SideBar from "../Sidebar";
import SearchIcon from '@mui/icons-material/Search';
import "./courseStyle.css";
import CourseCard from "../../Utilities/CourseCard";
import axios from "axios";

function Courses() {
    const [value, setValue] = React.useState(0);
    const [images, setImages] = useState([]);
    const [course, setCourse] = useState([]);
    const [coursesWithImages, setCoursesWithImages] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    useEffect(() => {
      const fetchCourse = async () => {
        try {
          const res = await axios.get("http://localhost:8081/course/view");
          setCourse(res.data);
           console.log("Successfuly fetched", res.data);
        } catch (error) {
          console.log("error", error);
          
        }
      };
      const fetchImages = async () => {
        try {
            const res = await axios.get("http://localhost:8081/images/api");
            setImages(res.data);
            console.log("Successfully fetched images", res.data);
        } catch (error) {
            console.log("Error fetching images", error);
        }
    };
    
    fetchCourse();
    fetchImages();
    }, []);
    useEffect(() => {
        if (course.length && images.length) {
            // Ensure that we have enough images for the courses
            const assignedCourses = course.map((course, index) => ({
                ...course,
                image: images[index % images.length]?.image
            }));
            setCoursesWithImages(assignedCourses);
        }
    }, [course, images]);
    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex]?.image;
    };
     /*
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
 */
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
                        {coursesWithImages.map((courseData) => (
                                <CourseCard
                                    key={courseData.courseId}
                                    image={courseData.image}
                                    name={courseData.course_title}
                                />
                            ))}</div>
                            
                    </div>
                </div>
            </div >
        </>
    )
}

export default Courses;