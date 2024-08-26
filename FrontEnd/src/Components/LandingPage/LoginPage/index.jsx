import * as React from "react";
import "./login.css";
import axios from "axios";
import { useState ,useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const nav = useNavigate();
  const textStyle = {
    fontFamily: 'Poppins',
  };

  // State variables to hold the input values
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // Function to handle changes in input field
  const handleInput = (event) => {
    setValues(prev => ({
      ...prev,
      [event.target.name]: [event.target.value]
    }));
  };
  axios.defaults.withCredentials = true;
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/login', values)
      .then(res => {
        console.log(values)
        if (res.data === "Admin") {
          localStorage.setItem("user", "kainat");
          console.log("admin")
          nav("/home");
        }
        else if (res.data === "HOD") {
          console.log("hod")
          nav("/HODHomePage")
        }
        else if (res.data === "Dean") {
          console.log("dean")
          nav("/DeanHomePage")
        }
        else if (res.data === "Examination") {
          console.log("examination")
          nav("/ControllerOfExaminationHomePage")
        }
        else if (res.data === "Teacher") {
          console.log("teacher")
          nav("/teacher")
        }
        else if (res.data === "Failed") {
          alert("Invalid Login")
        }
      })

  };


  return (
    <div id="mainLoginDiv" style={textStyle}>
      <div id="newbg">
        <div id="formbg">
          <div id="leftSection">
            <div id="logoSection">
              <img src={require("./FYPLogo.png")} alt="logo" id="logo" />
              <h5>Academic Accelerator</h5>
            </div>
            <div id="loginSection">
              <div id="loginform">
                <h1>Login</h1>
                <form id="mainlogin" action="" onSubmit={handleSubmit}>
                  <div class="inputGroup">

                    <input type="email" id="email" name="email"
            placeholder="Enter your email"
               onChange={handleInput}  />
                  </div>
                  <div class="inputGroup">

                    <input type="password" id="password" name="password" placeholder="Enter your password"   onChange={handleInput} />
                  </div>
                  <button type="submit">Login</button>

                </form>
              </div>
            </div>
          </div>
          <div id="rightSection">
            {/*  <img src={require("./CapwithBooks.png")} alt="Some Image" /> */}
            <h1>Welcome Back</h1>
            <div id="rightpara">
              <p> Log in to access your personalized dashboard and manage your responsibilities.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default LoginPage;