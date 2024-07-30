import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "./studentViewProforma.css";
import SideBar from "../SideBar";

function StudentViewProforma() {
  const [showPopup, setShowPopup] = useState(true);
  
  // Extract CGPA value from the component
  const cgpa = 3.84; // You should get this value dynamically if possible
  
  const handleClose = () => {
    setShowPopup(false);
  };

  // Determine the message based on CGPA
  const getCgpaMessage = (cgpa) => {
    if (cgpa < 3.00) {
      return `Your current CGPA is ${cgpa}. It's important to reflect on your performance and identify areas for improvement. With dedication and effort, you can turn things around. Stay motivated and keep striving for better results!`;
    } else if (cgpa <= 3.50) {
      return `Your current CGPA is ${cgpa}. You're doing well, and your dedication is evident.You're making steady progress, and with a bit more effort, you'll reach even greater heights. Keep up the good work!`;
    } else {
      return `Your current CGPA is ${cgpa}. You're on a great path, and your hard work is showing. Keep up the excellent effort and maintain your focus. Keep it up!`;
    }
  };

  return (
    <div id="StudentViewProformaMainDiv">
      <SideBar />

      <div id="StudentViewProformaWithoutBar">
      <div id="StudentViewProformaTopBar">
          <div id="StudentViewProformaTop">
            <img src={require("./uniLogo.png")} alt="Logo" className="logo" />
            <div id="StudentViewProformaMainHeading">
              <h1> JINNAH UNIVERSITY FOR WOMEN </h1>
              <h3> Provisional Marks Proforma</h3>
              <h4> Academic Year 2021 </h4>
            </div>
          </div>

          <div id="StudentViewProformaInfo">
            <div id="StudentViewProformaLeftInfo">
              <p style={{ fontWeight: "bold" }}> Student's Name :
                <span style={{
                  marginLeft: "10%",
                  display: 'inline-block',
                  fontWeight: 'normal'
                }}> Laiba Khalid </span>
              </p>

              <p style={{ fontWeight: "bold" }}> Father's Name :
                <span style={{
                  marginLeft: "13%",
                  display: 'inline-block',
                  fontWeight: 'normal'
                }}> Muhammad Khalid </span>
              </p>

              <p style={{ fontWeight: "bold" }}> Enrollment # :
                <span style={{
                  marginLeft: "15%",
                  display: 'inline-block',
                  fontWeight: 'normal'
                }}> 2021/Comp/BS(SE)/27025 </span>
              </p>

              <p style={{ fontWeight: "bold" }}> Department :
                <span style={{
                  marginLeft: "80px",
                  display: 'inline-block',
                  fontWeight: 'normal'
                }}> Computer Science & Software Engineering </span>
              </p>
            </div>

            <div id="StudentViewProformaRightInfo">
              <p style={{ fontWeight: "bold" }}> Class :
                <span style={{
                  marginLeft: "72%",
                  display: 'inline-block',
                  fontWeight: 'normal'
                }}> BS(SE)</span>
              </p>

              <p style={{ fontWeight: "bold" }}> Seat # :
                <span style={{
                  marginLeft: "64%",
                  display: 'inline-block',
                  fontWeight: 'normal'
                }}> 2124533 </span>
              </p>

              <p style={{ fontWeight: "bold" }}> Year :
                <span style={{
                  marginLeft: "70%",
                  display: 'inline-block',
                  fontWeight: 'normal'
                }}> 1st Year </span>
              </p>
              <p style={{ fontWeight: "bold" }}> Semester :
                <span style={{
                  marginLeft: "51%",
                  display: 'inline-block',
                  fontWeight: 'normal'
                }}> Semester II </span>
              </p>
            </div>
          </div>
        </div>

        <table id="StudentViewProformaCoursesTable">
          <thead>
            <tr>
              <th>Course Code</th>
              <th> Midterm <br /> 20 </th>
              <th> Lab <br /> 30 </th>
              <th> Terminal <br /> 50/80 </th>
              <th> Total <br /> 100 </th>
              <th> Credit <br /> Hrs </th>
              <th> GP </th>
              <th> Grade </th>
              <th> Failed </th>
              <th> Repeat </th>
              <th> Remarks </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> CSS 1032 </td>
              <td> 15 </td>
              <td> - </td>
              <td> 57 </td>
              <td> 72 </td>
              <td> 3+0 </td>
              <td> 3.00 </td>
              <td> B </td>
              <td> 0 </td>
              <td> 0 </td>
              <td>   </td>
            </tr>
            <tr>
              <td> CSS 1042 </td>
              <td> 15 </td>
              <td> 24 </td>
              <td> 32 </td>
              <td> 71 </td>
              <td> 3+1 </td>
              <td> 3.00 </td>
              <td> B </td>
              <td> 0 </td>
              <td> 0 </td>
              <td>   </td>
            </tr>
            <tr>
              <td> CSS 1582 </td>
              <td> 12 </td>
              <td> 27 </td>
              <td> 33 </td>
              <td> 75 </td>
              <td> 2+1 </td>
              <td> 3.33 </td>
              <td> B+ </td>
              <td> 0 </td>
              <td> 0 </td>
              <td>   </td>
            </tr>
            <tr>
              <td> GED 1042 </td>
              <td> 19 </td>
              <td> - </td>
              <td> 57 </td>
              <td> 76 </td>
              <td> 2+0 </td>
              <td> 3.33 </td>
              <td> B+ </td>
              <td> 0 </td>
              <td> 0 </td>
              <td>   </td>
            </tr>
            <tr>
              <td> GED 1052 </td>
              <td> 18 </td>
              <td> - </td>
              <td> 70 </td>
              <td> 88 </td>
              <td> 3+0 </td>
              <td> 4.00 </td>
              <td> A </td>
              <td> 0 </td>
              <td> 0 </td>
              <td> </td>
            </tr>
            <tr>
              <td> LIN 1152 </td>
              <td> 16 </td>
              <td> - </td>
              <td> 69 </td>
              <td> 85 </td>
              <td> 3+0 </td>
              <td> 4.00 </td>
              <td> A </td>
              <td> 0 </td>
              <td> 0 </td>
              <td>   </td>
            </tr>
          </tbody>
        </table>

        <div id="StudentViewProformaSemesterTable">
          <table id="stdntSemesterTable">
            <thead>
              <tr>
                <th>SEMESTER</th>
                <th>I</th>
                <th>II</th>
                <th>III</th>
                <th>IV</th>
                <th>V</th>
                <th>VI</th>
                <th>VII</th>
                <th>VIII</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> <strong> GPA </strong> </td>
                <td>3.60</td>
                <td>3.42</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>3.51</td>

              </tr>
              <tr>
                <td> <strong> MARKS </strong> </td>
                <td>488</td>
                <td>467</td><td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>955</td>
              </tr>
              <tr>
                <td> <strong> PERCENTAGE (%) </strong> </td>
                <td>81.33</td>
                <td>77.83</td><td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>79.58</td>
              </tr>
              <tr>
                <td> <strong> COURSES CLEARED  </strong> </td>
                <td>6/6</td>
                <td>6/6</td><td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div id="cgpaBox">
          <p>
            The CGPA up to this semester is <strong>{cgpa}</strong>. The CGPA required for the award of degree is 2.2.
          </p>
        </div>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>CGPA Notification</h2>
              <p>{getCgpaMessage(cgpa)}</p>
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        )}

        <div id="SudentViewProformaSignatures">
        <div id="SudentViewProformaLeftSigns">
            <b style={{ marginTop: "2%" }}> Prepared by :
              <span style={{
                marginLeft: "2%",
                borderBottom: '1px solid black',
                width: '40%',
                display: 'inline-block',
                fontWeight: 'normal'
              }}></span>
            </b>

            <p style={{ marginTop: "6%", fontWeight: "bold" }}> Checked by :
              <span style={{
                marginLeft: "2%",
                marginTop: "8px",
                borderBottom: '1px solid black',
                width: '40%',
                display: 'inline-block'
              }}></span>
            </p>

            <p style={{ marginTop: "6%", fontWeight: "bold" }}> D.C.E :
              <span style={{
                marginLeft: "12%",
                marginTop: "8px",
                borderBottom: '1px solid black',
                width: '40%',
                display: 'inline-block'
              }}></span>
            </p>

            <p style={{ marginTop: "4%", fontWeight: "bold" }}> Date :
              <span style={{
                marginLeft: "13%",
                marginTop: "8px",
                width: '40%',
                display: 'inline-block',
                fontWeight: 'normal'
              }}> 08/03/2022 </span>
            </p>
          </div>

          <div id="SudentViewProformaRightSign">
            <p style={{
              marginTop: "34%",
              fontWeight: "bold"
            }}> Controller of Examinations
            </p>
          </div>
        </div>

        <div id="SudentViewProformaFooter">
        <p>50% passing marks per course for 2015 enrollment.</p>
          <p>60% passing marks per course for 2016 enrollment onwards.</p>
          <p>Note: University reserves the right to correct any inadvertent error that may be detected in the program.</p>
        </div>
      </div>
    </div>
  );
}

export default StudentViewProforma;


// import * as React from "react";
// import Table from "react-bootstrap/Table";
// import { useNavigate } from "react-router-dom";
// import "./studentViewProforma.css";
// import SideBar from "../SideBar";

// function StudentViewProforma() {
//   return (

//     <div id="StudentViewProformaMainDiv">
//       <SideBar />

//       <div id="StudentViewProformaWithoutBar">

//         <div id="StudentViewProformaTopBar">
//           <div id="StudentViewProformaTop">
//             <img src={require("./uniLogo.png")} alt="Logo" className="logo" />
//             <div id="StudentViewProformaMainHeading">
//               <h1> JINNAH UNIVERSITY FOR WOMEN </h1>
//               <h3> Provisional Marks Proforma</h3>
//               <h4> Academic Year 2021 </h4>
//             </div>
//           </div>

//           <div id="StudentViewProformaInfo">
//             <div id="StudentViewProformaLeftInfo">
//               <p style={{ fontWeight: "bold" }}> Student's Name :
//                 <span style={{
//                   marginLeft: "10%",
//                   display: 'inline-block',
//                   fontWeight: 'normal'
//                 }}> Laiba Khalid </span>
//               </p>

//               <p style={{ fontWeight: "bold" }}> Father's Name :
//                 <span style={{
//                   marginLeft: "13%",
//                   display: 'inline-block',
//                   fontWeight: 'normal'
//                 }}> Muhammad Khalid </span>
//               </p>

//               <p style={{ fontWeight: "bold" }}> Enrollment # :
//                 <span style={{
//                   marginLeft: "15%",
//                   display: 'inline-block',
//                   fontWeight: 'normal'
//                 }}> 2021/Comp/BS(SE)/27025 </span>
//               </p>

//               <p style={{ fontWeight: "bold" }}> Department :
//                 <span style={{
//                   marginLeft: "80px",
//                   display: 'inline-block',
//                   fontWeight: 'normal'
//                 }}> Computer Science & Software Engineering </span>
//               </p>
//             </div>

//             <div id="StudentViewProformaRightInfo">
//               <p style={{ fontWeight: "bold" }}> Class :
//                 <span style={{
//                   marginLeft: "72%",
//                   display: 'inline-block',
//                   fontWeight: 'normal'
//                 }}> BS(SE)</span>
//               </p>

//               <p style={{ fontWeight: "bold" }}> Seat # :
//                 <span style={{
//                   marginLeft: "64%",
//                   display: 'inline-block',
//                   fontWeight: 'normal'
//                 }}> 2124533 </span>
//               </p>

//               <p style={{ fontWeight: "bold" }}> Year :
//                 <span style={{
//                   marginLeft: "70%",
//                   display: 'inline-block',
//                   fontWeight: 'normal'
//                 }}> 1st Year </span>
//               </p>
//               <p style={{ fontWeight: "bold" }}> Semester :
//                 <span style={{
//                   marginLeft: "51%",
//                   display: 'inline-block',
//                   fontWeight: 'normal'
//                 }}> Semester II </span>
//               </p>
//             </div>
//           </div>
//         </div>

//         <table id="StudentViewProformaCoursesTable">
//           <thead>
//             <tr>
//               <th>Course Code</th>
//               <th> Midterm <br /> 20 </th>
//               <th> Lab <br /> 30 </th>
//               <th> Terminal <br /> 50/80 </th>
//               <th> Total <br /> 100 </th>
//               <th> Credit <br /> Hrs </th>
//               <th> GP </th>
//               <th> Grade </th>
//               <th> Failed </th>
//               <th> Repeat </th>
//               <th> Remarks </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td> CSS 1032 </td>
//               <td> 15 </td>
//               <td> - </td>
//               <td> 57 </td>
//               <td> 72 </td>
//               <td> 3+0 </td>
//               <td> 3.00 </td>
//               <td> B </td>
//               <td> 0 </td>
//               <td> 0 </td>
//               <td>   </td>
//             </tr>
//             <tr>
//               <td> CSS 1042 </td>
//               <td> 15 </td>
//               <td> 24 </td>
//               <td> 32 </td>
//               <td> 71 </td>
//               <td> 3+1 </td>
//               <td> 3.00 </td>
//               <td> B </td>
//               <td> 0 </td>
//               <td> 0 </td>
//               <td>   </td>
//             </tr>
//             <tr>
//               <td> CSS 1582 </td>
//               <td> 12 </td>
//               <td> 27 </td>
//               <td> 33 </td>
//               <td> 75 </td>
//               <td> 2+1 </td>
//               <td> 3.33 </td>
//               <td> B+ </td>
//               <td> 0 </td>
//               <td> 0 </td>
//               <td>   </td>
//             </tr>
//             <tr>
//               <td> GED 1042 </td>
//               <td> 19 </td>
//               <td> - </td>
//               <td> 57 </td>
//               <td> 76 </td>
//               <td> 2+0 </td>
//               <td> 3.33 </td>
//               <td> B+ </td>
//               <td> 0 </td>
//               <td> 0 </td>
//               <td>   </td>
//             </tr>
//             <tr>
//               <td> GED 1052 </td>
//               <td> 18 </td>
//               <td> - </td>
//               <td> 70 </td>
//               <td> 88 </td>
//               <td> 3+0 </td>
//               <td> 4.00 </td>
//               <td> A </td>
//               <td> 0 </td>
//               <td> 0 </td>
//               <td> </td>
//             </tr>
//             <tr>
//               <td> LIN 1152 </td>
//               <td> 16 </td>
//               <td> - </td>
//               <td> 69 </td>
//               <td> 85 </td>
//               <td> 3+0 </td>
//               <td> 4.00 </td>
//               <td> A </td>
//               <td> 0 </td>
//               <td> 0 </td>
//               <td>   </td>
//             </tr>
//           </tbody>
//         </table>

//         <div id="StudentViewProformaSemesterTable">
//           <table id="stdntSemesterTable">
//             <thead>
//               <tr>
//                 <th>SEMESTER</th>
//                 <th>I</th>
//                 <th>II</th>
//                 <th>III</th>
//                 <th>IV</th>
//                 <th>V</th>
//                 <th>VI</th>
//                 <th>VII</th>
//                 <th>VIII</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td> <strong> GPA </strong> </td>
//                 <td>3.60</td>
//                 <td>3.42</td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td>3.51</td>

//               </tr>
//               <tr>
//                 <td> <strong> MARKS </strong> </td>
//                 <td>488</td>
//                 <td>467</td><td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td>955</td>
//               </tr>
//               <tr>
//                 <td> <strong> PERCENTAGE (%) </strong> </td>
//                 <td>81.33</td>
//                 <td>77.83</td><td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td>79.58</td>
//               </tr>
//               <tr>
//                 <td> <strong> COURSES CLEARED  </strong> </td>
//                 <td>6/6</td>
//                 <td>6/6</td><td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div id="cgpaBox">
//           <p> The CGPA upto this semester is <strong> 3.51 </strong> . The CGPA required for the award of degree is 2.2  </p>
//         </div>

//         <div id="SudentViewProformaSignatures">

//           <div id="SudentViewProformaLeftSigns">
//             <b style={{ marginTop: "2%" }}> Prepared by :
//               <span style={{
//                 marginLeft: "2%",
//                 borderBottom: '1px solid black',
//                 width: '40%',
//                 display: 'inline-block',
//                 fontWeight: 'normal'
//               }}></span>
//             </b>

//             <p style={{ marginTop: "6%", fontWeight: "bold" }}> Checked by :
//               <span style={{
//                 marginLeft: "2%",
//                 marginTop: "8px",
//                 borderBottom: '1px solid black',
//                 width: '40%',
//                 display: 'inline-block'
//               }}></span>
//             </p>

//             <p style={{ marginTop: "6%", fontWeight: "bold" }}> D.C.E :
//               <span style={{
//                 marginLeft: "12%",
//                 marginTop: "8px",
//                 borderBottom: '1px solid black',
//                 width: '40%',
//                 display: 'inline-block'
//               }}></span>
//             </p>

//             <p style={{ marginTop: "4%", fontWeight: "bold" }}> Date :
//               <span style={{
//                 marginLeft: "13%",
//                 marginTop: "8px",
//                 width: '40%',
//                 display: 'inline-block',
//                 fontWeight: 'normal'
//               }}> 08/03/2022 </span>
//             </p>
//           </div>

//           <div id="SudentViewProformaRightSign">
//             <p style={{
//               marginTop: "34%",
//               fontWeight: "bold"
//             }}> Controller of Examinations
//             </p>
//           </div>
//         </div>

//         <div id="SudentViewProformaFooter">
//           <p>50% passing marks per course for 2015 enrollment.</p>
//           <p>60% passing marks per course for 2016 enrollment onwards.</p>
//           <p>Note: University reserves the right to correct any inadvertent error that may be detected in the program.</p>
//         </div>

//       </div>
//     </div>


//   );
// };

// export default StudentViewProforma;

