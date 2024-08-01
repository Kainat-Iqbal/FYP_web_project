import * as React from "react";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import "./deanResultApproval.css";
import SideBar from '../SideBar';
import { useState, useEffect } from "react";
import axios from "axios";

function DeanResultApproval() {
  const nav = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get("http://localhost:8081/resultApprovalDean/View");
        setResults(res.data);
      } catch (error) {
        console.log("Error fetching requests", error);
      }
    };

    fetchResult();
  }, []);

  const handleViewResultClick = (assignId) => {
    nav(`/DeanViewResult?assignId=${assignId}`);
  };

  const handleApprove = (id) => {
    setResults(prevResults =>
      prevResults.map(result =>
        result.id === id
          ? { ...result, action: 'approve' }
          : result
      )
    );
  };

  const handleDisapprove = (id) => {
    setResults(prevResults =>
      prevResults.map(result =>
        result.id === id
          ? { ...result, action: 'disapprove' }
          : result
      )
    );
  };

  return (
    <div id="DeanResultApprovalMainDiv">
      <SideBar />

      <div id="DeanResultApprovalWithoutBar">

        <div id="DeanResultApprovalTop">
          <h1 style={{ color: "#00304B" }}> Result Approval</h1>
        </div>

        <div id="DeanResultApprovalBottom">
          <Table striped bordered hover id="DeanResultApprovalTable">
            <thead>
              <tr>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
                  ID
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
                  Course Number
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
                  Course Name
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
                  Class
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
                  Instructor Name
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
                  Action
                </th>
              </tr>
            </thead>

            {Array.isArray(results) && results.length > 0 ?(
              results.map((result) => (
                <tr key={result.assignId}>
                  <td>{result.assignId}</td>
                  <td>{result.course_code}</td>
                  <td>{result.courseTitle}</td>
                  <td>{result.year+"("+result.session+")"}</td>
                  <td>{result.teacherName}</td>
                  <td>
                  <button
        style={{ borderColor: "#add8e6", color: "black", backgroundColor: "#add8e6", width: "70%" }}
        onClick={() => handleViewResultClick(result.assignId)}
      >
                          View Result
                        </button>
 
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Result is on pending
                </td>
              </tr>
            )}
          </Table>
        </div>

      </div>
    </div>
  );
}

export default DeanResultApproval;








