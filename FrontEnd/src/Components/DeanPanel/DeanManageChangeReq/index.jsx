import * as React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./deanManageChangeReq.css";
import SideBar from '../SideBar';
import DeanDialogue from "../DeanDialogue";

function DeanManageChangeReq() {

  const [deanId, setDeanId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/session", {
          withCredentials: true,
        });
        setDeanId(response.data.userId);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const [request, setRequest] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [disapprovedRequests, setDisapprovedRequests] = useState(new Set()); // Track disapproved requests

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get("http://localhost:8081/deanChangeReq/deanView");
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
        const res = await axios.get("http://localhost:8081/deanChangeReq/deanViewDisapprove");
        setDisapproveReq(res.data);
        console.log("dean",res.data)
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
      const res =await axios.put(`http://localhost:8081/deanChangeReq/deanDisapprove/${currentRequestId}`, { reason ,deanId,date});
      
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
      const res = await axios.put(`http://localhost:8081/deanChangeReq/deanApprove/${requestId}`, { deanId, date });

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
    <div id="DeanManageChangeReqMainDiv">
      <SideBar />

      <div id="DeanManageChangeReqWithoutBar">
        <div id="DeanManageChangeReqTop">
          <h1 style={{ color: "#00304B" }}> Result Change Request</h1>
        </div>

        <div id="DeanManageChangeReqBottom">
          <Table striped bordered hover id="DeanManageChangeReqTable">
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
                  <td>
                  {!disapprovedRequests.has(result.requestId) ? (
                      <>
                        <button
                          style={{
                            borderColor: "#90ee90",
                            backgroundColor: "#90ee90",
                            // textAlign: "center",
                            // width: "9vw",
                            // borderColor: "#90ee90",
                            // color: "white",
                            // backgroundColor: "#90ee90",
                            // marginLeft:"5px",
                            // marginRight: "5px"
                          }}
                          onClick={() => handleApprove(result.requestId)}
                          >
                          Approve
                        </button>

                        <button
                          style={{
                            borderColor: "#cd5c5c",
                            backgroundColor: "#cd5c5c",
                            // textAlign: "center",
                            // width: "9vw",
                            // borderColor: "#cd5c5c",
                            // color: "white",
                            // backgroundColor: "#cd5c5c",
                            // marginLeft:"5px",
                            // marginRight: "5px"
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
      
      {/* //Disapproved table */}
      <div id="DeanManageChangeReqTop">
          <h1 style={{ color: "#00304B" }}> Disapproved Request </h1>
        </div>

        <div id="DeanManageChangeReqBottom">
          <Table striped bordered hover id="DeanManageChangeReqTable">
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

      <DeanDialogue
        show={showDialog}
        handleClose={handleCloseDialog}
        handleSend={handleSend}
      />
    </div>
  );
}


      

export default DeanManageChangeReq;


































































































        //without backend complete frontend
// import * as React from "react";
// import { useState } from "react";
// import Table from "react-bootstrap/Table";
// import { Link, useNavigate } from "react-router-dom";
// import "./deanManageChangeReq.css";
// import SideBar from '../SideBar';

// function DeanManageChangeReq() {
//   const nav = useNavigate();
//   const [results, setResults] = useState([
//     // your data
//     {
//       id: 1,
//       courseNo: 'CSE101',
//       courseName: 'Introduction to Data Science',
//       class: 'SE-21',
//       instructorName: 'Ms. Javeria Imran',
//       reason: 'I want to change result because mistakenly I entered the wrong seat number',
//       action: null,
//       disapprovalReason: ''
//     },
//     {
//       id: 2,
//       courseNo: 'CSE105',
//       courseName: 'Web Engineering',
//       class: 'CS-20',
//       instructorName: 'Ms. Surraiya Obaid',
//       reason: 'Enter wrong seat no.',
//       action: null,
//       disapprovalReason: ''
//     },
//     {
//       id: 3,
//       courseNo: 'CSE101',
//       courseName: 'Introduction to Computer Science',
//       class: 'SE-21',
//       instructorName: 'Ms. Ayesha Shah',
//       reason: 'Enter wrong seat no.',
//       action: null,
//       disapprovalReason: ''
//     },
//     {
//       id: 4,
//       courseNo: 'CSE101',
//       courseName: 'Introduction to Computer Science',
//       class: 'CS-21',
//       instructorName: 'Ms.Ayesha Shamim',
//       reason: 'Enter wrong seat no.',
//       action: null,
//       disapprovalReason: ''
//     },
//     {
//       id: 5,
//       courseNo: 'CSE101',
//       courseName: 'Introduction to Computer Science',
//       class: 'SE-21',
//       instructorName: 'Ms. Ayesha Shamim',
//       reason: 'Enter wrong seat no.',
//       action: null,
//       disapprovalReason: ''
//     },
//     {
//       id: 6,
//       courseNo: 'CSE101',
//       courseName: 'Introduction to Computer Science',
//       class: 'SE-21',
//       instructorName: 'Ms. Ayesha Shamim',
//       reason: 'Enter wrong seat no.',
//       action: null,
//       disapprovalReason: ''
//     },
//     {
//         id: 7,
//         courseNo: 'CSE101',
//         courseName: 'Introduction to Computer Science',
//         class: 'SE-21',
//         instructorName: 'Ms. Ayesha Shamim',
//         reason: 'Enter wrong seat no.',
//         action: null,
//         disapprovalReason: ''
//     },
//     {
//         id: 8,
//         courseNo: 'CSE101',
//         courseName: 'Introduction to Computer Science',
//         class: 'SE-21',
//         instructorName: 'Ms. Ayesha Shamim',
//         reason: 'Enter wrong seat no.',
//         action: null,
//         disapprovalReason: ''
//     },
//   ]);

//   const [showPopup, setShowPopup] = React.useState(false);
//   const [selectedResultId, setSelectedResultId] = useState(null);
//   const [disapprovalReason, setDisapprovalReason] = useState('');

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
//     setSelectedResultId(id);
//     setShowPopup(true);
//   };

//   const handleSendDisapproval = () => {
//     if (disapprovalReason.trim() === '') {
//       // If no disapproval reason is provided, just set action to 'disapprove'
//       setResults(prevResults =>
//         prevResults.map(result => 
//           result.id === selectedResultId 
//           ? { ...result, action: 'disapprove', disapprovalReason: '' } 
//           : result
//         )
//       );
//     } else {
//       setResults(prevResults =>
//         prevResults.map(result => 
//           result.id === selectedResultId 
//           ? { ...result, action: 'disapprove', disapprovalReason } 
//           : result
//         )
//       );
//     }
//     setShowPopup(false);
//     setDisapprovalReason("");
//   };

//   return (
//     <div id="DeanManageChangeReqMainDiv">
//       <SideBar />

//       <div id="DeanManageChangeReqWithoutBar">
        
//         <div id="DeanManageChangeReqTop">
//           <h1 style={{ color: "#00304B" }}> Result Change Request</h1>
//         </div>

//         <div id="DeanManageChangeReqBottom">
//           <Table striped bordered hover id="DeanManageChangeReqTable">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Course Number</th>
//                 <th>Course Name</th>
//                 <th>Class</th>
//                 <th>Instructor Name</th>
//                 <th>Message/Reason</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {results.map((result) => (
//                 <tr key={result.id}>
//                   <td>{result.id}</td>
//                   <td>{result.courseNo}</td>
//                   <td>{result.courseName}</td>
//                   <td style={{ whiteSpace: 'nowrap' }}>{result.class}</td>
//                   <td>{result.instructorName}</td>
//                   <td style={{ whiteSpace: 'pre-wrap' }}>{result.reason}</td>
//                   <td>
//                     {result.action === null ? (
//                       <>
//                         <button
//                           style={{
//                             textAlign: "center",
//                             width: "9vw",
//                             borderColor: "#90ee90",
//                             color: "white",
//                             backgroundColor: "#90ee90",
//                             marginLeft:"5px",
//                             marginRight: "5px"
//                           }}
//                           onClick={() => handleApprove(result.id)}
//                         >
//                           Approve
//                         </button>

//                         <button
//                           style={{
//                             textAlign: "center",
//                             width: "9vw",
//                             borderColor: "#cd5c5c",
//                             color: "white",
//                             backgroundColor: "#cd5c5c",
//                             marginLeft:"5px",
//                             marginRight: "5px"
//                           }}
//                           onClick={() => handleDisapprove(result.id)}
//                         >
//                           Disapprove
//                         </button>
//                       </>
//                     ) : (
//                       <div id="DeanManageChangeReqBtnStatusContainer">
//                         <button 
//                           id="DeanManageChangeReqBtnStatus"
//                           style={{borderColor: result.action === 'approve' ? "green" : "red", color: "white", backgroundColor: result.action === 'approve' ? "#8BC34A" : "#F44336", marginLeft:"5px", marginRight: "5px", textAlign: "center", width: "9vw" }}
//                           disabled 
//                         >
//                           {result.action === 'approve' ? "Approved" : "Disapproved"}
//                         </button>
//                         {result.action === 'disapprove' && result.disapprovalReason && (
//                           <div> 
//                             <strong>Reason:</strong> {result.disapprovalReason}
//                           </div>
//                         )}
//                       </div>
                      
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
        
//       </div>

//       {showPopup && (
//         <div id="deanChangeReqPopup">
//           <div id="deanChangeReqPopupInner">
//             <h2>Reason for Disapproval</h2>
//             <textarea
//               value={disapprovalReason}
//               onChange={(e) => setDisapprovalReason(e.target.value)}
//               placeholder="Enter reason for disapproval"
//             />
//             <button onClick={handleSendDisapproval} style={buttonStyle}>Send</button>
//             <button onClick={() => setShowPopup(false)} style={buttonStyle}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const buttonStyle = {
//   backgroundColor: '#00304B',
//   color: 'white',
//   border: 'none',
//   padding: '5px 10px',
//   margin: '5px',
//   cursor: 'pointer',
//   height: '7vh',
//   width: '8vw'
// };

// export default DeanManageChangeReq;











































//BOTH MODAL AND POPUP

// function DeanManageChangeReq() {
//   const nav = useNavigate();
//   const [results, setResults] = useState([
//     // your data
//     {
//       id: 1,
//       courseNo: 'CSE101',
//       courseName: 'Introduction to Data Science',
//       class: 'SE-21',
//       instructorName: 'Ms. Javeria Imran',
//       reason: 'I want to change result because mistakenly I entered the wrong seat number',
//       action: null,
//       disapprovalReason: ''
//     },
//     {
  //     id: 2,
  //     courseNo: 'CSE105',
  //     courseName: 'Web Engineering',
  //     class: 'CS-20',
  //     instructorName: 'Ms. Surraiya Obaid',
  //     reason: 'Enter wrong seat no.',
  //     action: null,
  //     disapprovalReason: ''
  //   },
  //   {
  //     id: 3,
  //     courseNo: 'CSE101',
  //     courseName: 'Introduction to Computer Science',
  //     class: 'SE-21',
  //     instructorName: 'Ms. Ayesha Shah',
  //     reason: 'Enter wrong seat no.',
  //     action: null,
  //     disapprovalReason: ''
  //   },
  //   {
  //     id: 4,
  //     courseNo: 'CSE101',
  //     courseName: 'Introduction to Computer Science',
  //     class: 'CS-21',
  //     instructorName: 'Ms.Ayesha Shamim',
  //     reason: 'Enter wrong seat no.',
  //     action: null,
  //     disapprovalReason: ''
  //   },
  //   {
  //     id: 5,
  //     courseNo: 'CSE101',
  //     courseName: 'Introduction to Computer Science',
  //     class: 'SE-21',
  //     instructorName: 'Ms. Ayesha Shamim',
  //     reason: 'Enter wrong seat no.',
  //     action: null,
  //     disapprovalReason: ''
  //   },
  //   {
  //     id: 6,
  //     courseNo: 'CSE101',
  //     courseName: 'Introduction to Computer Science',
  //     class: 'SE-21',
  //     instructorName: 'Ms. Ayesha Shamim',
  //     reason: 'Enter wrong seat no.',
  //     action: null,
  //     disapprovalReason: ''
  //   },
  //   {
  //       id: 7,
  //       courseNo: 'CSE101',
  //       courseName: 'Introduction to Computer Science',
  //       class: 'SE-21',
  //       instructorName: 'Ms. Ayesha Shamim',
  //       reason: 'Enter wrong seat no.',
  //       action: null,
  //       disapprovalReason: ''
  //   },
  //   {
  //       id: 8,
  //       courseNo: 'CSE101',
  //       courseName: 'Introduction to Computer Science',
  //       class: 'SE-21',
  //       instructorName: 'Ms. Ayesha Shamim',
  //       reason: 'Enter wrong seat no.',
  //       action: null,
  //       disapprovalReason: ''
  //   },
  // ]);


//   const [showPopup, setShowPopup] = React.useState(false);
//   const [selectedResultId, setSelectedResultId] = useState(null);
//   const [disapprovalReason, setDisapprovalReason] = useState('');
  
//   // const [showModal, setShowModal] = useState(false);
//   // const [selectedResultId, setSelectedResultId] = useState(null);
//   // const [disapprovalReason, setDisapprovalReason] = useState('');

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
//     setSelectedResultId(id);
//     setShowPopup(true);
//     // setShowModal(true);
//   };

//   // const handleModalClose = () => {
//   //   setShowModal(false);
//   //   setDisapprovalReason('');
//   // };

//   const handleSendDisapproval = () => {
//     setResults(prevResults =>
//       prevResults.map(result => 
//         result.id === selectedResultId 
//         ? { ...result, action: 'disapprove', disapprovalReason } 
//         : result
//       )
//     );
//     setShowPopup(false);
//     setDisapprovalReason("");
//     // handleModalClose();
//   };

//   return (
//     <div id="DeanManageChangeReqMainDiv">
//       <SideBar />

//       <div id="DeanManageChangeReqWithoutBar">
        
//         <div id="DeanManageChangeReqTop">
//           <h1 style={{ color: "#00304B" }}> Result Change Request</h1>
//         </div>

//         <div id="DeanManageChangeReqBottom">
//           <Table striped bordered hover id="DeanManageChangeReqTable">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Course Number</th>
//                 <th>Course Name</th>
//                 <th>Class</th>
//                 <th>Instructor Name</th>
//                 <th>Message/Reason</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {results.map((result) => (
//                 <tr key={result.id}>
//                   <td>{result.id}</td>
//                   <td>{result.courseNo}</td>
//                   <td>{result.courseName}</td>
//                   <td style={{ whiteSpace: 'nowrap' }}>{result.class}</td>
//                   <td>{result.instructorName}</td>
//                   <td style={{ whiteSpace: 'pre-wrap' }}>{result.reason}</td>
//                   <td>
//                     {result.action === null ? (
//                       <>

//                         <button
//                           style={{textAlign: "center", width: "9vw", borderColor: "#90ee90", color: "white", backgroundColor: "#90ee90", marginLeft:"5px", marginRight: "5px" }}
//                           onClick={() => {
//                             handleApprove(result.id);
//                           }}>
//                           Approve
//                         </button>

//                         <button
//                           style={{textAlign: "center", width: "9vw", borderColor: "#cd5c5c", color: "white", backgroundColor: "#cd5c5c", marginLeft:"5px", marginRight: "5px", textAlign: "center", width: "9vw" }}
//                           onClick={() => {
//                             handleDisapprove(result.id);
//                           }}>
//                           Disapprove
//                         </button>
//                       </>
//                     ) : (
                     
//                      <div id="statusContainer">
//                         <button id="btnStatus"
//                           style={{ borderColor: result.action === 'approve' ? "green" : "red", color: "white", backgroundColor: result.action === 'approve' ? "#8BC34A" : "#F44336", marginLeft:"5px", marginRight: "5px", textAlign: "center", width: "9vw" }}
//                           disabled >
//                           {result.action === 'approve' ? "Approved" : "Disapproved"}
//                         </button>
//                         {result.action === 'disapprove' && <div> <strong>Reason:</strong> {result.disapprovalReason}</div>}
//                       </div>

//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
        
//       </div>

          
//       {/* <Modal show={showModal} onHide={handleModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Disapproval Reason</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="disapprovalReason">
//               <Form.Label>Reason</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 placeholder="Enter reason for disapproval" 
//                 value={disapprovalReason} 
//                 onChange={(e) => setDisapprovalReason(e.target.value)} 
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleModalClose}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSendDisapproval}>
//             Send
//           </Button>
//         </Modal.Footer>
//       </Modal> */}


// {showPopup && (
//             <div className="popup">
//               <div className="popup-inner">
//                 <h2>Reason for Disapproval</h2>
//                 <textarea
//                   value={disapprovalReason}
//                   onChange={(e) => setDisapprovalReason(e.target.value)}
//                   placeholder="Enter reason for disapproval"
//                 />
//                 <button onClick={handleSendDisapproval} style={buttonStyle}>Send</button>
//                 <button onClick={() => setShowPopup(false)} style={buttonStyle}>Cancel</button>
//               </div>
//             </div>
//           )}

//     </div>
//   );
// }

// const buttonStyle = {
//   backgroundColor: '#00304B',
//   color: 'white',
//   border: 'none',
//   padding: '5px 10px',
//   margin: '5px',
//   cursor: 'pointer',
//   height: '7vh',
//   width: '8vw'
// };
// export default DeanManageChangeReq;





// WITHOUT POPUP APPROVED IN MID-1
// function DeanManageChangeReq() {
//   const nav = useNavigate();
//   const [results, setResults] = React.useState([
//     // your data
//     {
//       id: 1,
//       courseNo: 'CSE101',
//       courseName: 'Introduction to Data Science',
//       class: 'SE-21',
//       instructorName: 'Ms. Javeria Imran',
//       reason: 'I want to change result because mistakenly I enter wrong seat number',
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
//       instructorName: 'Ms. Ayesha Shah',
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
//       instructorName: 'Ms. Ayesha Shamim',
//       reason: 'Enter wrong seat no.',
//       action: null
//     },
//     {
//       id: 6,
//       courseNo: 'CSE101',
//       courseName: 'Introduction to Computer Science',
//       class: 'SE-21',
//       instructorName: 'Ms. Ayesha Shamim',
//       reason: 'Enter wrong seat no.',
//       action: null
//     },
//     {
//         id: 7,
//         courseNo: 'CSE101',
//         courseName: 'Introduction to Computer Science',
//         class: 'SE-21',
//         instructorName: 'Ms. Ayesha Shamim',
//         reason: 'Enter wrong seat no.',
//         action: null
//     },
//     {
//         id: 8,
//         courseNo: 'CSE101',
//         courseName: 'Introduction to Computer Science',
//         class: 'SE-21',
//         instructorName: 'Ms. Ayesha Shamim',
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
//     <div id="DeanManageChangeReqMainDiv">
//       <SideBar />

//       <div id="DeanManageChangeReqWithoutBar">
        
//         <div id="DeanManageChangeReqTop">
//           <h1 style={{ color: "#00304B" }}> Result Change Request</h1>
//         </div>

//         <div id="DeanManageChangeReqBottom">
//           <Table striped bordered hover id="DeanManageChangeReqTable">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Course Number</th>
//                 <th>Course Name</th>
//                 <th>Class</th>
//                 <th>Instructor Name</th>
//                 <th>Message/Reason</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {results.map((result) => (
//                 <tr key={result.id}>
//                   <td>{result.id}</td>
//                   <td>{result.courseNo}</td>
//                   <td>{result.courseName}</td>
//                   <td style={{ whiteSpace: 'nowrap' }}>{result.class}</td>
//                   <td>{result.instructorName}</td>
//                   <td style={{ whiteSpace: 'pre-wrap' }}>{result.reason}</td>
//                   <td>
//                     {result.action === null ? (
//                       <>

//                         <button
//                           style={{textAlign: "center", width: "9vw", borderColor: "#90ee90", color: "white", backgroundColor: "#90ee90", marginLeft:"5px", marginRight: "5px" }}
//                           onClick={() => {
//                             handleApprove(result.id);
//                           }}>
//                           Approve
//                         </button>

//                         <button
//                           style={{textAlign: "center",width: "9vw", borderColor: "#cd5c5c", color: "white", backgroundColor: "#cd5c5c", marginLeft:"5px", marginRight: "5px", textAlign: "center", width: "9vw", }}
//                           onClick={() => {
//                             handleDisapprove(result.id);
//                           }}>
//                           Disapprove
//                         </button>
//                       </>
//                     ) : (
//                       <button
//                         style={{ borderColor: result.action === 'approve' ? "green" : "red", color: "white", backgroundColor: result.action === 'approve' ? "#8BC34A" : "#F44336", marginLeft:"5px", marginRight: "5px", textAlign: "center", width: "9vw" }}
//                         disabled >
//                         {result.action === 'approve' ? "Approved" : "Disapproved"}
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
// export default DeanManageChangeReq;





// OLD
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