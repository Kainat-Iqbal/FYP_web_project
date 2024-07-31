import * as React from "react";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import "./hodResultApproval.css";
import SideBar from "../SideBar";
import { useState, useEffect } from "react";
import axios from "axios";


function HODResultApproval() {
  const nav = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get("http://localhost:8081/resultApprovalHod/View");
        setResults(res.data);
      } catch (error) {
        console.log("Error fetching requests", error);
      }
    };

    fetchResult();
  }, []);

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

  const handleViewResultClick = (assignId) => {
    nav(`/HODViewResult?assignId=${assignId}`);
  };

  return (
    <div id="HODResultApprovalMainDiv">
      <SideBar />

      <div id="HODResultApprovalWithoutBar">

        <div id="HODResultApprovalTop">
          <h1 style={{ color: "#00304B" }}> Result Approval</h1>
        </div>

        <div id="HODResultApprovalBottom">
          <Table striped bordered hover id="HODResultApprovalTable">
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
                  Batch
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
                  Instructor Name
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {results.map((result) => (
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


                    {/* {result.action === 'approve' && (
                      <button
                        style={{ borderColor: "green", color: "white", backgroundColor: "#8BC34A" }}
                        disabled
                      >
                        Approved
                      </button>
                    )}
                    {result.action === 'disapprove' && (
                      <button
                        style={{ borderColor: "red", color: "white", backgroundColor: "#F44336" }}
                        disabled
                      >
                        Disapproved
                      </button>
                    )} */}
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

      </div>
    </div>
  );
}

export default HODResultApproval;








