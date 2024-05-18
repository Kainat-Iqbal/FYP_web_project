import * as React from "react";
import "./style.css";
import SideBar from "../../SideBar";
import Table from "react-bootstrap/Table";
import { Link,useNavigate } from "react-router-dom";

function HODViewResult() {
    const nav = useNavigate();
    const results = [
        {
            SNo: 1,
            SeatNo:'2126411' ,
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
            SNo: 2,
            SeatNo:'2126411' ,
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
            SNo: 3,
            SeatNo:'2126411' ,
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
            SeatNo:'2126411' ,
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
            SeatNo:'2126411' ,
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
            SeatNo:'2126411' ,
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
            SeatNo:'2126411' ,
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
            SeatNo:'2126411' ,
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
            SeatNo:'2126411' ,
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
            SeatNo:'2126411' ,
            EnrollmentNo: '2021/Comp/BS(SE)/24034',
            StdName: 'Sana Shahid',
            FatherName: 'Mohammad Shahid',
            Mid: '18',
            Lab: '25',
            AT: '38',
            Total: '81',
            GP: '3.66'
        },
        
        // Add more data as needed
      ];

  return (
    <div id="mainViewResultDiv">
        <SideBar />
      <div id="viewResultWithoutBar">

        <div id="viewResultTop">

          <div id="topBar">
            <div id="arrowButton">
            <button
            style={{ 
              backgroundColor: "white",
              fontSize: "50px",
              fontWeight: "bold",
              color: "#00304B",
              border: "none",
              cursor: "pointer",
              //marginRight: "10px",
              marginLeft:"1px",
            }}
            onClick={() => {
              nav("/hodApproveResult");
            }}
            >
            &larr; {/* Left arrow character */}
            </button>
            </div>

            <div id="hdResult">
              <h1 style={{ color: "#00304B" }}>JINNAH UNIVERSITY FOR WOMEN, KARACHI</h1>
            </div>
          </div>

            
          <div id="info">
            <div id="leftDiv">
            <div id="facultyCourse">
                                <b style={{marginTop:"2%"}}>Faculty<span style={{ marginLeft: "16%", borderBottom: '1px solid black', width: '60%', display: 'inline-block',fontWeight:'normal'}}>Sceince</span></b>
                                <b>Course No.<span style={{ marginLeft: "5%", borderBottom: '1px solid black', width: '60%', display: 'inline-block',fontWeight:'normal'}}>CSS 1345</span></b>

                            
                            <div id="classBatch">
                                <b>Class<span style={{ marginLeft: "60px", borderBottom: '1px solid black', width: '66px', display: 'inline-block', fontWeight:'normal'}}>BS(SE)</span></b>
                                <b style={{ marginLeft: "1%" }}>Batch<span style={{ marginLeft: "8px", borderBottom: '1px solid black', width: '66px', display: 'inline-block',fontWeight:'normal' }}>2021</span></b>
                            </div>
                            </div>
            </div>
            
            <div id="centerDiv">
            <b>Department<span style={{ marginLeft: "14%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight:'normal'}}>Computer Sceince and Software Engineering</span></b>
                            <b>Course Title<span style={{ marginLeft: "14.5%", borderBottom: '1px solid black', width: '65%', display: 'inline-block', fontWeight:'normal'}}>Software Quality Engineering</span></b>
                            <b>Date Of Examination<span style={{ marginLeft: "2%", borderBottom: '1px solid black', width: '65%', display: 'inline-block',fontWeight:'normal'}}>08-4-2024</span></b>
            </div>
            
            <div id="rightDiv">
            <b>Acd. Year<span style={{ marginLeft: "8%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight:'normal'}}>2024</span></b>
                        <b>Credit Hrs<span style={{ marginLeft: "4.5%", borderBottom: '1px solid black', width: '30%', display: 'inline-block', fontWeight:'normal'}}>2+1</span></b>
                        <b>Semester<span style={{ marginLeft: "8.5%", borderBottom: '1px solid black', width: '30%', display: 'inline-block',fontWeight:'normal'}}>II</span></b>

            </div> 
          </div>  
        </div>

        <div id="viewResultBottom">
          <Table striped bordered hover id="viewResultTable">
            <thead>
              <tr>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign:"center" }}>
                  S. No.
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign:"center"  }}>
                  Seat No.
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign:"center"  }}>
                  Enrollment No.
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign:"center"  }}>
                  Student's Name
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign:"center"  }}>
                  Father's Name
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign:"center"  }}>
                  Mid (20)
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign:"center"  }}>
                  Lab (30/100)
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign:"center"  }}>
                  Assign/Term (50/80)
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign:"center"  }}>
                  Grand Total (100)
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign:"center"  }}>
                  GP
                </th>
                {/* <th style={{ backgroundColor: "#00304B", color: "white" }}>
                  Action
                </th> */}
              </tr>
            </thead>
            
            <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td style={{alignItems: "center"}}>{result.SNo}</td>
              <td>{result.SeatNo}</td>
              <td>{result. EnrollmentNo}</td>
              <td>{result.StdName}</td>
              <td>{result.FatherName}</td>
              <td>{result.Mid}</td>
              <td>{result.Lab}</td>
              <td>{result.AT}</td>
              <td>{result.Total}</td>
              <td>{result.GP}</td>
            </tr>
          ))}
        
              {/* <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>
                  <a href="#">
                    <Edit />
                  </a>
                </td>
              </tr> */}

            </tbody>
          </Table>
        </div>
        {/* <button
            style={{
                height: "4vw",
                width: "10vw",
                marginTop: "0vh",
                marginLeft:"25%",
                color:"white",
                backgroundColor: "green", //#194d33
                borderColor: "green",
            }}
            onClick={() => {
              nav("/ApproveResult");
            }}
          >
            Approve
        </button>
        <button
            style={{
              height: "4vw",
              width: "10vw",
              marginTop: "0vh", 
              marginRight: "30%", 
              color:"white", //#0d47a1 blue for view
              backgroundColor:"red",// #b71c1c
              borderColor:"red", }}
            onClick={() => {
              nav("/ApproveResult");
            }}
          >
            Disapprove
          </button> */}

      </div>
      

    </div>
  );
}
export default HODViewResult;
