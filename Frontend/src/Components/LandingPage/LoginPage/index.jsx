import * as React from "react";
import "./style.css";
import {useNavigate } from "react-router-dom";

function LoginPage() {
  const nav = useNavigate();
  return (
    <div id="mainLoginDiv">
      <div id="loginForm">
        <h1>
          Academic Accelerator
        </h1>
        <form id="loginFormDiv">
          <div id="InputFormField">
            <label>Email</label>
            <input type="email" placeholder="abc@gmail.com"></input>
          </div>
          <div id="InputFormField">
            <label>Password</label>
            <input type="password"></input>
          </div>
          <button
            style={{ borderRadius: "15px", width: "17vw", marginTop: "2vh" }}
            onClick={() => {
              nav("/HODHomePage");
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
