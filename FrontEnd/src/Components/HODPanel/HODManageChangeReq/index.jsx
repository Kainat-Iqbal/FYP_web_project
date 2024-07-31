import * as React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import './hodmanageChangeReq.css';
import SideBar from "../SideBar";
import axios from "axios";
import Dialogue from "../Dialogue";  // Import the Dialogue component

function HODManageChangeReq() {

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
  console.log("HOD",hodId)

  const [request, setRequest] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [disapprovedRequests, setDisapprovedRequests] = useState(new Set()); // Track disapproved requests

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get("http://localhost:8081/changeReq/View");
        setRequest(res.data);
      } catch (error) {
        console.log("Error fetching requests", error);
      }
    };

    fetchRequest();
  }, []);

  const [disapproveReq, setDisapproveReq] = useState([]);
  useEffect(() => {
    const fetchDisapproveRequest = async () => {
      try {
        const res = await axios.get("http://localhost:8081/changeReq/ViewDisapprove");
        setDisapproveReq(res.data);
        console.log("na,e",res.data)
      } catch (error) {
        console.log("Error fetching requests", error);
      }
    };

    fetchDisapproveRequest();
  }, []);

  const handleDisapproveClick = (requestId) => {
    setCurrentRequestId(requestId);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setCurrentRequestId(null);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const date = getCurrentDate();


  const handleSend = async (reason) => {
    try {
      const res =await axios.put(`http://localhost:8081/changeReq/Disapprove/${currentRequestId}`, { reason ,hodId,date});
      
      if(res.data.updated){
        setDisapprovedRequests((prev) => new Set(prev).add(currentRequestId)); // Mark as disapproved
        alert("Request Disapproved")
        window.location.reload(); // Refresh the page
      }
    } catch (error) {
      console.log("Error disapproving request", error);
    } finally {
      setShowDialog(false);
      setCurrentRequestId(null);
    }
  };

  const handleApprove = async (requestId) => {
    console.log(`Approving request ${requestId}`);
    try {
      const res = await axios.put(`http://localhost:8081/changeReq/Approve/${requestId}`, { hodId, date });

      if (res.data.updated) {
        alert("Request Approved");
        window.location.reload(); // Refresh the page
      } else {
        console.log("Approval failed:", res.data);
      }
    } catch (error) {
      console.log("Error approving request", error);
    }
  };


  return (
    <div id="HODManageChangeReqMainDiv">
      <SideBar />

      <div id="HODManageChangeReqWithoutBar">
        <div id="HODManageChangeReqTop">
          <h1 style={{ color: "#00304B" }}> Result Change Request </h1>
        </div>

        <div id="HODManageChangeReqBottom">
          <Table striped bordered hover id="HODManageChangeReqTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Instructor Name</th>
                <th>Message/Reason</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {request.map((result) => (
                <tr key={result.requestId}>
                  <td>{result.requestId}</td>
                  <td>{result.course_code}</td>
                  <td>{result.course_name}</td>
                  <td>{"Ms. " + result.name}</td>
                  <td style={{ whiteSpace: 'pre-wrap' }}>{result.description}</td>
                  <td id="action">
                    {!disapprovedRequests.has(result.requestId) ? (
                      <>
                        <button
                        id="approveButtonHOD"
                         
                          onClick={() => handleApprove(result.requestId)}
                          >
                          Approve
                        </button>

                        <button
                        id="disapproveButtonHOD"
                          style={{
                            borderColor: "#cd5c5c",
                            backgroundColor: "#cd5c5c",
                          }}
                          onClick={() => handleDisapproveClick(result.requestId)}
                        >
                          Disapprove
                        </button>
                      </>
                    ) : (
                      <span>Disapproved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div id="HODManageChangeReqTop">
          <h1 style={{ color: "#00304B" }}> Disapproved Request </h1>
        </div>

        <div id="HODManageChangeReqBottom">
          <Table striped bordered hover id="HODManageChangeReqTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Instructor Name</th>
                <th>Message/Reason</th>
                <th>Reason for Disapproval</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {disapproveReq.map((results) => (
                <tr key={results.requestId}>
                  <td>{results.requestId}</td>
                  <td>{results.course_code}</td>
                  <td>{results.course_name}</td>
                  <td>{"Ms. " + results.name}</td>
                  {console.log("njnk",results.name)}
                  <td style={{ whiteSpace: 'pre-wrap' }}>{results.description}</td>
                  <td>{results.disapproveReason}</td>
                  <td>
                      <span>Disapproved</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Dialogue
        show={showDialog}
        handleClose={handleCloseDialog}
        handleSend={handleSend}
      />
    </div>
  );
}

export default HODManageChangeReq;

    
  

  



















// import * as React from "react";
// import "./style.css";
// import SideBar from "../SideBar";
// import Table from "react-bootstrap/Table";
// import { Link, useNavigate } from "react-router-dom";

// function ManageChangeReq() {
//   const nav = useNavigate();
//   const [results, setResults] = React.useState([
//     {
//       id: 1,
//       courseNo: 'CSE101',
//       courseName: 'Introduction to Data Science',
//       class: 'SE-21',
//       instructorName: 'Ms.Javeria Imran',
//       reason: 'I want to change result because mistakenly I enter wrong seat no.',
//       action: null
//     },
//     {
//       id: 2,
//       courseNo: 'CSE105',
//       courseName: 'Web Engineering',
//       class: 'CS-20',
//       instructorName: 'Ms. Surraiya Obaid',
//       reason: 'Enter wrong seat no.',
//       action: null
//     },
//     {
//       id: 3,
//       courseNo: 'CSE101',
//       courseName: 'Introduction to Computer Science',
//       class: 'SE-21',
//       instructorName: 'Ms.Ayesha Shah',
//       reason: 'Enter wrong seat no.',
//       action: null
//     },
//     {
//       id: 4,
//       courseNo: 'CSE101',
//       courseName: 'Introduction to Computer Science',
//       class: 'CS-21',
//       instructorName: 'Ms.Ayesha Shamim',
//       reason: 'Enter wrong seat no.',
//       action: null
//     },
//     {
//       id: 5,
//       courseNo: 'CSE101',
//       courseName: 'Introduction to Computer Science',
//       class: 'SE-21',
//       instructorName: 'Ms.Ayesha Shamim',
//       reason: 'Enter wrong seat no.',
//       action: null
//     },
//     {
//       id: 6,
//       courseNo: 'CSE101',
//       courseName: 'Introduction to Computer Science',
//       class: 'SE-21',
//       instructorName: 'Ms.Ayesha Shamim',
//       reason: 'Enter wrong seat no.',
//       action: null
//     },
//     {
//         id: 7,
//         courseNo: 'CSE101',
//         courseName: 'Introduction to Computer Science',
//         class: 'SE-21',
//         instructorName: 'Ms.Ayesha Shamim',
//         reason: 'Enter wrong seat no.',
//         action: null
//     },
//     {
//         id: 8,
//         courseNo: 'CSE101',
//         courseName: 'Introduction to Computer Science',
//         class: 'SE-21',
//         instructorName: 'Ms.Ayesha Shamim',
//         reason: 'Enter wrong seat no.',
//         action: null
//     },
    
//   ]);

//   const handleApprove = (id) => {
//     setResults(prevResults =>
//       prevResults.map(result => 
//         result.id === id 
//         ? { ...result, action: 'approve' } 
//         : result
//       )
//     );
//   };

//   const handleDisapprove = (id) => {
//     setResults(prevResults =>
//       prevResults.map(result => 
//         result.id === id 
//         ? { ...result, action: 'disapprove' } 
//         : result
//       )
//     );
//   };

//   return (
//     <div id="mainApproveResultDiv">
//       <SideBar />
//       <div id="approveResultWithoutBar">
//         <div id="approveResultTop">
//           <h1 style={{ color: "#00304B" }}> Result Change Request</h1>
//         </div>

//         <div id="approveResultBottom">
//           <Table striped bordered hover id="viewTeacherTable">
//             <thead>
//               <tr>
//                 <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
//                   ID
//                 </th>
//                 <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
//                   Course No
//                 </th>
//                 <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center"  }}>
//                   Course Name
//                 </th>
//                 <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
//                   Class
//                 </th>
//                 <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
//                   Instructor Name
//                 </th>
//                 <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
//                   Message/Reason
//                 </th>
//                 <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
//                   Action
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {results.map((result) => (
//                 <tr key={result.id}>
//                   <td>{result.id}</td>
//                   <td>{result.courseNo}</td>
//                   <td>{result.courseName}</td>
//                   <td>{result.class}</td>
//                   <td>{result.instructorName}</td>
//                   <td>{result.reason}</td>
//                   <td>
//                     {result.action === null && (
//                       <>
//                         {/* <button
//                           style={{ borderColor: "yellow", color: "black", backgroundColor: "yellow", marginLeft:"20px" }}
//                           onClick={() => {
//                             nav("/ViewResult");
//                           }}
//                         >
//                           View Result
//                         </button> */}
                        
//                         <button
//                           style={{ borderColor: "green", color: "black", backgroundColor: "#388E3C",marginLeft:"7px" }}
//                           onClick={() => {
//                             handleApprove(result.id);
//                           }}
//                         >
//                           Approve
//                         </button>

//                         <button
//                           style={{ borderColor: "red", color: "black", backgroundColor: "#D32F2F", marginLeft:"7px" }}
//                           onClick={() => {
//                             handleDisapprove(result.id);
//                           }}
//                         >
//                           Disapprove
//                         </button>

//                       </>
//                     )}
//                     {result.action === 'approve' && (
//                       <button
//                         style={{ borderColor: "green", color: "white", backgroundColor: "#8BC34A" }}
//                         disabled
//                       >
//                         Approved
//                       </button>
//                     )}
//                     {result.action === 'disapprove' && (
//                       <button
//                         style={{ borderColor: "red", color: "white", backgroundColor: "#F44336" }}
//                         disabled
//                       >
//                         Disapproved
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ManageChangeReq;