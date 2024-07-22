import React,{useState,useEffect} from "react";
import SideBar from "../Sidebar";
import './createResult.css';
import StudentTable from "../../Utilities/StudentTable";

function CreateResult() {
    
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
                                <b>Course No.<span style={{ marginLeft: "5%", borderBottom: '1px solid black', width: '60%', display: 'inline-block',fontWeight:'normal'}}>CSS 1345</span></b>

                            
                            <div id="classBatch">
                                <b>Class<span style={{ marginLeft: "68px", borderBottom: '1px solid black', width: '66px', display: 'inline-block', fontWeight:'normal'}}>BS(SE)</span></b>
                                <b style={{ marginLeft: "1%" }}>Batch<span style={{ marginLeft: "8px", borderBottom: '1px solid black', width: '66px', display: 'inline-block',fontWeight:'normal' }}>2021</span></b>
                            </div>
                            </div>
                        </div>
                        <div id="info2">
                            <b>Department<span style={{ marginLeft: "14%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight:'normal'}}>Computer Sceince and Software Engineering</span></b>
                            <b>Course Title<span style={{ marginLeft: "14.5%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight:'normal'}}>Software Quality Engineering</span></b>
                            <b>Date Of Examination<span style={{ marginLeft: "2%", borderBottom: '1px solid black', width: '65%', display: 'inline-block',fontWeight:'normal'}}>08-4-2024</span></b>
                        </div>
                        <div id="info3">
                        <b>Acd. Year<span style={{ marginLeft: "8%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight:'normal'}}>2024</span></b>
                        <b>Credit Hrs<span style={{ marginLeft: "4.5%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight:'normal'}}>2+1</span></b>
                        <b>Semester<span style={{ marginLeft: "8.5%", borderBottom: '1px solid black', width: '30%', display: 'inline-block',fontWeight:'normal'}}>II</span></b>
                        
                        </div>
                    </div>
                </div>
                <div id="bottomCR">
                    <div id="resultTable">
                        <StudentTable />
                    </div>
                </div>
            </div>
        </>
    );
}
export default CreateResult;