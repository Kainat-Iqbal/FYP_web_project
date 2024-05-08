import * as React from "react";
import "./mainScreen.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";

function MainScreen() {
  // const nav = useNavigate();
  return (
    <div id="mainDivMainScreen">
      <div id="top">
        <p style={{ color: "white", marginTop: "2vh", fontSize: "1.3rem" }}>
          Academic Accelerator
        </p>

        <Dropdown class="dropDown">
          <Dropdown.Toggle id="dropdown-basic" style={{ border: "none" }}>
            Science
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "black" }}
              >
                Computer Science
              </Link>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">Biotechnology</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Botany</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Chemistry</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Biochemistry</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Food Science</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Mathematics</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Microbiology</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Zoology</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown class="dropDown">
          <Dropdown.Toggle style={{ border: "none" }} id="dropdown-basic">
            Social Science
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">English</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Education</Dropdown.Item>
            <Dropdown.Item href="#/action-3">
              International Relations
            </Dropdown.Item>
            <Dropdown.Item href="#/action-1">Islamic Learning</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Media Studies</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Visual Studies</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Psychology</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown class="dropDown">
          <Dropdown.Toggle style={{ border: "none" }} id="dropdown-basic">
            Allied Science
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Easter Medicine</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Homeopathy</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Physical Therapy</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown class="dropDown">
          <Dropdown.Toggle style={{ border: "none" }} id="dropdown-basic">
            Buisness
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
              Buisness Administration
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">Commerce</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Economics</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div id="middle">
        <img src={require("./FYPLogo.png")} style={{ width: "25vw" }} />
        <h1>
          Academic Accelerator
        </h1>
        <h2>Faculty and Student Academic Guide</h2>
      </div>

      <div id="bottom"></div>
    </div>
  );
}
export default MainScreen;