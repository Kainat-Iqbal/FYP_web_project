import * as React from "react";
import "./examination.css";
import SideBar from "../../SideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import TeacherValidation from "../../Add/AddTeacher/teacherValidation";

function AddExamination() {
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
    adminId: "",
    name: "",
    email: "",
    password: "User123*",
    cnic: "",
    status: "Active",
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(TeacherValidation(values));
    if (
      errors.email === "" &&
      errors.password === "" &&
      errors.name === "" &&
      errors.joiningDate === "" &&
      errors.cnic === ""
    ) {
      console.log("nhmbkjbhkbhjuu")
      axios.post("http://localhost:8081/examination/Add", values).then((res) => {
        console.log("val", values);
        if (res.data === "success") {
          alert("Controller of Examination is added successfully");
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
    <div id="mainAddExaminationDiv">
      <SideBar />
      <div id="ExaminationWithoutBar">
        <div id="ExaminationBottom">
          <div id="ExaminationTop">
            <h1>A<span className="smaller-text">DD</span> C<span className="smaller-text">ONTROLLER</span> O<span className="smaller-text">F</span> E<span className="smaller-text">XAMINATION</span></h1>
          </div>

          <form id="ExaminationForm" action="" onSubmit={handleSubmit}>

            <div className="ExaminationField">
              <label>Name</label>
              <div className="ExaminationInputContainer">
                <input
                  className="ExaminationInp"
                  name="name"
                  type="text"
                  placeholder="Sara Ahmed"
                  onChange={handleInput}
                ></input>
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
            </div>

            <div className="ExaminationField">
              <label>Email</label>
              <div className="ExaminationInputContainer">
                <input
                  className="ExaminationInp"
                  name="email"
                  type="email"
                  placeholder="abc@gmail.com"
                  onChange={handleInput}
                // style={{height:'5.8vh'}}
                ></input>
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
            </div>

            <div className="ExaminationField">
              <label>Password</label>
              <div className="ExaminationInputContainer">
                <input
                  className="ExaminationInp"
                  name="password"
                  type="text"
                  onChange={handleInput}
                  value={"User123*"}
                ></input>
              </div>
            </div>

            <div className="ExaminationField">
              <label>CNIC</label>
              <div className="ExaminationInputContainer">
                <input
                  className="ExaminationInp"
                  name="cnic"
                  type="text"
                  placeholder="42204-3452276-3"
                  onChange={handleInput}
                ></input>
                {errors.cnic && <span className="error">{errors.cnic}</span>}
              </div>
            </div>

            <div className="ExaminationField">
              <label>Status</label>
              <div className="ExaminationInputContainer">
                <select
                  className="ExaminationSelect"
                  name="status"
                  onChange={handleInput}
                // style={{ width: "16.7vw", height: "5.8vh" }}
                >
                  <option value="Active">Active</option>
                  <option value="Leave">Leave</option>
                </select>
                {errors.status && <span className="error">{errors.status}</span>}
              </div>
            </div>

            <div className="ExaminationField">
              <label>Date of Joining</label>
              <div className="ExaminationInputContainer">
                <input
                  className="ExaminationInp"
                  // style={{ width: "16.7vw", height: "5.8vh" }}
                  name="joiningDate"
                  type="date"
                  onChange={handleInput}
                ></input>
                {errors.joiningDate && <span className="error">{errors.joiningDate}</span>}
              </div>
            </div>

            <button id="COEbutton">Add Controller of Examination</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddExamination;
