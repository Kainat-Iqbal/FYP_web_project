import * as React from "react";
import "./controllerOfExaminationViewResult.css";
import SideBar from "../../SideBar";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function ControllerOfExaminationViewResult() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const assignId = queryParams.get("assignId");
  const nav = useNavigate();
  const [results, setResults] = useState([]);

  const [examinationId, setExaminationId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/session", {
          withCredentials: true,
        });
        setExaminationId(response.data.userId);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  console.log("EXAM", examinationId);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/resultApprovalExamination/Get/${assignId}`
        );
        setResults(res.data);
      } catch (error) {
        console.log("Error fetching requests", error);
      }
    };

    fetchResult();
  }, []);
  console.log("first,,,", results);

  const [showPopup, setShowPopup] = React.useState(false);
  const [disapproveReason, setDisapproveReason] = React.useState("");

  const handleApprove = async (assignId) => {
    console.log(`Approving request ${assignId}`);
    try {
      const res = await axios.put(
        `http://localhost:8081/resultApprovalExamination/Approve/${assignId}`,
        { examinationId }
      );

      if (res.data.updated) {
        alert("Result Approved By Examination");
        nav("/ControllerOfExaminationResultApproval");
      } else {
        console.log("Approval failed:", res.data);
      }
    } catch (error) {
      console.log("Error approving request", error);
    }
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
    nav("/ControllerOfExaminationResultApproval");
  };

  return (
    <div id="COEviewResultMainDiv">
      <SideBar />

      <div id="COEviewResultWithoutBar">

        <div id="COEviewResultTop">

          <div id="COEviewResultTopBar">

            <div id="COEviewResultArrowButton">
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
                  nav("/ControllerOfExaminationResultApproval");
                }}>
                &larr;
              </button>
            </div>

            <div id="COEviewResultMainHeading">
              <h1 style={{ color: "#00304B" }}>JINNAH UNIVERSITY FOR WOMEN, KARACHI</h1>
            </div>

          </div>

          <div id="COEviewResultInfo">

            <div id="COEviewResultLeftDiv">

              <div id="COEviewResultFacultyCourse">
              <b >Faculty<span style={{ marginLeft: "15%", borderBottom: '1px solid black', width: '60%', display: 'inline-block', fontWeight: 'normal' }}>Sceince</span></b>
                <b>Course No.<span style={{ marginLeft: "6%", borderBottom: '1px solid black', width: '60%', display: 'inline-block', fontWeight: 'normal' }}>CSS 1345</span></b>
                

                <div id="COEviewResultClassBatch">
                <b>Class<span style={{ marginLeft: "63px", borderBottom: '1px solid black', width: '66px', display: 'inline-block', fontWeight: 'normal' }}>BS(SE)</span></b>
                  <b style={{ marginLeft: "1%" }}>Batch<span style={{ marginLeft: "8px", borderBottom: '1px solid black', width: '66px', display: 'inline-block', fontWeight: 'normal' }}>2021</span></b>
                
                </div>

              </div>
            </div>

            <div id="COEviewResultCenterDiv">
              <b>Department
                <span style={{  marginLeft: "14%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight: 'normal' }}>Computer Science and Software Engineering</span>
              </b>
              <b>Course Title
                <span style={{ marginLeft: "13.8%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight: 'normal' }}>Business Process Engineering</span>
              </b>
              <b>Date Of Examination
                <span style={{  marginLeft: "2%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight: 'normal' }}>18-04-2024</span>
              </b>
            </div>

            <div id="COEviewResultRightDiv">
              <b>Acd. Year
                <span style={{  marginLeft: "8%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight: 'normal' }}>2024</span>
              </b>
              <b>Credit Hrs
                <span style={{ marginLeft: "4.5%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight: 'normal' }}>2+1</span>
              </b>
              <b>Semester
                <span style={{ marginLeft: "11.5%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight: 'normal' }}>II</span>
              </b>
            </div>

          </div>

        </div>

        <div id="COEviewResultBottom">
          <table id="COEviewResultTable">
            <thead>
              <tr>
                <th  >S. Number</th>
                <th  >Seat Number</th>
                <th  >Enrollment Number</th>
                <th  >Student's Name</th>
                <th  >Father's Name</th>
                <th  >Mid (20)</th>
                <th  >Lab (30/100)</th>
                <th  >Assign+Term (50/80)</th>
                <th  >Grand Total (100)</th>
                <th  >GP</th>
                {/* <th  >Action</th> */}
              </tr>
            </thead>

            <tbody>
              {Array.isArray(results) && results.length > 0 ?(
              results.map((result,index) => (
                <tr key={result.SNo}>
                  <td style={{ textAlign: "center" }}>{index+1}</td>
                  <td style={{ textAlign: "center" }}>{result.seatNo}</td>
                  <td style={{ textAlign: "center" }}>{result.enrollment}</td>
                  <td style={{ textAlign: "center" }}>{result.name}</td>
                  <td style={{ textAlign: "center" }}>{result.fatherName}</td>
                  <td style={{ textAlign: "center" }}>{result.midMarks}</td>
                  <td style={{ textAlign: "center" }}>{result.labMarks}</td>
                  <td style={{ textAlign: "center" }}>
                    {result.terminalMarks}
                  </td>
                  <td style={{ textAlign: "center" }}>{result.totalMarks}</td>
                  <td style={{ textAlign: "center" }}>{result.GPA}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Result is on pending
                </td>
              </tr>
            )}
            </tbody>

          </table>

          {showPopup && (
            <div id="COEviewResultPopup">
              <div id="COEviewResultPopupInner">
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

        <button id="COEviewResultBtnApprove"
          onClick={() => handleApprove(assignId)}
        >
          Approve
        </button>

        <button id="COEviewResultBtnDisapprove"
          onClick={handleDisapprove}
        >
          Disapprove
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

export default ControllerOfExaminationViewResult;





