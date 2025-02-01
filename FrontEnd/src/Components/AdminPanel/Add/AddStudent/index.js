import React, { useState, useEffect } from "react";
import "./addStudent.css";
import SideBar from "../../SideBar";
import axios from "axios";
import StudentValidation from "./studentdValidation";
import { minor } from "@mui/material";

function AddStudent() {
  const [admin, setAdminId] = useState(null);
  const [batch, setBatch] = useState([]);

  const [values, setValues] = useState({
    batchId: "",
    name: "",
    juwId: "",
    fatherName: "",
    email: "",
    password: "User*123",
    CNIC: "",
    address: "",
    enrollment: "",
    seatNo: "",
    photo: "",
    dateOfAdmission: "",
    date_of_completion: "",
    matricMarks: "",
    matricPercentage: "",
    interMarks: "",
    interPercentage: "",
    position: "First",
    status: "enrolled",
    degreeAwarded: "yes",
    transcriptIssued: "yes",
    phoneNo: "",
  });
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

  // useEffect(() => {
  //   const fetchBatch = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8081/sessionUni/Get");
  //       setBatch(res.data.batch);
  //       console.log("batch", batch);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };
  //   fetchBatch();
  // }, []);

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const res = await axios.get("http://localhost:8081/sessionUni/Get");
        setBatch(
          res.data.batch.map((batchData) => ({
            value: batchData.batchId,
            label: `${batchData.year} ${batchData.session}`,
          }))
        );
      } catch (error) {
        console.error("Error fetching batch:", error);
      }
    };
    fetchBatch();
  }, []);

  console.log("FVFV ", admin);
  
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
  console.log(values)

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("It is add student page", values)

    const validationErrors = StudentValidation(values);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );
    if (!hasErrors) {
      try {
        const res = await axios.post(
          "http://localhost:8081/student/Add",
          values
        );
        if (res.data === "success") {
          alert("Student added successfully");
          window.location.reload(); // Refresh the page
        }
        else if (res.data === "emailAlreadyExist") {
          alert("This Email is already associate with another account")
        }
        else {
          console.error("Server error");
        }
      } catch (error) {
        console.error("Error adding student:", error);
      }
    }
  };

  return (
    <div id="mainAddStudentDiv">
      <SideBar />
      <div id="studentWithoutBar">
        <div id="studentBottom">
          <div id="studentTop">
            <h1>
              A<span className="smaller-text">DD</span> S<span className="smaller-text">TUDENT</span>
              </h1>
          </div>
          <form id="studentForm" action="" onSubmit={handleSubmit}>
            
          {[
              { label: "Name", name: "name", type: "text", placeholder: "Sara Ahmed" },
              { label: "Father Name", name: "fatherName", type: "text", placeholder: "Ahmed" },
              { label: "Email", name: "email", type: "email", placeholder: "abc@gmail.com" },
              { label: "CNIC", name: "CNIC", type: "text", placeholder: "42204-3458276-3" },
              { label: "Phone Number", name: "phoneNo", type: "text", placeholder: "0322-7744342" },
              { label: "Address", name: "address", type: "text", placeholder: "phase7, defence, karachi"},

              {
                label: "Batch",
                name: "batchId",
                type: "select",
                placeholder: "Select Batch",
                options: batch,
              },

              { label: "JUW ID", name: "juwId", type: "text", placeholder: "juw11649" },
              
              {
                label: "Password",
                name: "password",
                type: "text",
                value: "User123*",
                disabled: true,
              },
              { label: "Enrollment Number", name: "enrollment", type: "text", placeholder: "2021/Comp/BS(SE)/27039"},
              { label: "Seat Number", name: "seatNo",min: 0, type: "number", placeholder: "2794611"},
              
              { label: "Date of Admission", name: "dateOfAdmission", type: "date"},
              { label: "Date of Completion", name: "date_of_completion", type: "date"},

              { label: "Matric Marks", name: "matricMarks", min: 0, type: "number", placeholder: "618"},
              { label: "Matric Percentage", name: "matricPercentage", min: 0, type: "number", placeholder: "80"},
              { label: "Inter Marks", name: "interMarks", min: 0, type: "number", placeholder: "560"},
              { label: "Inter Percentage", name: "interPercentage", min: 0, type: "number", placeholder: "81"},
              
              {
                label: "Position",
                name: "possition",
                type: "select",
                options: ["First", "Second", "Third"],
              },
              {
                label: "Status",
                name: "status",
                type: "select",
                options: ["Enrolled", "Freeze", "Pass"],
              },
              {
                label: "Degree Awarded",
                name: "degreeAwarder",
                type: "select",
                options: ["Yes", "No"],
              },
              {
                label: "Transcript Issued",
                name: "transcriptIssued",
                type: "select",
                options: ["Yes", "No"],
              },
              { label: "Picture", name: "photo", type: "file" },
            ].map((field, index) => (
              <div key={index} className="addStudentField">
                <label>{field.label}</label>
                <div className="addStudentInputContainer">
                  {field.type === "select" ? (
                    <select
                      className="addStudentSelect"
                      name={field.name}
                      onChange={handleInput}
                      value={values[field.name]}
                    >
                      <option value="" disabled>
                        {field.placeholder || "Select"}
                      </option>
                      {field.options.map((option, idx) => (
                        <option key={idx} value={option.value || option}>
                          {option.label || option}
                        </option>
                      ))}
                    </select>

                    //   {field.options.map((option, idx) => (
                    //     <option key={idx} value={option}>
                    //       {option}
                    //     </option>
                    //   ))}
                    // </select>
                  ) : (
                    <input
                      className="addStudentInp"
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value || values[field.name]}
                      onChange={handleInput}
                      disabled={field.disabled || false}
                    />
                  )}
                  {errors[field.name] && <span className="error">{errors[field.name]}</span>}
                </div>
              </div>
            ))}
            <button type="submit">Add Student</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddStudent;
