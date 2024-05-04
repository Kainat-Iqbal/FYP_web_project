const DB = require("../DB/dbConfig");

const addTeacher = async (req, res) => {
  const adminEmail = req.body.adminEmail;
  const queryForAdminId = "SELECT adminId FROM admin WHERE adminEmail = ?";

  DB.query(queryForAdminId, [adminEmail], (err, result) => {
    if (err) {
      console.error("Error retrieving admin ID:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to retrieve admin ID" });
    } else {
      if (result.length > 0) {
        const adminId = result[0].adminId;
        console.log("Admin ID:", adminId);

        const queryToAdd =
          "INSERT INTO `teacher` (`name`, `email`, `password`, `designation`, `department`, `adminId`) VALUES (?)";
        const VALUES = [
          req.body.name,
          req.body.email,
          req.body.password,
          req.body.designation,
          req.body.department,
          adminId, // Use the retrieved admin ID
        ];

        DB.query(queryToAdd, [VALUES], (err, data) => {
          if (err) {
            console.error("Error adding teacher:", err);
            return res
              .status(500)
              .json({ success: false, message: "Failed to add teacher" });
          } else {
            console.log("Teacher added successfully");
            return res.json("success");
          }
        });
      } else {
        console.log("Admin not found for email:", adminEmail);
        return res
          .status(404)
          .json({ success: false, message: "Admin not found" });
      }
    }
  });
};

const viewTeacher = async (req, res) => {
        // Query to fetch all teachers from the database
        const queryToViewTeacher = "SELECT * FROM teacher";
        // Execute the query
        DB.query(queryToViewTeacher, (err, results) => {
            if (err) {
                console.error("Error fetching teachers:", err);
                return res.status(500).json("Failed to fetch teachers");
            } 
            else {
                // If there are results, return them
                if (results.length > 0) {
                    // console.log(results)
                    return res.json(results);
                } 
                else {
                    // If no teachers are found, return an appropriate message
                    return res.json("No teachers found");
                }
            }
        });
};

module.exports = { addTeacher,viewTeacher };
