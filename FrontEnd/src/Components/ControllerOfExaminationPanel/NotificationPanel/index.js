import React, { useState, useEffect } from "react";
import axios from "axios";

function NotificationPanel({ onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [examinationID, setexaminationId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/session", {
          withCredentials: true,
        });
        setexaminationId(response.data.userId);
      } catch (error) {
        console.error("Error fetching teacher session data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!examinationID) return;
  
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8081/examination/Get/Notification/${examinationID}`
        );
        setNotifications(response.data); // Combined notifications
        setLoading(false);
        
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };
  
    fetchNotifications();
  }, [examinationID]);

  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "100%",
          right: "20px",
          width: "300px",
          maxHeight: "500px",
          overflowY: "auto",
          backgroundColor: "white",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          zIndex: "1000",
          padding: "10px",
        }}
      >
        <p style={{ fontSize: "0.9rem" }}>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        right: "20px",
        width: "300px",
        maxHeight: "500px",
        overflowY: "auto",
        backgroundColor: "white",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        zIndex: "1000",
        padding: "10px",
      }}
    >
      {notifications.length > 0 ? (
        <ul style={{ listStyle: "none", padding: "0" }}>
          {notifications.map((notification, index) => (
            <li
              key={index}
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px 0",
              }}
            >
              <p
                style={{
                  margin: "5px 0",
                  fontSize: "0.9rem",
                  color: "black",
                }}
              >
                {notification.message}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: "0.9rem" }}>No new notifications</p>
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
