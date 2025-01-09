import React, { useState, useEffect } from "react";
import axios from "axios";

function NotificationPanel({ notifications, onClose }) {
    return (
      <div
        style={{
          position: "absolute",
          top: "100%",
          right: "20px",
          width: "300px",
          maxHeight: "400px",
          overflowY: "auto", // This enables scrolling if the notifications exceed the height
          backgroundColor: "white",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          zIndex: "1000",
          padding: "10px",
        }}
      >
        {notifications.length > 0 ? (
          <ul style={{ listStyle: "none", padding: "0" }}>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "10px 0",
                }}
              >
                <p style={{ margin: "5px 0", fontSize: "0.9rem",color:"black" }}>
                  {notification.course_title+"("+notification.course_code+")"} for {notification.type+"("+
                  notification.degree+")"} batch {notification.year+"(" +notification.session+")"}, for Academic year
                  {notification.academic_year+")"+notification.semester+")"} is assigned to you.
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: "0.9rem" }}>No new course assignments</p>
        )}
        <button
          onClick={onClose}
          style={{
            marginTop: "10px",
            padding: "5px 10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    );
  }
  
export default NotificationPanel;
