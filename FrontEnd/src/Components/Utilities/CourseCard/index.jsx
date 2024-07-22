import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from "react-router-dom";
import defaultImage from "./SQE.jpg"
function CourseCard({ image, name }) {
    const nav = useNavigate();
    
    return (
        <>
              {<Card sx={{ width: 300 }} >
                <CardMedia
                    sx={{ height: 140 }}
                    image={`data:image/jpeg;base64,${image}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" >
                        {name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={()=>{nav("/createResult")}}>Create Result</Button>
                    <Button size="small" onClick={()=>{nav("/viewResult")}}>View Result</Button>
                </CardActions>

            </Card>}
        </>
    )
}
export default CourseCard;