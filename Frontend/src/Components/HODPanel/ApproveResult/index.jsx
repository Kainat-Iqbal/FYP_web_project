import * as React from "react";
import "./style.css";
import SideBar from "../SideBar";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";

function ApproveResult() {
  const nav = useNavigate();
  const [results, setResults] = React.useState([
    {
      id: 1,
      courseNo: 'CSE101',
      courseName: 'Introduction to Data Science',
      class: 'SE-21',
      instructorName: 'Ms.Javeria Imran',
      action: null
    },
    {
      id: 2,
      courseNo: 'CSE105',
      courseName: 'Web Engineering',
      class: 'CS-20',
      instructorName: 'Ms. Surraiya Obaid',
      action: null
    },
    {
      id: 3,
      courseNo: 'CSE101',
      courseName: 'Introduction to Computer Science',
      class: 'SE-21',
      instructorName: 'Ms.Ayesha Shah',
      action: null
    },
    {
      id: 4,
      courseNo: 'CSE101',
      courseName: 'Introduction to Computer Science',
      class: 'CS-21',
      instructorName: 'Ms.Ayesha Shamim',
      action: null
    },
    {
      id: 5,
      courseNo: 'CSE101',
      courseName: 'Introduction to Computer Science',
      class: 'SE-21',
      instructorName: 'Ms.Ayesha Shamim',
      action: null
    },
    {
      id: 6,
      courseNo: 'CSE101',
      courseName: 'Introduction to Computer Science',
      class: 'SE-21',
      instructorName: 'Ms.Ayesha Shamim',
      action: null
    },
    {
      id: 7,
      courseNo: 'CSE101',
      courseName: 'Introduction to Computer Science',
      class: 'SE-21',
      instructorName: 'Ms.Ayesha Shamim',
      action: null
    },
    {
      id: 8,
      courseNo: 'CSE101',
      courseName: 'Introduction to Computer Science',
      class: 'SE-21',
      instructorName: 'Ms.Ayesha Shamim',
      action: null
    },
    {
      id: 9,
      courseNo: 'CSE101',
      courseName: 'Introduction to Computer Science',
      class: 'SE-21',
      instructorName: 'Ms.Ayesha Shamim',
      action: null
    },
    {
      id: 10,
      courseNo: 'CSE101',
      courseName: 'Introduction to Computer Science',
      class: 'SE-21',
      instructorName: 'Ms.Ayesha Shamim',
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
    <div id="mainApproveResultDiv">
      <SideBar />
      <div id="approveResultWithoutBar">
        <div id="approveResultTop">
          <h1 style={{ color: "#00304B" }}> Result Approval</h1>
        </div>

        <div id="approveResultBottom">
          <Table striped bordered hover id="viewTeacherTable">
            <thead>
              <tr>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
                  ID
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
                  Course No
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center"  }}>
                  Course Name
                </th>
                <th style={{ backgroundColor: "#00304B", color: "white", textAlign: "center" }}>
                  Class
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
                <tr key={result.id}>
                  <td>{result.id}</td>
                  <td>{result.courseNo}</td>
                  <td>{result.courseName}</td>
                  <td>{result.class}</td>
                  <td>{result.instructorName}</td>
                  <td>
                    {result.action === null && (
                      <>
                        <button
                          style={{ borderColor: "#add8e6", color: "black", backgroundColor: "#add8e6", marginLeft:"20px" }}
                          onClick={() => {
                            nav("/hodViewResult");
                          }}
                        >
                          View Result
                        </button>
                        <button
                          style={{ borderColor: "#90ee90", color: "black", backgroundColor: "#90ee90",marginLeft:"7px" }}
                          onClick={() => {
                            handleApprove(result.id);
                          }}
                        >
                          Approve
                        </button>
                        <button
                          style={{ borderColor: "#cd5c5c", color: "black", backgroundColor: "#cd5c5c", marginLeft:"7px" }}
                          onClick={() => {
                            handleDisapprove(result.id);
                          }}
                        >
                          Disapprove
                        </button>
                      </>
                    )}
                    {result.action === 'approve' && (
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

export default ApproveResult;








//ONLY VIEW RESULT BUTTON
// import * as React from "react";
// import "./style.css";
// import SideBar from "../SideBar";
// import Table from "react-bootstrap/Table";
// import { Link, useNavigate } from "react-router-dom";
// // import { Edit } from "@mui/icons-material";

// function ApproveResult() {
//     const nav = useNavigate();
//     const results = [
//         {
//           id: 1,
//           courseNo: 'CSE101',
//           courseName: 'Introduction to Data Science',
//           class: 'SE-21',
//           instructorName: 'Ms.Javeria Imran'
//         },
//         {
//             id: 2,
//             courseNo: 'CSE105',
//             courseName: 'Web Engineering',
//             class: 'CS-20',
//             instructorName: 'Ms. Surraiya Obaid'
//           },
//           {
//             id: 3,
//             courseNo: 'CSE101',
//             courseName: 'Introduction to Computer Science',
//             class: 'SE-21',
//             instructorName: 'Ms.Ayesha Shah'

//           },
//           {
//             id: 4,
//             courseNo: 'CSE101',
//             courseName: 'Introduction to Computer Science',
//             class: 'CS-21',
//             instructorName: 'Ms.Ayesha Shamim'
//           },
//           {
//             id: 5,
//             courseNo: 'CSE101',
//             courseName: 'Introduction to Computer Science',
//             class: 'SE-21',
//             instructorName: 'Ms.Ayesha Shamim'
//           },
//           {
//             id: 6,
//             courseNo: 'CSE101',
//             courseName: 'Introduction to Computer Science',
//             class: 'SE-21',
//             instructorName: 'Ms.Ayesha Shamim'
//           },
//           {
//             id: 7,
//             courseNo: 'CSE101',
//             courseName: 'Introduction to Computer Science',
//             class: 'SE-21',
//             instructorName: 'Ms.Ayesha Shamim'
//           },
//           {
//             id: 8,
//             courseNo: 'CSE101',
//             courseName: 'Introduction to Computer Science',
//             class: 'SE-21',
//             instructorName: 'Ms.Ayesha Shamim'
//           },
//           {
//             id: 9,
//             courseNo: 'CSE101',
//             courseName: 'Introduction to Computer Science',
//             class: 'SE-21',
//             instructorName: 'Ms.Ayesha Shamim'
//           },
//           {
//             id: 10,
//             courseNo: 'CSE101',
//             courseName: 'Introduction to Computer Science',
//             class: 'SE-21',
//             instructorName: 'Ms.Ayesha Shamim'
//           },
//         // Add more data as needed
//       ];

//   return (
//     <div id="mainApproveResultDiv">
//         <SideBar />
//       <div id="approveResultWithoutBar">
//         <div id="approveResultTop">
//         <h1 style={{ color: "#00304B" }} > Result Approval</h1>
//         </div>

//         <div id="approveResultBottom">
//           <Table striped bordered hover id="viewTeacherTable">
//             <thead>
//               <tr>
//                 <th style={{ backgroundColor: "#00304B", color: "white" }}>
//                   ID
//                 </th>
//                 <th style={{ backgroundColor: "#00304B", color: "white" }}>
//                   Course No
//                 </th>
//                 <th style={{ backgroundColor: "#00304B", color: "white" }}>
//                   Course Name
//                 </th>
//                 <th style={{ backgroundColor: "#00304B", color: "white" }}>
//                   Class
//                 </th>
//                 <th style={{ backgroundColor: "#00304B", color: "white" }}>
//                   Instructor Name
//                 </th>
//                 <th style={{ backgroundColor: "#00304B", color: "white" }}>
//                   Action
//                 </th>
//               </tr>
//             </thead>
            
//             <tbody>
//           {results.map((result) => (
//             <tr key={result.id}>
//               <td>{result.id}</td>
//               <td>{result.courseNo}</td>
//               <td>{result.courseName}</td>
//               <td>{result.class}</td>
//               <td>{result.instructorName}</td>
//               <td>
//                 {/* <Link to={`/ViewResult/${result.id}`}> */}
//                   <button style={{ borderColor:"yellow", color:"black", backgroundColor: "yellow"}} 
//                   onClick={() => {
//                     nav("/ViewResult");
//                      }}>
//                       View Result
//                   </button>
//                   <button style={{ borderColor:"green", color:"black", backgroundColor: "green"}} 
//                   onClick={() => {
//                     nav("/ViewResult");
//                      }}>
//                       Approve
//                   </button>
//                   <button style={{ borderColor:"red", color:"black", backgroundColor: "red"}} 
//                   onClick={() => {
//                     nav("/ViewResult");
//                      }}>
//                       Disapprove
//                   </button>
//                 {/* </Link> */}
//               </td>
//             </tr>
//           ))}
        
//               {/* <tr>
//                 <td>1</td>
//                 <td>Mark</td>
//                 <td>Otto</td>
//                 <td>@mdo</td>
//                 <td>Otto</td>
//                 <td>
//                   <a href="#">
//                     <Edit />
//                   </a>
//                 </td>
//               </tr> */}

//             </tbody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default ApproveResult;
