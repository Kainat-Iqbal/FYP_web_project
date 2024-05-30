import * as React from "react";
import "./hodmanageChangeReq.css";
import SideBar from "../SideBar";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";

function HODManageChangeReq() {
  const nav = useNavigate();
  const [results, setResults] = React.useState([
    // your data
    {
      id: 1,
      courseNo: 'CSE101',
      courseName: 'Introduction to Data Science',
      class: 'SE-21',
      instructorName: 'Ms.Javeria Imran',
      reason: 'I want to change result because mistakenly I enter wrong seat no.',
      action: null
    },
    {
      id: 2,
      courseNo: 'CSE105',
      courseName: 'Web Engineering',
      class: 'CS-20',
      instructorName: 'Ms. Surraiya Obaid',
      reason: 'Enter wrong seat no.',
      action: null
    },
    {
      id: 3,
      courseNo: 'CSE101',
      courseName: 'Introduction to Computer Science',
      class: 'SE-21',
      instructorName: 'Ms.Ayesha Shah',
      reason: 'Enter wrong seat no.',
      action: null
    },
    {
      id: 4,
      courseNo: 'CSE101',
      courseName: 'Introduction to Computer Science',
      class: 'CS-21',
      instructorName: 'Ms.Ayesha Shamim',
      reason: 'Enter wrong seat no.',
      action: null
    },
    {
      id: 5,
      courseNo: 'CSE101',
      courseName: 'Introduction to Computer Science',
      class: 'SE-21',
      instructorName: 'Ms.Ayesha Shamim',
      reason: 'Enter wrong seat no.',
      action: null
    },
    {
      id: 6,
      courseNo: 'CSE101',
      courseName: 'Introduction to Computer Science',
      class: 'SE-21',
      instructorName: 'Ms.Ayesha Shamim',
      reason: 'Enter wrong seat no.',
      action: null
    },
    {
        id: 7,
        courseNo: 'CSE101',
        courseName: 'Introduction to Computer Science',
        class: 'SE-21',
        instructorName: 'Ms.Ayesha Shamim',
        reason: 'Enter wrong seat no.',
        action: null
    },
    {
        id: 8,
        courseNo: 'CSE101',
        courseName: 'Introduction to Computer Science',
        class: 'SE-21',
        instructorName: 'Ms.Ayesha Shamim',
        reason: 'Enter wrong seat no.',
        action: null
    },
    
  ]);

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
    <div id="mainChangeReqDiv">
      <SideBar />
      <div id="changeReqWithoutBar">
        <div id="changeReqTop">
          <h1 style={{ color: "#00304B" }}> Result Change Request</h1>
        </div>

        <div id="changeReqBottom">
          <Table striped bordered hover id="changeReqTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Course Number</th>
                <th>Course Name</th>
                <th>Class</th>
                <th>Instructor Name</th>
                <th>Message/Reason</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>{result.id}</td>
                  <td>{result.courseNo}</td>
                  <td>{result.courseName}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{result.class}</td>
                  <td>{result.instructorName}</td>
                  <td style={{ whiteSpace: 'pre-wrap' }}>{result.reason}</td>
                  <td>
                    {result.action === null ? (
                      <>
                        <button
                          style={{textAlign: "center", width: "9vw", borderColor: "#90ee90", color: "white", backgroundColor: "#90ee90", marginLeft:"5px", marginRight: "5px" }}
                          onClick={() => {
                            handleApprove(result.id);
                          }}
                        >
                          Approve
                        </button>

                        <button
                          style={{textAlign: "center",width: "9vw", borderColor: "#cd5c5c", color: "white", backgroundColor: "#cd5c5c", marginLeft:"5px", marginRight: "5px", textAlign: "center", width: "9vw", }}
                          onClick={() => {
                            handleDisapprove(result.id);
                          }}
                        >
                          Disapprove
                        </button>
                      </>
                    ) : (
                      <button
                        style={{ borderColor: result.action === 'approve' ? "green" : "red", color: "white", backgroundColor: result.action === 'approve' ? "#8BC34A" : "#F44336", marginLeft:"5px", marginRight: "5px", textAlign: "center", width: "9vw" }}
                        disabled
                      >
                        {result.action === 'approve' ? "Approved" : "Disapproved"}
                      </button>
                    )}
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