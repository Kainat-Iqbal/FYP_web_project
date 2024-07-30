import * as React from "react";
import "./addStudent.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";

function AddStudent() {
  const [admin, setAdminId] = useState(null);
  const [batch, setBatch] = useState([]);

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

   console.log("FVFV ", admin);
  // State variables to hold the input values
  const [values, setValues] = useState({
    batchId: "",
    name: "",
    juwId: "",
    fatherName: "",
    email: "",
    password: "User*123",
    CNIC:"",
    address: "",
    enrollment: "",
    seatNo:"",
    photo:"",
    dateOfAdmission: "",
    date_of_completion:"",
    matricMarks:"",
    matricPercentage:"",
    interMarks:"",
    interPercentage:"",
    position:"First",
    status:"enrolled",
    degreeAwarded:"yes",
    transcriptIssued:"yes",
    phoneNo:"",
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
  };
console.log(values)
  const handleSubmit = async (event) => {
    event.preventDefault();
      console.log("nhmbkjbhkbhjuu",values)
      axios.post("http://localhost:8081/student/Add", values).then((res) => {
        console.log("val",values);
        if (res.data === "success") {
          alert("Student is added successfully");
          window.location.reload(); // Refresh the page
        } 
        else if(res.data === "emailAlreadyExist"){
          alert("This Email already associate with another account")
        }
        else {
          console.log("error");
        }
      });
  };

  return (
    <div id="mainAddStudentDiv">
      <SideBar />
      <div id="studentWithoutBar">
        <div id="studentTop">
          <h1>Add student</h1>
        </div>

        <div id="studentBottom">
          <form id="studentForm" action="" onSubmit={handleSubmit}>
            <div id="studentField">
              <label>Name</label>
              <input
              id="st_input"
                name="name"
                type="text"
                placeholder="Sara"
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>Father Name</label>
              <input
               id="st_input"
                name="fatherName"
                type="text"
                placeholder="Ahmed"
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="sara@gmail.com"
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>CNIC</label>
              <input
               id="st_input"
                name="CNIC"
                type="text"
                placeholder="43301-4521161-6"
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>Phone Number</label>
              <input
               id="st_input"
                name="phoneNo"
                type="text"
                placeholder="0322-7744342"
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>Address</label>
              <input
               id="st_input"
                name="address"
                type="text"
                placeholder="phase7, defence, karachi"
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>Batch</label>
              <select
                name="batchId"
                onChange={handleInput}
                value={values.batchId}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="" disabled>
                  Select Batch
                </option>
                {batch.map((batchData) => {
                  return (
                    <option key={batchData.batchId} value={batchData.batchId}>
                      {batchData.year + "  " + batchData.session}
                    </option>
                  );
                })}{" "}
              </select>
            </div>

            <div id="studentField">
              <label>JUW ID</label>
              <input
               id="st_input"
                name="juwId"
                type="text"
                placeholder="juw11649"
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>Password</label>
              <input
               id="st_input"
                name="password"
                type="text"
                value={"User123*"}
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>Enrollment Number</label>
              <input
               id="st_input"
                name="enrollment"
                type="text"
                placeholder="2021/comp/BS(SE)/27039"
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>Seat Number</label>
              <input
                name="seatNo"
                min={0}
                type="number"
                placeholder="27946"
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>Date of Admission</label>
              <input
              style={{ width: "14.8vw", height: "4.5vh" }}
                name="dateOfAdmission"
                type="date"
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>Date of Completion</label>
              <input
              style={{ width: "14.8vw", height: "4.5vh" }}
                name="date_of_completion"
                type="date"
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>Matric Marks</label>
              <input
                name="matricMarks"
                min={0}
                type="number"
                placeholder="618"
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>Matric Percentage</label>
              <input
                name="matricPercentage"
                min={0}
                type="number"
                placeholder="80"
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>Inter Marks</label>
              <input
                name="interMarks"
                min={0}
                type="number"
                placeholder="560"
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>Inter Percentage</label>
              <input
                name="interPercentage"
                min={0}
                type="number"
                placeholder="81"
                onChange={handleInput}
              ></input>
            </div>

            <div id="studentField">
              <label>Possition</label>
              <select
                name="possition"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="1">First</option>
                <option value="2">Second</option>
                <option value="3">Third</option>
              </select>
            </div>

            <div id="studentField">
              <label>Status</label>
              <select
                name="status"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="enrolled">Enrolled</option>
                <option value="freeze">Freeze</option>
                <option value="pass out">Pass Out</option>
              </select>
            </div>

            <div id="studentField">
              <label>Degree Awarded</label>
              <select
                name="degreeAwarder"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div id="studentField">
              <label>Transcript Issued</label>
              <select
                name="transcriptIssued"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div id="studentField">
              <label>Picture</label>
              <input
              style={{ width: "14.8vw", height: "4.5vh" }}
                name="photo"
                type="file"
                onChange={handleInput}
              ></input>
            </div>
            <button>Add Student</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddStudent;
