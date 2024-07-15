import * as React from "react";
import { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  AccountCircle,
  AddCircle,
  Home,
  MenuOutlined,
  TableView,
  Notifications
} from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";

function SideBar() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the device width is below a certain threshold (e.g., mobile screen width)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the threshold as needed
    };

    // Call handleResize initially and add event listener for window resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const nav = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <div
        id="TopBar"
        style={{
          height: "9vh",
          width: "100vw",
          backgroundColor: "#00304B",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          position: "fixed" /* Fix the position */,
          top: "0" /* Position it at the top */,
          left: " 0" /* Position it at the left */,
          zIndex: "999",
        }}
      >
        <div
          id="topLeft"
          style={{
            width: "auto",
            height: "9vh",
            marginLeft: "2vw",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <button
            onClick={handleToggleSidebar}
            style={{ border: "none", backgroundColor: "#00304B" }}
          >
            {<MenuOutlined style={{ 
              fontSize: "2.2rem", 
              color: "white" 
              }} />}
          </button> */}
         
         <button
      onClick={handleToggleSidebar}
      style={{
        border: 'none',
        backgroundColor: '#00304B',
        display: isMobile ? 'block' : 'none', // Hide on laptops, show on mobile
      }}
    >
      <MenuOutlined style={{ fontSize: '2.2rem', color: 'white' }} />
    </button>


          <img
            src={require("./FYPLogo.png")}
            style={{
              width: "10vw",
              height: "17vh",
              marginTop: "2vh",
              marginLeft: "-2vw",
            }}
          />

          <p
            style={{
              color: "white",
              fontSize: "1.2rem",
              marginLeft: "-2vw",
              marginTop: "2vh",
            }}
          >
            Academic Accelerator
          </p>
        </div>

        <div id="topRight" style={{ width: "auto", marginRight: "2vw" }}>
          <Notifications
            style={{
              marginTop: "5px",
              fontSize: "2.6rem",
              color: "white",
              marginRight: "12px"
            }} />
          <AccountCircle
            style={{
              marginTop: "5px",
              fontSize: "2.8rem",
              color: "white",
            }}
          />
        </div>
      </div>
      <Sidebar
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#00304B",
          height: "91vh",
          marginTop: "9vh",
          position: "fixed" /* Fix the position */,
          top: "0" /* Position it at the top */,
          left: " 0" /* Position it at the left */,
          zIndex: "999",
        }}
        collapsed={collapsed}
      >
        <Menu>
          <MenuItem
            icon={<Home />}
            onClick={() => {
              nav("/home");
            }}
          >
            Home
          </MenuItem>
          <SubMenu icon={<AddCircle />} label="Add">
            <MenuItem
              onClick={() => {
                nav("/addTeacher");
              }}
            >
              Add Teacher
            </MenuItem>
            <MenuItem onClick={() => {nav("/addDean");}}> Add Dean</MenuItem>
            <MenuItem onClick={() => {nav("/addExamination");}}> Add Controller of Examination </MenuItem>
            <MenuItem> Add Student </MenuItem>
            <MenuItem onClick={() => {nav("/addCourse");}}> Add Course </MenuItem>
            <MenuItem onClick={() => {nav("/addDegreeProgram");}}> Add Degree Program </MenuItem>
            <MenuItem> Add Session </MenuItem>
            <MenuItem> Add Batch </MenuItem>
          </SubMenu>

          <SubMenu icon={<TableView />} label="View">
            <MenuItem
              onClick={() => {
                nav("/viewTeacher");
              }}
            >
              View Teacher
            </MenuItem>
            <MenuItem onClick={()=> nav("/viewDean")}> View HOD, Dean, Examination</MenuItem>
            <MenuItem> View Student </MenuItem>
            <MenuItem onClick={() => nav("/viewCourse")}> View Course </MenuItem>
            <MenuItem onClick={() => nav("/viewDegree")}> View Degree Programs, Sessions, Batches </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </>
  );
}
export default SideBar;
