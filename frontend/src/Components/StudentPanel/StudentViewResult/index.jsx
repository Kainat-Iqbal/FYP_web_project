import * as React from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import "./studentViewResult.css";
import SideBar from "../SideBar";

function StudentViewResult() {
  const nav = useNavigate();
  const [results, setResults] = React.useState([
    {
      SNo: 1,
      SeatNo: '2126411',
      EnrollmentNo: '2021/Comp/BS(SE)/24034',
      StdName: 'Sana Shahid',
      FatherName: 'Mohammad Shahid',
      Mid: '18',
      Lab: '25',
      AT: '38',
      Total: '81',
      GP: '3.66',
      action: null,
      reason: ''
    },
    {
      SNo: 2,
      SeatNo: '2126412',
      EnrollmentNo: '2021/Comp/BS(SE)/24035',
      StdName: 'Ali Ahmed',
      FatherName: 'Ahmed Khan',
      Mid: '20',
      Lab: '27',
      AT: '35',
      Total: '82',
      GP: '3.00',
      action: null,
      reason: ''
    },
    {
      SNo: 3,
      SeatNo: '2126411',
      EnrollmentNo: '2021/Comp/BS(SE)/24034',
      StdName: 'Sana Shahid',
      FatherName: 'Mohammad Shahid',
      Mid: '18',
      Lab: '25',
      AT: '38',
      Total: '81',
      GP: '3.66'
    },
    {
      SNo: 4,
      SeatNo: '2126411',
      EnrollmentNo: '2021/Comp/BS(SE)/24034',
      StdName: 'Sana Shahid',
      FatherName: 'Mohammad Shahid',
      Mid: '18',
      Lab: '25',
      AT: '38',
      Total: '81',
      GP: '3.66'
    },
    {
      SNo: 5,
      SeatNo: '2126411',
      EnrollmentNo: '2021/Comp/BS(SE)/24034',
      StdName: 'Sana Shahid',
      FatherName: 'Mohammad Shahid',
      Mid: '18',
      Lab: '25',
      AT: '38',
      Total: '81',
      GP: '3.66'
    },
    {
      SNo: 6,
      SeatNo: '2126411',
      EnrollmentNo: '2021/Comp/BS(SE)/24034',
      StdName: 'Sana Shahid',
      FatherName: 'Mohammad Shahid',
      Mid: '18',
      Lab: '25',
      AT: '38',
      Total: '81',
      GP: '3.66'
    },
    {
      SNo: 7,
      SeatNo: '2126411',
      EnrollmentNo: '2021/Comp/BS(SE)/24034',
      StdName: 'Sana Shahid',
      FatherName: 'Mohammad Shahid',
      Mid: '18',
      Lab: '25',
      AT: '38',
      Total: '81',
      GP: '3.66'
    },
    {
      SNo: 8,
      SeatNo: '2126411',
      EnrollmentNo: '2021/Comp/BS(SE)/24034',
      StdName: 'Sana Shahid',
      FatherName: 'Mohammad Shahid',
      Mid: '18',
      Lab: '25',
      AT: '38',
      Total: '81',
      GP: '3.66'
    },
    {
      SNo: 9,
      SeatNo: '2126411',
      EnrollmentNo: '2021/Comp/BS(SE)/24034',
      StdName: 'Sana Shahid',
      FatherName: 'Mohammad Shahid',
      Mid: '18',
      Lab: '25',
      AT: '38',
      Total: '81',
      GP: '3.66'
    },
    {
      SNo: 10,
      SeatNo: '2126411',
      EnrollmentNo: '2021/Comp/BS(SE)/24034',
      StdName: 'Sana Shahid',
      FatherName: 'Mohammad Shahid',
      Mid: '18',
      Lab: '25',
      AT: '38',
      Total: '81',
      GP: '3.66'
    },
  ]);
  return (
    <div id="StudentViewResultMainDiv">
      <SideBar />

      <div id="StudentViewResultWithoutBar">

        <div id="StudentViewResultTop">

          <div id="StudentViewResultTopBar">

            <div id="StudentViewResultArrowButton">
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
                  nav("/StudentViewCourse");
                }} >
                &larr;
              </button>
            </div>

            <div id="StudentViewResultMainHeading">
              <h1 style={{ color: "#00304B" }}>JINNAH UNIVERSITY FOR WOMEN, KARACHI</h1>
            </div>

          </div>

          <div id="StudentViewResultInfo">

            <div id="StudentViewResultLeftDiv">

              <div id="StudentViewResultFacultyCourse">
              <b >Faculty<span style={{ marginLeft: "15%", borderBottom: '1px solid black', width: '60%', display: 'inline-block', fontWeight: 'normal' }}>Sceince</span></b>
                <b>Course No.<span style={{ marginLeft: "6%", borderBottom: '1px solid black', width: '60%', display: 'inline-block', fontWeight: 'normal' }}>CSS 1345</span></b>
                


                <div id="StudentViewResultClassBatch">
                <b>Class<span style={{ marginLeft: "63px", borderBottom: '1px solid black', width: '66px', display: 'inline-block', fontWeight: 'normal' }}>BS(SE)</span></b>
                  <b style={{ marginLeft: "1%" }}>Batch<span style={{ marginLeft: "8px", borderBottom: '1px solid black', width: '66px', display: 'inline-block', fontWeight: 'normal' }}>2021</span></b>
                
                </div>

              </div>
            </div>

            <div id="StudentViewResultCenterDiv">
            <b>Department
                <span style={{  marginLeft: "14%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight: 'normal' }}>Computer Science and Software Engineering</span>
              </b>
              <b>Course Title
                <span style={{  marginLeft: "13.8%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight: 'normal' }}>Business Process Engineering</span>
              </b>
              <b>Date Of Examination
                <span style={{marginLeft: "2%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight: 'normal' }}>18-04-2024</span>
              </b>
            </div>

            <div id="StudentViewResultRightDiv">
            <b>Acd. Year
                <span style={{ marginLeft: "8%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight: 'normal' }}>2024</span>
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

        <div id="StudentViewResultBottom">
          <Table striped bordered hover id="StudentViewResultTable">
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
                  <td style={{ textAlign: "center" }}>{result.SNo}</td>
                  <td style={{ textAlign: "center" }}>{result.SeatNo}</td>
                  <td style={{ textAlign: "center" }}>{result.EnrollmentNo}</td>
                  <td style={{ textAlign: "center" }}>{result.StdName}</td>
                  <td style={{ textAlign: "center" }}>{result.FatherName}</td>
                  <td style={{ textAlign: "center" }}>{result.Mid}</td>
                  <td style={{ textAlign: "center" }}>{result.Lab}</td>
                  <td style={{ textAlign: "center" }}>{result.AT}</td>
                  <td style={{ textAlign: "center" }}>{result.Total}</td>
                  <td style={{ textAlign: "center" }}>{result.GP}</td>
                </tr>
              ))}
            </tbody>
          </Table>

        </div>
      </div>
    </div>
  );
}

export default StudentViewResult;





