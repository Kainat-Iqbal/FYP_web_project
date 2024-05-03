import * as React from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  AccountCircle,
  AddCircle,
  Home,
  MenuOutlined,
  TableView,
} from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";

function SideBar() {
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
          <button
            onClick={handleToggleSidebar}
            style={{ border: "none", backgroundColor: "#00304B" }}
          >
            {<MenuOutlined style={{ fontSize: "2.2rem", color: "white" }} />}
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
          <AccountCircle
            style={{
              fontSize: "3.2rem",
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
            <MenuItem
              onClick={() => {
                nav("/addHOD");
              }}
            >
              Add HOD
            </MenuItem>
            <MenuItem> Add Dean</MenuItem>
            <MenuItem> Add Examination of controller </MenuItem>
            <MenuItem> Add Student </MenuItem>
            <MenuItem> Add Course </MenuItem>
            <MenuItem> Add Degree Program </MenuItem>
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
            <MenuItem onClick={() => {
                nav("/viewHOD");
              }}> 
              View HOD </MenuItem>
            <MenuItem> View Dean</MenuItem>
            <MenuItem> View Examination of controller </MenuItem>
            <MenuItem> View Student </MenuItem>
            <MenuItem> View Course </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </>
  );
}
export default SideBar;
