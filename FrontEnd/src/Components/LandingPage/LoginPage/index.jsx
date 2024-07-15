import * as React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import LoginValidation from "./LoginValidation";

function LoginPage() {
  const nav = useNavigate();

  // State variables to hold the input values
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
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
    setErrors(LoginValidation(values));
    if(errors.email === "" && errors.password===""){
      axios.post('http://localhost:8081/login',values)
      .then(res =>{
        console.log(values)
        if(res.data === "Admin"){
          localStorage.setItem("user","kainat");
          console.log("admin")
          nav("/home");
        }
        else if(res.data === "Dean"){
          console.log("Dena")
          nav("/addDean")
        }
        else if(res.data ==="Failed"){
          alert("Invalid Login")
        }
      })
    }
  };

  return (
    <div id="mainLoginDiv">
      <div id="loginForm">
        <h1>
          Academic Accelerator
        </h1>
        <form id="loginFormDiv" action="" onSubmit={handleSubmit}>
          <div id="InputFormField">
            <label htmlFor="email">Email</label>
            <div id="inputError">
              <input
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                onChange={handleInput}
              ></input>
              {errors.email && (<span className="text-danger">{errors.email}</span>)}
            </div>
          </div>

          <div id="InputFormField">
            <label htmlFor="password">Password</label>
            <div id="inputError">
              <input
                name="password"
                type="password"
                onChange={handleInput}
              ></input>
              {errors.password && (<span className="text-danger">{errors.password}</span>)}
            </div>
          </div>

          <button id="inputButton"
            style={{
              borderRadius: "15px",
              width: "17vw",
              marginTop: "2vh",
            }}
            type="submit" // Change to type="submit" to enable form submission
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
