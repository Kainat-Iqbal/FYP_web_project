import * as React from "react";
import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import axios from "axios";
import { AccountCircle, Notifications, Home, School, Insights } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import NotificationPanel from "../NotificationPanel";

function SideBar() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const nav = useNavigate();


  const toggleNotificationPanel = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8081/logout");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div
        id="TopBar"
        style={{
          height: "9vh",
          width: "100vw",
          background: "linear-gradient(to top left,  #93C098, #8CE0DB)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          position: "fixed",
          top: "0",
          left: "0",
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
          <img
            src={require("./FYPLogo.png")}
            style={{
              width: "9vw",
              height: "14vh",
              marginTop: "1vh",
              marginLeft: "-3.5vw",
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
            Academic Accelerator Pro
          </p>
        </div>

        <div id="topRight" style={{ width: "auto", marginRight: "2vw" }}>
          {/* Notification Icon */}
          <Notifications
            style={{
              marginTop: "5px",
              fontSize: "2.6rem",
              color: "white",
              marginRight: "12px",
              cursor: "pointer",
            }}
            onClick={toggleNotificationPanel}
          />

          {/* Notification Panel */}
          {isNotificationOpen && (
            <NotificationPanel
              onClose={() => setIsNotificationOpen(false)}
            />
          )}

          {/* User Icon */}
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
              >
                View Profile
              </div>
              <div
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

      <Sidebar
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#00304B",
          height: "91vh",
          marginTop: "9vh",
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "999",
          background: "linear-gradient(to bottom right, green, #8CE0DB)",
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
          <MenuItem
            icon={<School />}
            onClick={() => {
              nav("/courses");
            }}
          >
            Courses
          </MenuItem>
          <MenuItem
            icon={<Insights />}
            onClick={() => {
              nav("/insightCourse");
            }}
          >
            Results & Insights
          </MenuItem>
          <MenuItem
            icon={<Insights />}
            onClick={() => {
              nav("/studentCard");
            }}
          >
            Student's Insights
          </MenuItem>
          <MenuItem icon={<Notifications />}>Notifications</MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}

export default SideBar;
