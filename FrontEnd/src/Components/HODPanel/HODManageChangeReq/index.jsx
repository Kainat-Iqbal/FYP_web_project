import * as React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./hodmanageChangeReq.css";
import SideBar from "../SideBar";
import axios from "axios";
import Dialogue from "../Dialogue"; // Import the Dialogue component

function HODManageChangeReq() {
  const [hodId, setHodId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/session", {
          withCredentials: true,
        });
        setHodId(response.data.userId);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  console.log("HOD", hodId);

  const [request, setRequest] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [disapprovedRequests, setDisapprovedRequests] = useState(new Set()); // Track disapproved requests

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get("http://localhost:8081/changeReq/View");
        setRequest(res.data);
      } catch (error) {
        console.log("Error fetching requests", error);
      }
    };

    fetchRequest();
  }, []);

  const [disapproveReq, setDisapproveReq] = useState([]);
  useEffect(() => {
    const fetchDisapproveRequest = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8081/changeReq/ViewDisapprove"
        );
        setDisapproveReq(res.data);
        console.log("na,e", res.data);
      } catch (error) {
        console.log("Error fetching requests", error);
      }
    };

    fetchDisapproveRequest();
  }, []);

  const handleDisapproveClick = (requestId) => {
    setCurrentRequestId(requestId);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setCurrentRequestId(null);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = currentDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const date = getCurrentDate();

  const handleSend = async (reason) => {
    try {
      const res = await axios.put(
        `http://localhost:8081/changeReq/Disapprove/${currentRequestId}`,
        { reason, hodId, date }
      );

      if (res.data.updated) {
        setDisapprovedRequests((prev) => new Set(prev).add(currentRequestId)); // Mark as disapproved
        alert("Request Disapproved");
        window.location.reload(); // Refresh the page
      }
    } catch (error) {
      console.log("Error disapproving request", error);
    } finally {
      setShowDialog(false);
      setCurrentRequestId(null);
    }
  };

  const handleApprove = async (requestId) => {
    console.log(`Approving request ${requestId}`);
    try {
      const res = await axios.put(
        `http://localhost:8081/changeReq/Approve/${requestId}`,
        { hodId, date }
      );

      if (res.data.updated) {
        alert("Request Approved");
        window.location.reload(); // Refresh the page
      } else {
        console.log("Approval failed:", res.data);
      }
    } catch (error) {
      console.log("Error approving request", error);
    }
  };

  return (
    <div id="HODManageChangeReqMainDiv">
      <SideBar />

      <div id="HODManageChangeReqWithoutBar">
        <div id="HODManageChangeReqTop">
          <h1 style={{ color: "#00304B" }}> Result Change Request </h1>
        </div>

        <div id="HODManageChangeReqBottom">
          <Table striped bordered hover id="HODManageChangeReqTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Instructor Name</th>
                <th>Message/Reason</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(request) && request.length > 0 ?(
                request.map((result) => (
                  <tr key={result.requestId}>
                    <td>{result.requestId}</td>
                    <td>{result.course_code}</td>
                    <td>{result.course_name}</td>
                    <td>{"Ms. " + result.name}</td>
                    <td style={{ whiteSpace: "pre-wrap" }}>
                      {result.description}
                    </td>
                    <td id="action">
                      {!disapprovedRequests.has(result.requestId) ? (
                        <>
                          <button
                            id="approveButtonHOD"
                            onClick={() => handleApprove(result.requestId)}
                          >
                            Approve
                          </button>

                          <button
                            id="disapproveButtonHOD"
                            style={{
                              borderColor: "#cd5c5c",
                              backgroundColor: "#cd5c5c",
                            }}
                            onClick={() =>
                              handleDisapproveClick(result.requestId)
                            }
                          >
                            Disapprove
                          </button>
                        </>
                      ) : (
                        <span>Disapproved</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <div id="HODManageChangeReqTop">
          <h1 style={{ color: "#00304B" }}> Disapproved Request </h1>
        </div>

        <div id="HODManageChangeReqBottom">
          <Table striped bordered hover id="HODManageChangeReqTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Instructor Name</th>
                <th>Message/Reason</th>
                <th>Reason for Disapproval</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(disapproveReq) && disapproveReq.length > 0 ?(
              disapproveReq.map((results) => (
                <tr key={results.requestId}>
                  <td>{results.requestId}</td>
                  <td>{results.course_code}</td>
                  <td>{results.course_name}</td>
                  <td>{"Ms. " + results.name}</td>
                  {console.log("njnk", results.name)}
                  <td style={{ whiteSpace: "pre-wrap" }}>
                    {results.description}
                  </td>
                  <td>{results.disapproveReason}</td>
                  <td>
                    <span>Disapproved</span>
                  </td>
                </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No requests found
                    </td>
                  </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      <Dialogue
        show={showDialog}
        handleClose={handleCloseDialog}
        handleSend={handleSend}
      />
    </div>
  );
}

export default HODManageChangeReq;
