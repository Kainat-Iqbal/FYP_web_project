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
    cnic: "",
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
    setErrors((prev) => ({
      ...prev,
      [name]: "", // Clear error when user starts typing
    }));
  };
  console.log(values)
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(TeacherValidation(values));
    console.log("first", errors)
    if (
      errors.email === "" &&
      errors.password === "" &&
      errors.name === "" &&
      errors.date === "" &&
      errors.cnic === ""
    ) {
      console.log("nhmbkjbhkbhjuu", values)
      axios.post("http://localhost:8081/dean/Add", values).then((res) => {
        console.log("val", values);
        if (res.data === "success") {
          alert("Dean is added successfully");
          window.location.reload(); // Refresh the page
        }
        else if (res.data === "emailAlreadyExist") {
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

            <div className="deanField">
              <label>Name</label>
              <div className="deanInputContainer">
                <input
                  id="deanInp"
                  name="name"
                  type="text"
                  placeholder="Sara Ahmed"
                  onChange={handleInput}
                ></input>
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
            </div>

            <div className="deanField"  >
              <label>Email</label>
              <div className="deanInputContainer">
                <input
                  className="deanInp"
                  name="email"
                  type="email"
                  placeholder="abc@gmail.com"
                  onChange={handleInput}
                  // style={{ height: '2.7vw' }}
                ></input>
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
            </div>

            <div className="deanField">
              <label>Password</label>
              <div className="deanInputContainer">
                <input
                  className="deanInp"
                  name="password"
                  type="text"
                  onChange={handleInput}
                  value={"User123*"}
                ></input>
                {errors.password && <span className="error">{errors.password}</span>}
              </div>
            </div>

            <div className="deanField">
              <label>Faculty</label>
              <div className="deanInputContainer">
                <select
                  className="deanInp"
                  name="faculty"
                  onChange={handleInput}
                // style={{height: "5.8vh" }}
                >
                  <option value="Science"> Science </option>
                  <option value="Social Science">Social Science</option>
                </select>
              </div>
            </div>

            <div className="deanField">
              <label>CNIC</label>
              <div className="deanInputContainer">
                <input
                  className="deanInp"
                  // name="CNIC"
                  name="cnic"
                  type="text"
                  placeholder="42204-3452276-3"
                  onChange={handleInput}
                ></input>
                {errors.cnic && <span className="error">{errors.cnic}</span>}
                </div>
              </div>
            
            <div id="deanField">
              <label>Qualification</label>
              <div className="deanInputContainer">
                <select
                  className="deanSelect"
                  name="qualification"
                  onChange={handleInput}
                // style={{height: "5.8vh" }}
                >
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                </select>
                {errors.qualification && <span className="error">{errors.qualification}</span>}
         </div>
            </div>

            <div className="deanField">
              <label>Status</label>
              <div className="deanInputContainer">
                <select
                  className="deanSelect"
                  name="status"
                  onChange={handleInput}
                // style={{height: "5.8vh" }}
                >
                  <option value="Active">Active</option>
                  <option value="Leave">Leave</option>
                </select>
                {errors.status && <span className="error">{errors.status}</span>}
              </div>
            </div>

            <div className="deanField">
              <label>Date of Joining</label>
              <div className="deanInputContainer">
                <input
                  className="deanInp"
                  name="joiningDate"
                  type="date"
                  onChange={handleInput}
                // style={{height: "5.8vh" }}
                ></input>
                {errors.joiningDate && <span className="error">{errors.joiningDate}</span>}
              </div>
            </div>

            <button>Add Dean</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddDean;
