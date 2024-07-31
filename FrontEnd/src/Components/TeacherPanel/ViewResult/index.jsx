import React from "react";
import SideBar from "../Sidebar";
import "./viewResult.css"
import StudentTable from "../../Utilities/StudentTable";
import ViewTable from "../../Utilities/ViewTable";

function ViewResult() {
  return (
    <>
      <div id="mainVR">
        <div id="sidebarVR">
          <SideBar />
        </div>
        <div id="topVR">
          <div id="topheadVR">
            <h1>Jinnah University For Women</h1>
          </div>
          <div id="resultinfoVR">
            <div id="info1VR">
              <div id="facultyCourse">
                <b style={{ marginTop: "2%" }}>Faculty<span style={{ marginLeft: "16%", borderBottom: '1px solid black', width: '60%', display: 'inline-block', fontWeight: 'normal' }}>Sceince</span></b>
                <b>Course No.<span style={{ marginLeft: "7%", borderBottom: '1px solid black', width: '60%', display: 'inline-block', fontWeight: 'normal' }}>CSS 1345</span></b>
                <div id="classBatch">
                  <b>Class<span style={{ marginLeft: "68px", borderBottom: '1px solid black', width: '66px', display: 'inline-block', fontWeight: 'normal' }}>BS(SE)</span></b>
                  <b style={{ marginLeft: "1%" }}>Batch<span style={{ marginLeft: "8px", borderBottom: '1px solid black', width: '66px', display: 'inline-block', fontWeight: 'normal' }}>2021</span></b>
                </div>
              </div>
            </div>
            <div id="info2VR">
              <b>Department<span style={{ marginLeft: "14%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight: 'normal' }}>Computer Sceince and Software Engineering</span></b>
              <b>Course Title<span style={{ marginLeft: "13.8%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight: 'normal' }}>Software Quality Engineering</span></b>
              <b>Date Of Examination<span style={{ marginLeft: "2%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight: 'normal' }}>08-4-2024</span></b>
            </div>
            <div id="info3VR">
              <b>Acd. Year<span style={{ marginLeft: "8%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight: 'normal' }}>2024</span></b>
              <b>Credit Hrs<span style={{ marginLeft: "4.5%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight: 'normal' }}>2+1</span></b>
              <b>Semester<span style={{ marginLeft: "12%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight: 'normal' }}>II</span></b>
            </div>
          </div>
        </div>
        <div id="bottomVR">
          <div id="resultTableVR">
            <ViewTable />
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewResult;