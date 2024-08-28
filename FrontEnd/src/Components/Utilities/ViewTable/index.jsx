import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ViewTable = () => {
  const location = useLocation();
  const courseData = location.state?.course;
  const assignId = courseData?.assignId;

  // State for dynamic marks
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/result/GetResult/${assignId}`
        );
        setResults(res.data);
      } catch (error) {
        console.log("Error fetching requests", error);
      }
    };

    fetchResult();
  }, []);

  return (
    <div>
      <table id="viewResultTable">
        <thead>
          <tr>
            <th>S#</th>
            <th>Seat No.</th>
            <th>Enrollment No.</th>
            <th className="name">Student's Name</th>
            <th className="name">Father's Name</th>
            <th className="marks">Mid (20)</th>
            <th className="marks">Lab (30)</th>
            <th className="marks">Assign + Term (50/80)</th>
            <th className="marks">Grand Total</th>
            <th className="marks">GP</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(results) && results.length > 0
            ? results.map((result, index) => (
                <tr key={result.SNo}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
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
                  <td style={{ textAlign: "center" }}>{Number.isInteger(result.GPA) ? `${result.GPA}.00` : result.GPA.toFixed(2)}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTable;
