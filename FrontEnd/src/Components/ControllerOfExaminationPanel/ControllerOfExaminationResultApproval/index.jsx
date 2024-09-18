import * as React from "react";
import "./controllerOfExaminationResultApproval.css";
import SideBar from "../SideBar";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ControllerOfExaminationResultApproval() {
  const nav = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8081/resultApprovalExamination/View"
        );
        setResults(res.data);
      } catch (error) {
        console.log("Error fetching requests", error);
      }
    };

    fetchResult();
  }, []);

  const handleViewResultClick = (assignId) => {
    nav(`/ControllerOfExaminationViewResult?assignId=${assignId}`);
  };

  return (
    <div id="COEresultApprovalMainDiv">
      <SideBar />

      <div id="COEresultApprovalWithoutBar">
        <div id="COEresultApprovalTop">
          <h1 style={{ color: "#00304B" }}> Result Approval</h1>
        </div>

        <div id="COEresultApprovalBottom">
          <table id="COEresultApprovalTable">
            <thead>
              <tr>
                <th
                  
                >
                  ID
                </th>
                <th
                  
                >
                  Course Number
                </th>
                <th
                  
                >
                  Course Name
                </th>
                <th
                  
                >
                  Class
                </th>
                <th
                  
                >
                  Instructor Name
                </th>
                <th
                  
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(results) && results.length > 0 ? (
                results.map((result,index) => (
                  <tr key={result.assignId}>
                    <td>{index+1}</td>
                    <td>{result.course_code}</td>
                    <td>{result.courseTitle}</td>
                    <td>{result.year + "(" + result.session + ")"}</td>
                    <td>{result.teacherName}</td>
                    <td>
                      <button
                        style={{
                          borderColor: "#add8e6",
                          color: "black",
                          background:'linear-gradient(to right, #93C098, #8CE0DB)',
                          width: "80%",
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
            </tbody>{" "}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ControllerOfExaminationResultApproval;
