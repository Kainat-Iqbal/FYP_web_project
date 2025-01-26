import * as React from "react";
import "./addSession.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";

function AddSession() {
  const [admin, setAdminId] = useState(null);
  const [batch, setBatch] = useState([]);
  const [degree, setDegree] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/session", {
          withCredentials: true,
        });
        setAdminId(response.data.userId);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  console.log("Admin", admin);

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const res = await axios.get("http://localhost:8081/sessionUni/Get");
        setBatch(res.data.batch);
        console.log("batch", batch);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchBatch();
  }, []);

  useEffect(() => {
    const fetchDegree = async () => {
      try {
        const res = await axios.get("http://localhost:8081/SessionUni/Get");
        setDegree(res.data.degree_program);
        console.log("first", degree);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDegree();
  }, []);

  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  const handleDegreeChange = (event) => {
    const degreeName = event.target.value;
    setSelectedDegree(degreeName);
  };

  const handleBatchChange = (event) => {
    const batchName = event.target.value;
    setSelectedBatch(batchName);
  };

  const [values, setValues] = useState({
    adminId: admin,
    academic_year: new Date().getFullYear(),
    semester: "I",
    batchId: "",
    programId: "",
  });

  useEffect(() => {
    // Update values after admin is set
    if (admin !== null) {
      setValues((prev) => ({
        ...prev,
        adminId: admin,
      }));
    }
  }, [admin]);

  // Function to handle changes in input field
  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "", // Clear error when user starts typing
    }));
  };

  console.log("val", values);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    if (!selectedDegree) newErrors.degree = "Please select class";
    if (!selectedBatch) newErrors.batch = "Please select batch";

    setErrors(newErrors);

    // If there are no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      // Update values with selected degree and batch
      const updatedValues = {
        ...values,
        programId: selectedDegree,
        batchId: selectedBatch,
      };

      try {
        console.log("Submitting values:", updatedValues); // Debugging log

        // Await the response from the POST request
        const res = await axios.post("http://localhost:8081/SessionUni/Add", updatedValues);

        console.log("Server response:", res.data); // Debugging log

        // Check for the "success" response and display the appropriate alert
        if (res.data === "success") {
          alert("Session is added successfully");
          window.location.reload(); // Refresh the page after success
        } else {
          alert("Failed to add session. Please try again.");
        }
      } catch (error) {
        console.error("Error occurred during submission:", error);
        alert("An error occurred. Please check the console for details.");
      }
    }
  };

  // Generate an array of years from the current year to 20 years ago
  const [years, setYears] = useState([]);
  useEffect(() => {
    // Generate an array of years from the current year to 50 years ago
    const currentYear = new Date().getFullYear();
    const yearArray = [];
    for (let i = 0; i <= 50; i++) {
      yearArray.push(currentYear - i);
    }
    setYears(yearArray);
  }, []);

  return (
    <div id="mainAddSessionDiv">
      <SideBar />
      <div id="sessionWithoutBar">
        <div id="sessionBottom">
          <div id="sessionTop">
            <h1>A<span className="smaller-text">DD</span> S<span className="smaller-text">ESSION</span></h1>
          </div>
          <form id="sessionForm" action="" onSubmit={handleSubmit}>
            <div id="sessionField">
              <label>Class</label>
              <div style={{ width: "57%" }}>
                <select
                  id="sessionInp"
                  name="degree"
                  value={selectedDegree}
                  onChange={handleDegreeChange}
                  style={{ width: "14.8vw", height: "7vh", border: '1px solid lightgray' }}
                >
                  <option value="" disabled>Select Class</option>
                  {degree.map((degreeData) => {
                    return (
                      <option key={degreeData.programId} value={degreeData.programId}>
                        {degreeData.type + "(" + degreeData.degree + ")"}
                      </option>
                    );
                  })}
                </select>
                {errors.degree && <span className="error">{errors.degree}</span>}
              </div>
            </div>

            <div id="sessionField">
              <label>Batch</label>
              <div style={{ width: "57%" }}>
                <select
                  id="sessionInp"
                  name="batch"
                  onChange={handleBatchChange}
                  value={selectedBatch}
                  style={{ width: "14.8vw", height: "7vh", border: '1px solid lightgray' }}
                >
                  <option value="" disabled>Select Batch</option>
                  {batch.map((batchData) => {
                    return (
                      <option key={batchData.batchId} value={batchData.batchId}>
                        {batchData.year + " " + batchData.session}
                      </option>
                    );
                  })}
                </select>
                {errors.batch && <span className="error">{errors.batch}</span>}
              </div>
            </div>

            <div id="sessionField">
              <label>Academic Year</label>
              <div style={{ width: "57%" }}>
                <select
                  id="sessionInp"
                  name="total_credit_hours"
                  onChange={handleInput}
                  style={{ width: "14.8vw", height: "7vh", border: '1px solid lightgray' }}
                >
                  <option value="" disabled>Select year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div id="sessionField">
              <label>Semester</label>
              <div style={{ width: "57%" }}>
                <select
                  id="sessionInp"
                  name="semester"
                  onChange={handleInput}
                  style={{ width: "14.8vw", height: "7vh", border: '1px solid lightgray' }}
                >
                  <option value="I">I</option>
                  <option value="II">II</option>
                </select>
              </div>
            </div>

            <button id="seesionbtn">Add Session</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSession;



// import * as React from "react";
// import "./addSession.css";
// import SideBar from "../../SideBar";
// import axios from "axios";
// import { useState, useEffect } from "react";

// function AddSession() {
//   const [admin, setAdminId] = useState(null);
//   const [batch, setBatch] = useState([]);
//   const [degree, setDegree] = useState([]);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8081/session", {
//           withCredentials: true,
//         });
//         setAdminId(response.data.userId);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log("Admin", admin);

//   useEffect(() => {
//     const fetchBatch = async () => {
//       try {
//         const res = await axios.get("http://localhost:8081/sessionUni/Get");
//         setBatch(res.data.batch);
//         console.log("batch", batch);
//       } catch (error) {
//         console.log("error", error);
//       }
//     };
//     fetchBatch();
//   }, []);

//   useEffect(() => {
//     const fetchDegree = async () => {
//       try {
//         const res = await axios.get("http://localhost:8081/SessionUni/Get");
//         setDegree(res.data.degree_program);
//         console.log("first", degree);
//       } catch (error) {
//         console.log("error", error);
//       }
//     };
//     fetchDegree();
//   }, []);

//   const [selectedDegree, setSelectedDegree] = useState("");
//   const [selectedBatch, setSelectedBatch] = useState("");

//   const handleDegreeChange = (event) => {
//     const degreeName = event.target.value;
//     setSelectedDegree(degreeName);
//   }

//   const handleBatchChange = (event) => {
//       const batchName = event.target.value;
//       setSelectedBatch(batchName);
//   }
  

//   const [values, setValues] = useState({
//     adminId: admin,
//     academic_year: new Date().getFullYear(),
//     semester: "I",
//     batchId: '',
//     programId: ''
//   });

//   useEffect(() => {
//     // Update values after admin is set
//     if (admin !== null) {
//       setValues((prev) => ({
//         ...prev,
//         adminId: admin,
//       }));
//     }
//   }, [admin]);

//   // Function to handle changes in input field
//   const handleInput = (event) => {
//     const { name, value } = event.target;
//     setValues((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };


//   console.log("val", values);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const newErrors = {};
//     if (!selectedDegree) newErrors.degree = "Please select Class";
//     if (!selectedBatch) newErrors.batch = "Please select Batch";

//     setErrors(newErrors);

//   if (Object.keys(newErrors).length === 0) {
//     try {
//       const res = axios.post("http://localhost:8081/SessionUni/Add", values);
//       console.log("val", values);
//       if (res.data === "success") {
//         alert("Session is added successfully");
//         window.location.reload(); // Refresh the page
//       } else {
//         console.log("error");
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   }
// };

//     // Generate an array of years from the current year to 20 years ago
//     const [years, setYears] = useState([]);
//     useEffect(() => {
//       // Generate an array of years from the current year to 50 years ago
//       const currentYear = new Date().getFullYear();
//       const yearArray = [];
//       for (let i = 0; i <= 50; i++) {
//         yearArray.push(currentYear - i);
//       }
//       setYears(yearArray);
//     }, []);

//     return (
//       <div id="mainAddSessionDiv">
//         <SideBar />
//         <div id="sessionWithoutBar">
//           <div id="sessionBottom">
//             <div id="sessionTop">
//               <h1>A<span className="smaller-text">DD</span> S<span className="smaller-text">ESSION</span></h1>
//             </div>
//             <form id="sessionForm" action="" onSubmit={handleSubmit}>
              
//               <div id="sessionField">
//                 <label>Class</label>
//                 <div  style={{ width: "57%"}}>
//                 <select
//                 id="sessionInp"
//                   name="degree"
//                   value={selectedDegree}
//                   onChange={handleDegreeChange}
//                   style={{ width: "14.8vw", height: "5.8vh", border: '1px solid lightgray' }}
//                 >
//                   <option value="" disabled>
//                     Select Class
//                   </option>
//                   {degree.map((degreeData) => {
//                     return (
//                       <option
//                         key={degreeData.programId}
//                         value={degreeData.programId}
//                       >
//                         {degreeData.type + "(" + degreeData.degree + ")"}
//                       </option>
//                     );
//                   })}{" "}
//                 </select>
//                 {errors.degree && <span className="error">{errors.degree}</span>}
//               </div>
//               </div>

//               <div id="sessionField">
//                 <label>Batch</label>
//                 <div style={{ width: "57%"}}>
//                 <select
//                 id="sessionInp"
//                   name="batch"
//                   onChange={handleBatchChange}
//                   value={selectedBatch}
//                   style={{ width: "14.8vw", height: "5.8vh", border: '1px solid lightgray' }}
//                 >
//                   <option value="" disabled>
//                     Select Batch
//                   </option>
//                   {batch.map((batchData) => {
//                     return (
//                       <option key={batchData.batchId} value={batchData.batchId}>
//                         {batchData.year + "  " + batchData.session}
//                       </option>
//                     );
//                   })}{" "}
//                 </select>
//                 {errors.batch && <span className="error">{errors.batch}</span>}
  
//               </div>
//               </div>

//               <div id="sessionField">
//                 <label>Academic Year</label>
//                 <div style={{ width: "57%"}}>
//                 <select
//                 id="sessionInp"
//                   name="total_credit_hours"
//                   onChange={handleInput}
//                   style={{ width: "14.8vw", height: "5.8vh", border: '1px solid lightgray' }}
//                 >
//                   <option value="" disabled>
//                     Select year
//                   </option>
//                   {years.map((year) => (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               </div>

//               <div id="sessionField">
//                 <label>Semester</label>
//                 <div style={{ width: "57%"}}>
//                 <select
//                 id="sessionInp"
//                   name="semester"
//                   onChange={handleInput}
//                   style={{ width: "14.8vw", height: "5.8vh", border: '1px solid lightgray' }}
//                 >
//                   <option value="I">I</option>
//                   <option value="II">II</option>
//                 </select>
//               </div>
//               </div>

//               <button id="seesionbtn">Add Session</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   export default AddSession;
