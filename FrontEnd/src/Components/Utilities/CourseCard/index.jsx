import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

function CourseCard() {
    const nav = useNavigate();
    const [images, setImages] = useState([]);
    const [course, setCourse] = useState([]);
    const [coursesWithImages, setCoursesWithImages] = useState([]);
    useEffect(() => {
        const fetchCourse = async () => {
          try {
            const res = await axios.get("http://localhost:8081/course/view");
            // Remove duplicates based on courseId
            const uniqueCourses = Array.from(new Map(res.data.map(item => [item.courseId, item])).values());
            setCourse(uniqueCourses);
            console.log("Successfully fetched", uniqueCourses);
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
    return (
        <>
              { coursesWithImages.map((courseData) => (
              <Card sx={{ width: 300 }} >
                <CardMedia
                    sx={{ height: 140 }}
                    image={`data:image/jpeg;base64,${courseData.image}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" >
                        {courseData.course_title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={()=>{nav("/createResult", { state: { course: courseData } }) }}>Create Result</Button>
                    <Button size="small" onClick={()=>{nav("/viewResult", { state: { course: courseData } }) }}>View Result</Button>
                </CardActions>

            </Card>))}
        </>
    )
}
export default CourseCard;