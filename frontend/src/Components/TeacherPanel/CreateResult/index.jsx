import React, { useState } from 'react';
import SideBar from "../Sidebar";
import './createResult.css';
import StudentTable from "../../Utilities/StudentTable";
import { useLocation } from "react-router-dom";

function CreateResult() {
    const location = useLocation();
    const courseData = location.state?.course;

    const [dateOfExamination, setDateOfExamination] = useState('');
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        // Perform any validation if needed
        setDateOfExamination(selectedDate);
    };
    console.log("date,,,",dateOfExamination)
    // Assuming batchId is available in courseData
    const batchId = courseData?.batchId;

    return (
        <>
            <div id="mainCR">
                <div id="sidebarCR">
                    <SideBar />
                </div>
                <div id="topCR">
                    <div id="tophead">
                        <h1>Result Creation</h1>
                    </div>

                    <div id="resultinfo">
                        <div id="info1">
                            <div id="facultyCourse">
                                <b style={{marginTop:"2%"}}>Faculty<span style={{ marginLeft: "16%", borderBottom: '1px solid black', width: '60%', display: 'inline-block',fontWeight:'normal'}}>Sceince</span></b>
                                <b>Course No.<span style={{ marginLeft: "7%", borderBottom: '1px solid black', width: '60%', display: 'inline-block',fontWeight:'normal'}}>{courseData?.course_code}</span></b>
                            
                            <div id="classBatch">
                                <b>Class<span style={{ marginLeft: "68px", borderBottom: '1px solid black', width: '66px', display: 'inline-block', fontWeight:'normal'}}>{courseData?.type}({courseData?.degree})</span></b>
                                <b style={{ marginLeft: "1%" }}>Batch<span style={{ marginLeft: "8px", borderBottom: '1px solid black', width: '66px', display: 'inline-block',fontWeight:'normal' }}>{courseData?.year}</span></b>
                            </div>
                            </div>
                        </div>
                        <div id="info2">
                            <b>Department<span style={{ marginLeft: "14%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight:'normal'}}>Computer Sceince and Software Engineering</span></b>
                            <b>Course Title<span style={{ marginLeft: "13.8%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight:'normal'}}>{courseData?.course_title}</span></b>
                            <b>Date Of Examination<span style={{ marginLeft: "2%", borderBottom: '1px solid black', width: '65%', display: 'inline-block',fontWeight:'normal'}}><input type="date" value={dateOfExamination} onChange={handleDateChange} style={{ width: '100%' }} /></span></b>
                        </div>
                        <div id="info3">
                        <b>Acd. Year<span style={{ marginLeft: "8%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight:'normal'}}>{courseData?.academic_year}</span></b>
                        <b>Credit Hrs<span style={{ marginLeft: "4.5%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight:'normal'}}>{courseData?.th_credit_hr}+{courseData?.lab_credit_hr}</span></b>
                        <b>Semester<span style={{ marginLeft: "12%", borderBottom: '1px solid black', width: '30%', display: 'inline-block',fontWeight:'normal'}}>{courseData?.semester}</span></b>
                        
                        </div>
                    </div>
                    <StudentTable batchId={batchId} courseCode={courseData?.course_code} batch={courseData?.type+courseData?.degree} examDate={dateOfExamination} labCreditHours={courseData?.lab_credit_hr} />
                </div>
            </div>
        </>
    );
}

 export default CreateResult;
