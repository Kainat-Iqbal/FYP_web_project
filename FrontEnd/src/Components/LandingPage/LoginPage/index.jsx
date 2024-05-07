import * as React from "react";
import "./style.css";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const nav = useNavigate();
  return (
    <div id="mainLoginDiv">
      <div id="loginForm">
        <h1>
          Academic Accelerator
        </h1>
        <form>
          <div id="formField">
            <label>Email</label>
            <input type="email" placeholder="abc@gmail.com"></input>
          </div>
          <div id="formField">
            <label>Password</label>
            <input type="password"></input>
          </div>
          <button onClick={()=>{nav("/teacher");}} style={{borderRadius:'15px',width: '17vw',marginTop:'2vh'}}
              >Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
