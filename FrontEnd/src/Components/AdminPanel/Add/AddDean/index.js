import * as React from "react";
import "./addDean.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import TeacherValidation from "../../Add/AddTeacher/teacherValidation";

function AddDean() {
  const [admin, setAdminId] = useState(null);
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

   console.log("FVFV ", admin);
  // State variables to hold the input values
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "User123*",
    faculty: "Science",
    CNIC: "",
    qualification: "Bachelors",
    status: "Active",
    adminId: "",
    joiningDate: "",
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
  const [errors, setErrors] = useState({});

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
    setErrors(TeacherValidation(values));
    console.log("first",errors)
    if (
      errors.email === "" &&
      errors.password === "" &&
      errors.name === "" &&
      errors.date === "" &&
      errors.cnic === ""
    ) {
      console.log("nhmbkjbhkbhjuu",values)
      axios.post("http://localhost:8081/dean/Add", values).then((res) => {
        console.log("val",values);
        if (res.data === "success") {
          alert("dean is added successfully");
          window.location.reload(); // Refresh the page
        }
        else if(res.data === "emailAlreadyExist"){
          alert("This Email already associate with another account")
        }
        else {
          console.log("error");
        }
      });
    }
  };

  return (
    <div id="mainAddDeanDiv">
      <SideBar />
      <div id="deanWithoutBar">
       

        <div id="deanBottom">
        <div id="deanTop">
          <h1>A<span className="smaller-text">DD</span> D<span className="smaller-text">EAN</span></h1>
        </div>
          <form id="deanForm" action="" onSubmit={handleSubmit}>
            <div id="deanField">
              <label>Name</label>
              <input
              id="deaninp"
                name="name"
                type="text"
                placeholder="Sara Ahmed"
                onChange={handleInput}
              ></input>
            </div>
            {errors.name && <span className="text-danger">{errors.name}</span>}

            <div id="deanField"  >
              <label>Email</label>
              <input
             id="deaninp"
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                onChange={handleInput}
                style={{height:'2.7vw'}}
               
              ></input>
            </div>
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}

            <div id="deanField">
              <label>Password</label>
              <input
               id="deaninp"
                name="password"
                type="text"
                onChange={handleInput}
                value={"User123*"}
              ></input>
            </div>
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}

            <div id="deanField">
              <label>Faculty</label>

              <select
              id="deaninp"
                name="faculty"
                onChange={handleInput}
                style={{height: "5.8vh" }}
              >
                <option value="Science">
                  Science
                </option>
                <option value="Social Science">Social Science</option>
              </select>
            </div>

            <div id="deanField">
              <label>CNIC</label>
              <input
               id="deaninp"
                name="CNIC"
                type="text"
                placeholder="42204-3452276-3"
                onChange={handleInput}
              ></input>
            </div>

            <div id="deanField">
              <label>Qualification</label>

              <select
              id="deaninp"
                name="qualification"
                onChange={handleInput}
                style={{height: "5.8vh" }}
              >
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div id="deanField">
              <label>Status</label>
              <select
              id="deaninp"
                name="status"
                onChange={handleInput}
                style={{height: "5.8vh" }}
              >
                <option value="Active">Active</option>
                <option value="Leave">Leave</option>
              </select>
            </div>
            <div id="deanField">
              <label>Date of Joining</label>
              <input
              id="deaninp"
                name="joiningDate"
                type="date"
                onChange={handleInput}
                style={{height: "5.8vh" }}

></input>
            </div>

            <button>Add Dean</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddDean;
