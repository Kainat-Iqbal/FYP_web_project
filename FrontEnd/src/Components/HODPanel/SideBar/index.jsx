import * as React from "react";
import { useState,useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { AccountCircle, AddCircle, Home, MenuOutlined, TableView, Approval, AssignmentInd, ChangeCircle,  Notifications,Equalizer, Insights } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

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
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8081/logout'); // Replace with your actual logout endpoint
      // Optionally, handle successful logout (e.g., redirect to login page, clear local state)
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally, handle errors (e.g., show a message to the user)
    }
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
            }}>
            Academic Accelerator
          </p>
        </div>

        <div id="HODSideBarTopRight" style={{ width: "auto", marginRight: "2vw" }}>
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
            }} onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
                  onClick={handleLogout} // Call handleLogout on click
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
          <MenuItem icon={<Home/>}
          onClick={() => {
              nav("/HODHomePage");
            }}>
            Home
          </MenuItem>

          <MenuItem  icon={<AssignmentInd/>}
            onClick={() => {
              nav("/AssignCourse");
            }}>
           Assign Course
          </MenuItem>
          
          <MenuItem  icon={<Approval/>}
            onClick={() => {
              nav("/HODResultApproval");
            }}>
            Result Approval
          </MenuItem>

          <MenuItem icon={<ChangeCircle/>}
          onClick={() => {
              nav("/HODManageChangeReq");
            }}>
            Change Requests
          </MenuItem>
          
          {<SubMenu icon={<Equalizer/>} label="View">
            <MenuItem icon={<Insights/>} onClick={() => {
                nav("/StudentInsight");
              }}> 
              Student Insights 
              </MenuItem>
            </SubMenu> }

        </Menu>
      </Sidebar>
    </>
  );
}
export default SideBar;







