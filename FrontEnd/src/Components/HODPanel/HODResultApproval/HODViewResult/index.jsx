import * as React from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import "./hodViewResult.css";
import SideBar from "../../SideBar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function HODViewResult() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const assignId = queryParams.get("assignId");
  const nav = useNavigate();
  const [results, setResults] = useState([]);

  const [hodId, setHodId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/session", {
          withCredentials: true,
        });
        setHodId(response.data.userId);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  console.log("HOD", hodId);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/resultApprovalHod/Get/${assignId}`
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
        `http://localhost:8081/resultApprovalHod/Approve/${assignId}`,
        { hodId }
      );

      if (res.data.updated) {
        alert("Result Approved By HOD");
        nav("/HODResultApproval");
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
    setResults((prevResults) =>
      prevResults.map((result) => ({
        ...result,
        action: "Disapproved",
        reason: disapproveReason,
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
                }}
              >
                &larr;
              </button>
            </div>

            <div id="HODViewResultMainHeading">
              <h1 style={{ color: "#00304B" }}>
                JINNAH UNIVERSITY FOR WOMEN, KARACHI
              </h1>
            </div>
          </div>

          <div id="HODViewResultInfo">
            <div id="HODViewResultLeftDiv">
              <div id="HODViewResultFacultyCourse">
                

                <b >Faculty<span style={{ marginLeft: "15%", borderBottom: '1px solid black', width: '60%', display: 'inline-block', fontWeight: 'normal' }}>Sceince</span></b>
                <b>Course No.<span style={{ marginLeft: "6%", borderBottom: '1px solid black', width: '60%', display: 'inline-block', fontWeight: 'normal' }}>CSS 1345</span></b>
                <div id="HODViewResultClassBatch">
                  <b>Class<span style={{ marginLeft: "63px", borderBottom: '1px solid black', width: '66px', display: 'inline-block', fontWeight: 'normal' }}>BS(SE)</span></b>
                  <b style={{ marginLeft: "1%" }}>Batch<span style={{ marginLeft: "8px", borderBottom: '1px solid black', width: '66px', display: 'inline-block', fontWeight: 'normal' }}>2021</span></b>
                </div>
              </div>
            </div>

            <div id="HODViewResultCenterDiv">
              <b>
                Department
                <span
                  style={{
                    
                    marginLeft: "14%",
                    borderBottom: "1px solid black",
                    width: "65%",
                    display: "inline-block",
                    fontWeight: "normal",
                  }}
                >
                  Computer Science and Software Engineering
                </span>
              </b>
              <b>
                Course Title
                <span
                  style={{
                   /*  textAlign: "center", */
                    marginLeft: "13.8%",
                    borderBottom: "1px solid black",
                    width: "65%",
                    display: "inline-block",
                    fontWeight: "normal",
                  }}
                >
                  Business Process Engineering
                </span>
              </b>
              <b>
                Date Of Examination
                <span
                  style={{
                   /*  textAlign: "center", */
                    marginLeft: "2%",
                    borderBottom: "1px solid black",
                    width: "65%",
                    display: "inline-block",
                    fontWeight: "normal",
                  }}
                >
                  18-04-2024
                </span>
              </b>
            </div>

            <div id="HODViewResultRightDiv">
              <b>
                Acd. Year
                <span
                  style={{
                  /*   textAlign: "center", */
                    marginLeft: "8%",
                    borderBottom: "1px solid black",
                    width: "30%",
                    display: "inline-block",
                    fontWeight: "normal",
                  }}
                >
                  2024
                </span>
              </b>
              <b>
                Credit Hrs
                <span
                  style={{
                    /* textAlign: "center", */
                    marginLeft: "4.5%",
                    borderBottom: "1px solid black",
                    width: "30%",
                    display: "inline-block",
                    fontWeight: "normal",
                  }}
                >
                  2+1
                </span>
              </b>
              <b>
                Semester
                <span
                  style={{
                    /* textAlign: "center", */
                    marginLeft: "11.5%",
                    borderBottom: "1px solid black",
                    width: "30%",
                    display: "inline-block",
                    fontWeight: "normal",
                  }}
                >
                  II
                </span>
              </b>
            </div>
          </div>
        </div>

        <div id="HODViewResultBottom">
          <Table striped bordered hover id="HODViewResultTable">
            <thead>
              <tr>
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  S. Number
                </th>
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Seat Number
                </th>
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Enrollment Number
                </th>
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Student's Name
                </th>
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Father's Name
                </th>
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Mid (20)
                </th>
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Lab (30/100)
                </th>
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Assign+Term (50/80)
                </th>
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Grand Total (100)
                </th>
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  GP
                </th>
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
          </Table>

          {showPopup && (
            <div id="HODViewResultPopup">
              <div id="HODViewResultPopupInner">
                <h2 style={{ color: "#00304B" }}>Reason for Disapproval</h2>
                <textarea
                  value={disapproveReason}
                  onChange={(e) => setDisapproveReason(e.target.value)}
                  placeholder="Enter reason for disapproval"
                />
                <button onClick={handleSendDisapprove} style={buttonStyle}>
                  Send
                </button>
                <button onClick={() => setShowPopup(false)} style={buttonStyle}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          id="HODViewResultBtnApprove"
          onClick={() => handleApprove(assignId)}
        >
          {" "}
          Approve
        </button>

        <button id="HODViewResultBtnDisapprove" onClick={handleDisapprove}>
          {" "}
          Disapprove
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "#00304B",
  color: "white",
  border: "none",
  padding: "5px 10px",
  margin: "5px",
  cursor: "pointer",
  height: "7vh",
  width: "8vw",
};

export default HODViewResult;
