import * as React from "react";
import { useState,useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import axios from "axios";
/* import {handleLogout} from '../../LandingPage/LoginPage'; */
import {
  AccountCircle,
  AddCircle,
  Home,
  MenuOutlined,
  TableView,
  BorderColor,
  School,
  Insights,
  Grading,
  Notifications
} from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";

function SideBar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
          
         
         <button
      onClick={handleToggleSidebar}
      style={{
        border: 'none',
        backgroundColor: '#00304B',
        display: isMobile ? 'block' : 'none', // Hide on laptops, show on mobile
      }}
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
              cursor: "pointer",
            }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: "0",
                backgroundColor: "white",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
                zIndex: "1000",
              }}
            >
              <div
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
                 // Assuming "/profile" is the route for the profile page
              >
                View Profile
              </div>
              <div
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
                /* onClick={handleLogout} */
              >
                Logout
              </div>
            </div>)}
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
              nav("/teacher");
            }}
          >
            Home
          </MenuItem>


          <MenuItem icon={<School />}
            onClick={() => {
              nav("/courses");
            }}
          >
           Courses</MenuItem>
          {/* <MenuItem icon={<Grading />
        } onClick={() => {
          nav("/viewResult");
        }}>View Results</MenuItem> */}
          <MenuItem icon={<Insights />}>Insights</MenuItem>

          <MenuItem icon={<Notifications />}>Notifications</MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}
export default SideBar;
