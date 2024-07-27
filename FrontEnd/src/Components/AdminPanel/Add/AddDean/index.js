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
        <div id="deanTop">
          <h1>Add Dean</h1>
        </div>

        <div id="deanBottom">
          <form id="deanForm" action="" onSubmit={handleSubmit}>
            <div id="deanField">
              <label>Name</label>
              <input
                name="name"
                type="text"
                placeholder="Sara Ahmed"
                onChange={handleInput}
              ></input>
            </div>
            {errors.name && <span className="text-danger">{errors.name}</span>}

            <div id="deanField">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                onChange={handleInput}
              ></input>
            </div>
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}

            <div id="deanField">
              <label>Password</label>
              <input
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
                name="faculty"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
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
                name="CNIC"
                type="text"
                placeholder="42204-3452276-3"
                onChange={handleInput}
              ></input>
            </div>

            <div id="deanField">
              <label>Qualification</label>

              <select
                name="qualification"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div id="deanField">
              <label>Status</label>
              <select
                name="status"
                onChange={handleInput}
                style={{ width: "14.8vw", height: "4.5vh" }}
              >
                <option value="Active">Active</option>
                <option value="Leave">Leave</option>
              </select>
            </div>
            <div id="deanField">
              <label>Date of Joining</label>
              <input
                style={{ width: "14.8vw", height: "4.5vh" }}
                name="joiningDate"
                type="date"
                onChange={handleInput}
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
