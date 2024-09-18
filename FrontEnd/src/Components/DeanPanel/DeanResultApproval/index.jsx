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
          <table id="DeanResultApprovalTable">
            <thead>
              <tr>
                <th   >
                  ID
                </th>
                <th   >
                  Course Number
                </th>
                <th   >
                  Course Name
                </th>
                <th   >
                  Class
                </th>
                <th   >
                  Instructor Name
                </th>
                <th   >
                  Action
                </th>
              </tr>
            </thead>

            {Array.isArray(results) && results.length > 0 ?(
              results.map((result,index) => (
                <tr key={result.assignId}>
                  <td>{index+1}</td>
                  <td>{result.course_code}</td>
                  <td>{result.courseTitle}</td>
                  <td>{result.year+"("+result.session+")"}</td>
                  <td>{result.teacherName}</td>
                  <td>
                  <button
        style={{ borderColor: "#add8e6", color: "black",background:'linear-gradient(to right, #93C098, #8CE0DB)', width: "80%" }}
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
          </table>
        </div>

      </div>
    </div>
  );
}

export default DeanResultApproval;








