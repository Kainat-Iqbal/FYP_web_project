import React, { useState, useEffect } from "react";
import "./addTeacher.css";
import SideBar from "../../SideBar";
import axios from "axios";
import TeacherValidation from "./teacherValidation";

function AddTeacher() {
  const [admin, setAdminId] = useState(null);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "User123*",
    department: "Software Engineering",
    designation: "Lecturer",
    cnic: "",
    qualification: "Bachelors",
    status: "Active",
    adminEmail: "",
    joiningDate: "",
    photo: "",
    adminId: "",
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
        console.error("Error fetching admin ID:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (admin !== null) {
      setValues((prev) => ({
        ...prev,
        adminId: admin,
      }));
    }
  }, [admin]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = TeacherValidation(values);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );
    if (!hasErrors) {
      try {
        const response = await axios.post(
          "http://localhost:8081/teacher/Add",
          values
        );
        if (response.data === "success") {
          alert("Teacher added successfully");
          window.location.reload();
        } else if (response.data === "emailAlreadyExist") {
          alert("This email is already associated with another account");
        } else {
          console.error("Server error");
        }
      } catch (error) {
        console.error("Error adding teacher:", error);
      }
    }
  };

  return (
    <div id="mainAddTeacherDiv">
      <SideBar />
      <div id="teacherWithoutBar">
        <div id="teacherBottom">
          <div id="teacherTop">
            <h1>
              A<span className="smaller-text">DD</span> T
              <span className="smaller-text">EACHER</span>
            </h1>
          </div>
          <form id="teacherForm" onSubmit={handleSubmit}>
            {[
              { label: "Name", name: "name", type: "text", placeholder: "Sara Ahmed" },
              { label: "Email", name: "email", type: "email", placeholder: "abc@gmail.com" },
              {
                label: "Password",
                name: "password",
                type: "text",
                value: "User123*",
                disabled: true,
              },
              {
                label: "Department",
                name: "department",
                type: "select",
                options: ["Software Engineering", "Computer Science"],
              },
              {
                label: "Designation",
                name: "designation",
                type: "select",
                options: ["Lecturer", "Assistant Professor", "Professor"],
              },
              { label: "CNIC", name: "cnic", type: "text", placeholder: "42204-3458276-3" },
              {
                label: "Qualification",
                name: "qualification",
                type: "select",
                options: ["Bachelors", "Masters", "PhD"],
              },
              {
                label: "Status",
                name: "status",
                type: "select",
                options: ["Active", "Leave"],
              },
              { label: "Date of Joining", name: "joiningDate", type: "date" },
              { label: "Picture", name: "photo", type: "file" },
            ].map((field, index) => (
              <div key={index} className="teacherField">
                <label>{field.label}</label>
                <div className="inputContainer">
                  {field.type === "select" ? (
                    <select
                      className="teacherSelect"
                      name={field.name}
                      onChange={handleInput}
                      value={values[field.name]}
                    >
                      {field.options.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="teacherInp"
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
            <button type="submit">Add Teacher</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTeacher;






// import * as React from "react";
// import "./addTeacher.css";
// import SideBar from "../../SideBar";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import TeacherValidation from "./teacherValidation";

// function AddTeacher() {
//   const [admin, setAdminId] = useState(null);
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

//   console.log("FVFV ", admin);
//   // State variables to hold the input values
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     password: "User123*",
//     department: "Software Engineering",
//     designation: "Lecturer",
//     cnic: "",
//     qualification: "Bachelors",
//     status: "Active",
//     adminEmail: "",
//     joiningDate: "",
//     photo: "",
//     adminId: "",
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
//   const [errors, setErrors] = useState({});

//   // Function to handle changes in input field
//   const handleInput = (event) => {
//     const { name, value } = event.target;
//     setValues((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setErrors(TeacherValidation(values));
//     if (
//       errors.email === "" &&
//       errors.password === "" &&
//       errors.name === "" &&
//       errors.date === "" &&
//       errors.cnic === ""
//     ) {
//       console.log("nhmbkjbhkbhjuu")
//       axios.post("http://localhost:8081/teacher/Add", values).then((res) => {
//         console.log("val", values);
//         if (res.data === "success") {
//           alert("Teacher is added successfully");
//           window.location.reload(); // Refresh the page
//         }
//         else if (res.data === "emailAlreadyExist") {
//           alert("This Email already associate with another account")
//         } else {
//           console.log("error");
//         }
//       });
//     }
//   };

//   return (
//     <div id="mainAddTeacherDiv">
//       <SideBar />
//       <div id="teacherWithoutBar">


//         <div id="teacherBottom">
//           <div id="teacherTop">
//             <h1>A<span className="smaller-text">DD</span> T<span className="smaller-text">EACHER</span></h1>
//           </div>
//           <form id="teacherForm" action="" onSubmit={handleSubmit}>
//             <div className="teacherField">
//               <label>Name</label>
//               <div className="inputContainer">
//                 <input
//                   className="teacherInp"
//                   name="name"
//                   type="text"
//                   placeholder="Sara Ahmed"
//                   onChange={handleInput}
//                 />
//                 {errors.name && <span className="error">{errors.name}</span>}
//               </div>
//             </div>

//             <div className="teacherField">
//               <label>Email</label>
//               <div className="inputContainer">
//                 <input
//                   className="teacherInp"
//                   name="email"
//                   type="email"
//                   placeholder="abc@gmail.com"
//                   onChange={handleInput}
//                 />
//                 {errors.email && <span className="error">{errors.email}</span>}
//               </div>
//             </div>

//             <div className="teacherField">
//               <label>Password</label>
//               <div className="inputContainer">
//                 <input
//                   className="teacherInp"
//                   name="password"
//                   type="text"
//                   value="User123*"
//                   onChange={handleInput}
//                 />
//                 {errors.password && <span className="error">{errors.password}</span>}
//               </div>
//             </div>

//             <div className="teacherField">
//               <label>Department</label>
//               <div className="inputContainer">
//                 <select
//                   className="teacherSelect"
//                   name="department"
//                   onChange={handleInput}
//                 >
//                   <option value="Software Engineering">Software Engineering</option>
//                   <option value="Computer Science">Computer Science</option>
//                 </select>
//                 {errors.department && <span className="error">{errors.department}</span>}
//               </div>
//             </div>

//             <div className="teacherField">
//               <label>Designation</label>
//               <div className="inputContainer">
//                 <select
//                   className="teacherSelect"
//                   name="designation"
//                   onChange={handleInput}
//                 >
//                   <option value="Lecturer">Lecturer</option>
//                   <option value="Assistant Professor">Assistant Professor</option>
//                   <option value="Professor">Professor</option>
//                 </select>
//                 {errors.designation && <span className="error">{errors.designation}</span>}
//               </div>
//             </div>

//             <div className="teacherField">
//               <label>CNIC</label>
//               <div className="inputContainer">
//                 <input
//                   className="teacherInp"
//                   name="cnic"
//                   type="text"
//                   placeholder="42204-3458276-3"
//                   onChange={handleInput}
//                 />
//                 {errors.cnic && <span className="error">{errors.cnic}</span>}
//               </div>
//             </div>

//             <div className="teacherField">
//               <label>Qualification</label>
//               <div className="inputContainer">
//                 <select
//                   className="teacherSelect"
//                   name="qualification"
//                   onChange={handleInput}
//                 >
//                   <option value="Bachelors">Bachelors</option>
//                   <option value="Masters">Masters</option>
//                   <option value="PhD">PhD</option>
//                 </select>
//                 {errors.qualification && <span className="error">{errors.qualification}</span>}
//               </div>
//             </div>

//             <div className="teacherField">
//               <label>Status</label>
//               <div className="inputContainer">
//                 <select
//                   className="teacherSelect"
//                   name="status"
//                   onChange={handleInput}
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Leave">Leave</option>
//                 </select>
//                 {errors.status && <span className="error">{errors.status}</span>}
//               </div>
//             </div>

//             <div className="teacherField">
//               <label>Date of Joining</label>
//               <div className="inputContainer">
//                 <input
//                   className="teacherInp"
//                   name="joiningDate"
//                   type="date"
//                   onChange={handleInput}
//                 />
//                 {errors.joiningDate && <span className="error">{errors.joiningDate}</span>}
//               </div>
//             </div>

//             <div className="teacherField">
//               <label>Picture</label>
//               <div className="inputContainer">
//                 <input
//                   // className="teacherInp"
//                   name="photo"
//                   type="file"
//                   onChange={handleInput}
//                 />
//               </div>
//             </div>

//             <button>Add Teacher</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default AddTeacher;
