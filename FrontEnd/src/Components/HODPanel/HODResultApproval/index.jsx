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
        const res = await axios.get(
          "http://localhost:8081/resultApprovalHod/View"
        );
        setResults(res.data);
      } catch (error) {
        console.log("Error fetching requests", error);
      }
    };

    fetchResult();
  }, []);

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
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Course Number
                </th>
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Course Name
                </th>
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Batch
                </th>
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Instructor Name
                </th>
                <th
                  style={{
                    backgroundColor: "#00304B",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(results) && results.length > 0 ? (
                results.map((result) => (
                  <tr key={result.assignId}>
                    <td>{result.assignId}</td>
                    <td>{result.course_code}</td>
                    <td>{result.courseTitle}</td>
                    <td>{result.year + "(" + result.session + ")"}</td>
                    <td>{result.teacherName}</td>
                    <td>
                      <button
                        style={{
                          borderColor: "#add8e6",
                          color: "black",
                          backgroundColor: "#add8e6",
                          width: "70%",
                        }}
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
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default HODResultApproval;
