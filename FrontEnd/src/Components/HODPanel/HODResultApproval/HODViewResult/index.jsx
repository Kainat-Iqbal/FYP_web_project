import * as React from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import "./hodViewResult.css";
import SideBar from "../../SideBar";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";


function HODViewResult() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const assignId = queryParams.get('assignId');
  const nav = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/resultApprovalHod/Get/${assignId}`);
        setResults(res.data);
      } catch (error) {
        console.log("Error fetching requests", error);
      }
    };

    fetchResult();
  }, []);
console.log("first,,,",results)

  const [showPopup, setShowPopup] = React.useState(false);
  const [disapproveReason, setDisapproveReason] = React.useState("");

  const handleApproveAll = () => {
    setResults(prevResults =>
      prevResults.map(result => ({ ...result, action: 'Approved' }))
    );
    nav("/HODResultApproval");
  };

  const handleDisapprove = () => {
    setShowPopup(true);
  };

  const handleSendDisapprove = () => {
    setResults(prevResults =>
      prevResults.map(result => ({
        ...result,
        action: 'Disapproved',
        reason: disapproveReason
      }))
    );
    setShowPopup(false);
    setDisapproveReason("");
    nav("/HODResultApproval");
  };

  return (
    <div id="HODViewResultMainDiv">
      <SideBar />

      <div id="HODViewResultWithoutBar">

        <div id="HODViewResultTop">

          <div id="HODViewResultTopBar">

            <div id="HODViewResultArrowButton">
              <button
                style={{
                  backgroundColor: "white",
                  fontSize: "50px",
                  fontWeight: "bold",
                  color: "#00304B",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "1px",
                }}
                onClick={() => {
                  nav("/HODResultApproval");
                }} >
                &larr;
              </button>
            </div>

            <div id="HODViewResultMainHeading">
              <h1 style={{ color: "#00304B" }}>JINNAH UNIVERSITY FOR WOMEN, KARACHI</h1>
            </div>

          </div>

          <div id="HODViewResultInfo">

            <div id="HODViewResultLeftDiv">

              <div id="HODViewResultFacultyCourse">
                <b style={{ marginTop: "2%" }}>Faculty
                  <span style={{ textAlign: "center", marginLeft: "16%", borderBottom: '1px solid black', width: '60%', display: 'inline-block', fontWeight: 'normal' }}>Science</span>
                </b>
                <b>Course Number
                  <span style={{ textAlign: "center", marginLeft: "5%", borderBottom: '1px solid black', width: '49%', display: 'inline-block', fontWeight: 'normal' }}>CSS 1345</span>
                </b>

                <div id="HODViewResultClassBatch">
                  <b>Class
                    <span style={{ textAlign: "center", marginLeft: "60px", borderBottom: '1px solid black', width: '66px', display: 'inline-block', fontWeight: 'normal' }}>BS(SE)</span>
                  </b>
                  <b style={{ marginLeft: "1%" }}>Batch
                    <span style={{ textAlign: "center", marginLeft: "8px", borderBottom: '1px solid black', width: '66px', display: 'inline-block', fontWeight: 'normal' }}>2021</span>
                  </b>
                </div>

              </div>
            </div>

            <div id="HODViewResultCenterDiv">
              <b>Department
                <span style={{ textAlign: "center", marginLeft: "14%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight: 'normal' }}>Computer Science and Software Engineering</span>
              </b>
              <b>Course Title
                <span style={{ textAlign: "center", marginLeft: "13.8%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight: 'normal' }}>Business Process Engineering</span>
              </b>
              <b>Date Of Examination
                <span style={{ textAlign: "center", marginLeft: "2%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight: 'normal' }}>18-04-2024</span>
              </b>
            </div>

            <div id="HODViewResultRightDiv">
              <b>Acd. Year
                <span style={{ textAlign: "center", marginLeft: "8%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight: 'normal' }}>2024</span>
              </b>
              <b>Credit Hrs
                <span style={{ textAlign: "center", marginLeft: "4.5%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight: 'normal' }}>2+1</span>
              </b>
              <b>Semester
                <span style={{ textAlign: "center", marginLeft: "11%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight: 'normal' }}>II</span>
              </b>
            </div>

          </div>
        </div>

        <div id="HODViewResultBottom">
          <Table striped bordered hover id="HODViewResultTable">
            <thead>
              <tr>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>S. Number</th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>Seat Number</th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>Enrollment Number</th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>Student's Name</th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>Father's Name</th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>Mid (20)</th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>Lab (30/100)</th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>Assign+Term (50/80)</th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>Grand Total (100)</th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>GP</th>
              </tr>
            </thead>

            <tbody>
              {results.map((result) => (
                <tr key={result.SNo}>
                  <td style={{ textAlign: "center" }}>{result.resultId}</td>
                  <td style={{ textAlign: "center" }}>{result.seatNo}</td>
                  <td style={{ textAlign: "center" }}>{result.enrollment}</td>
                  <td style={{ textAlign: "center" }}>{result.name}</td>
                  <td style={{ textAlign: "center" }}>{result.fatherName}</td>
                  <td style={{ textAlign: "center" }}>{result.midMarks}</td>
                  <td style={{ textAlign: "center" }}>{result.labMarks}</td>
                  <td style={{ textAlign: "center" }}>{result.terminalMarks}</td>
                  <td style={{ textAlign: "center" }}>{result.totalMarks}</td>
                  <td style={{ textAlign: "center" }}>{result.GPA}</td>

                </tr>
              ))}
            </tbody>
          </Table>

          {/* <div style={{ textAlign: 'center', margin: '20px' }}>
            <button onClick={handleApproveAll} style={buttonStyle}>Approve</button>
            <button onClick={handleDisapprove} style={buttonStyle}>Disapprove</button>
          </div> */}

          {showPopup && (
            <div id="HODViewResultPopup">
              <div id="HODViewResultPopupInner">
              <h2 style={{ color: '#00304B'}}>Reason for Disapproval</h2>
                <textarea
                  value={disapproveReason}
                  onChange={(e) => setDisapproveReason(e.target.value)}
                  placeholder="Enter reason for disapproval"
                />
                <button onClick={handleSendDisapprove} style={buttonStyle}>Send</button>
                <button onClick={() => setShowPopup(false)} style={buttonStyle}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        <button id="HODViewResultBtnApprove"
          // style={{
          //   height: "4vw",
          //   width: "10vw",
          //   marginTop: "5vh",
          //   marginLeft: "25%",
          //   borderColor: "#04AA6D", color: "white", backgroundColor: "#28a745" //#90ee90 success#28a745
          // }}

          onClick={handleApproveAll}

        // onClick={() => {
        //   handleApprove(results.id);
        // }}
        // onClick={() => {
        //   nav("/ApproveResult");
        // }}

        > Approve
        </button>

        <button id="HODViewResultBtnDisapprove"
          // style={{
          //   height: "4vw",
          //   width: "10vw",
          //   marginTop: "5vh",
          //   marginRight: "30%",
          //   borderColor: "#dc3545", color: "white", backgroundColor: "#dc3545" //#cd5c5c
          // }}

          onClick={handleDisapprove}

        // onClick={() => {
        //   handleDisapprove(results.id);
        // }}
        > Disapprove
        </button>

      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#00304B',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  margin: '5px',
  cursor: 'pointer',
  height: '7vh',
  width: '8vw'
};

export default HODViewResult;





