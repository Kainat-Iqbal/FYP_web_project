import React from 'react';
import "./hodTopBar.css";
function TopBar() {
  return (
    <div id="topBarMainDiv"
      style={{
        height: "30vh",
        width: "100vw",
        fontSize: "38px",
        backgroundColor: "#93C098",
        color: "#fff",
        padding: "100px",
        textAlign: "center",
        marginLeft: "200px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        position: "fixed" /* Fix the position */,
        top: "0" /* Position it at the top */,
        // left: " 0" /* Position it at the left */,
        zIndex: "999",
      }}
    >
      Welcome, Ms. Ayesha Javaid
    </div>
  );
}

export default TopBar;
