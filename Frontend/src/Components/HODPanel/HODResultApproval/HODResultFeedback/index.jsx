import React, { useState } from "react";
import "./hodResultFeedback.css";
import SideBar from "../../SideBar";

function HODResultFeedback() {
    const [to, setTo] = useState("");
    const [reason, setReason] = useState("");

    const handleSend = () => {
        // Here you can implement the logic to send the feedback
        // For now, I'll just log the values to console
        console.log("To:", to);
        console.log("Reason:", reason);
    };

    return (
        <div id="mainResultFeedbackDiv">
            <SideBar />
            <div id="resultFeedbackContent">
                <h1>Result Feedback</h1>
                <div className="feedbackForm">
                    <label htmlFor="to">To:</label>
                    <input
                        type="text"
                        id="to"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="Enter Instructor Name"
                    />
                </div>
                <div className="feedbackForm">
                    <label htmlFor="reason">Reason:</label>
                    <input
                        type="text"
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter reason for disapprove"
                    />
                </div>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default HODResultFeedback;
