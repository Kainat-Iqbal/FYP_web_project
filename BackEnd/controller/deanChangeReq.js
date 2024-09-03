const DB = require("../DB/dbConfig");

const deanViewChangeReq = async (req, res) => {
  const queryToViewRequests =
    "SELECT requests.*, teacher.name FROM requests JOIN teacher ON requests.teacherId = teacher.teacherId WHERE requests.status = 'approvedByHod'";
  // Execute the query
  DB.query(queryToViewRequests, (err, results) => {
    if (err) {
      console.error("Error fetching requests:", err);
      return res.status(500).json("Failed to fetch requests");
    } else {
      // If there are results, return them
      if (results.length > 0) {
        console.log("dreq",results)
        return res.json(results);
      } else {
        // If no teachers are found, return an appropriate message
        return res.json("No requests found");
      }
    }
  });
};

const deanViewDisapproveReq = async (req, res) => {
    const queryToViewDisapproveReq ="SELECT requests.*, teacher.name FROM requests JOIN teacher ON requests.teacherId = teacher.teacherId WHERE requests.status = 'disapprovedByDean' AND requests.currentHandle = 'Dean' ";

    // Execute the query
    DB.query(queryToViewDisapproveReq, (err, results) => {
      if (err) {
        console.error("Error fetching requests:", err);
        return res.status(500).json("Failed to fetch requests");
      } else {
        // If there are results, return them
        if (results.length > 0) {
          // console.log(results)
          return res.json(results);
        } else {
          // If no teachers are found, return an appropriate message
          return res.json("No requests found");
        }
      }
    });
  };

const deanAddDisapprove = async (req, res) => {
  const { id } = req.params;
  const { reason , deanId, date} = req.body;

  if (!reason || reason.trim() === "") {
    return res.status(400).json({ message: "Disapproval reason is required." });
  }

  const queryToUpdateRequest =
    "UPDATE `requests` SET `deanId`=?, `dateUpdated` =?, `currentHandle`=?,`status`=?, `disapproveReason`=? WHERE requestId = ?";

  // Directly use the values without unnecessary variable assignments
  const VALUES = [
    deanId,
    date,
    "Dean", // currentHandle
    "disapprovedByDean", // status
    reason, // disapproveReason
    id, // requestId
  ];

  DB.query(queryToUpdateRequest, VALUES, (err, results) => {
    if (err) {
      console.error("Error updating request:", err);
      return res.status(500).json("Failed to update request");
    } else {
      if (results.affectedRows > 0) {
        // console.log(id, reason);
        return res.json({ updated: true });
      } else {
        return res.status(404).json("Request not found");
      }
    }
  });
};

const deanApproveReq = async (req, res) => {
  const { id } = req.params;
  const {deanId,date} = req.body;

  const queryToUpdateApproveRequest =
    "UPDATE `requests` SET `deanId`=?, `dateUpdated` =?, `currentHandle`=?,`status`=? WHERE requestId = ?";

  // Directly use the values without unnecessary variable assignments
  const values = [
    deanId,
    date,
    "Dean", // currentHandle
    "approvedByDean", // status
    id, // requestId
  ];

  DB.query(queryToUpdateApproveRequest, values, (err, results) => {
    if (err) {
      console.error("Error updating request:", err);
      return res.status(500).json("Failed to update request");
    } else {
      if (results.affectedRows > 0) {
        // console.log("approve",id);
        return res.json({ updated: true });
      } else {
        return res.status(404).json("Request not found");
      }
    }
  });
};



module.exports = { deanViewChangeReq, deanAddDisapprove, deanViewDisapproveReq, deanApproveReq };
