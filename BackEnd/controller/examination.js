const DB = require("../DB/dbConfig");

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error("Hashing error:", error);
    return null;
  }
};

const addExamination = async (req, res) => {
    // Query to fetch all teachers from the database
    const adminId = req.body.adminId;
    console.log("adminId",adminId)
  // Query to check if the email exists in any table
  const checkEmailQuery = `
      SELECT 'exists' 
      FROM (
          SELECT email FROM dean WHERE email = ? 
          UNION
          SELECT adminEmail FROM admin WHERE adminEmail = ? 
          UNION
          SELECT email FROM examination_controller WHERE email = ?
          UNION
          SELECT email FROM parents WHERE email = ? 
          UNION
          SELECT email FROM student WHERE email = ?
      ) AS email_check
      LIMIT 1
  `;

  // Execute the email check query
  DB.query(checkEmailQuery, [email, email, email, email, email], async (err, result) => {
      if (err) {
          console.error("Error checking email:", err);
          return res.status(500).json({ success: false, message: "Failed to check email" });
      }

      if (result.length > 0) {
          // Email already exists
          return res.json("emailAlreadyExist");
      } else {

    // Encrypt the password
        const hashedPassword = await hashPassword(req.body.password);

    const queryToAddDean = "INSERT INTO `examination_controller`(`adminId`, `name`, `email`, `password`, `CNIC`, `status`, `joiningDate`) VALUES (?)";
    const VALUES = [
        adminId,
        req.body.name,
        req.body.email,
        hashedPassword,
        req.body.CNIC,
        req.body.status,
        req.body.joiningDate
      ];
      console.log(VALUES)
    // Execute the query
    DB.query(queryToAddDean, [VALUES], (err, data) => {
        if (err) {
            console.error("Error adding examination:", err);
            return res
              .status(500)
              .json({ success: false, message: "Failed to add examination" });
          } 
          else {
            console.log("Examination added successfully");
            return res.json("success");
          }
        });
    }
});
};

const viewExamination = async (req, res) => {
    // Query to fetch all teachers from the database
    const queryToViewExamination = "SELECT * FROM examination_controller";
    // Execute the query
    DB.query(queryToViewExamination, (err, results) => {
        if (err) {
            console.error("Error fetching exanimation:", err);
            return res.status(500).json("Failed to fetch examination");
        } 
        else {
            // If there are results, return them
            if (results.length > 0) {
                // console.log(results)
                return res.json(results);
            } 
            else {
                // If no teachers are found, return an appropriate message
                return res.json("No Examinations found");
            }
        }
    });
  };
  
  const getExamination = async (req,res) => {
    const queryToGet = "SELECT * FROM examination_controller WHERE examinationId = ?";
    const id = req.params.id;
    DB.query(queryToGet,[id],(err,result) =>{
      if(err){
        // console.log("first")
        return res.json({Error: err})
      }
      else{
        // console.log("up",result)
        return res.json(result);
      }
    })  
  }
  
  const updateExamination = async(req,res) => {
    const quertToUpdate ="UPDATE `examination_controller` SET `adminId`=?, `name`=?,`email`=?,`password`=?,`CNIC` = ?,`status`=?,`joiningDate`=? WHERE examinationId = ?";
    const id = req.params.id;
    const VALUE = [
      req.body.adminId, // Use the retrieved admin ID
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.CNIC,
      req.body.status,
      req.body.joiningDate,
      req.body.adminId
    ];
    console.log(VALUE)
    DB.query(quertToUpdate,VALUE,(err,result)=>{
      if(err){
        console.log("firsterrr",err)
        return res.json(err)
      } 
      else{
    console.log("firstsucc")
        return res.json({updated:true})
      }
    })
  
  }
  const getExaminationNotifications = (req, res) => {
    const ExaminationID = req.params.id;
  
    // Query to get status notifications (Deans's approvals/disapprovals for results)
    const statusNotificationsQuery = `
    SELECT 
  CASE 
    WHEN s.deanId IS NOT NULL AND s.approvedDean = 'Yes' THEN 
      CONCAT('The result of "', c.course_title, ' (', c.course_code, ')" has been approved by the Dean.')
    WHEN s.deanId IS NOT NULL AND s.approvedDean = 'No' THEN 
      CONCAT('The result of "', c.course_title, ' (', c.course_code, ')" has been disapproved by the Dean.')
  END AS message,
  'dean_result_approval' AS type,
  s.created_at AS notification_time
FROM status s
JOIN assign_course ac ON s.assignId = ac.assignId
JOIN course c ON ac.courseId = c.courseId
WHERE s.deanId IS NOT NULL  -- Ensure dean action exists
AND s.examinationId IS NULL;  -- Ensure result reached Dean level

    `;
  
    // Query to get request notifications (HOD's approvals/disapprovals for editing requests)
    const requestNotificationsQuery = `
    SELECT 
    CASE 
    WHEN r.deanId IS NOT NULL AND r.status LIKE '%disapprovedByDean%' THEN 
    CONCAT('Request for editing "', r.course_name, ' (', r.course_code, ')" has been disapproved by the Dean. Reason: ', IFNULL(r.disapproveReason, 'No reason provided.'))

      WHEN r.deanId IS NOT NULL AND r.status LIKE '%approvedByDean%' THEN 
        CONCAT('Request for editing "', r.course_name, ' (', r.course_code, ')" has been approved by the Dean.')
     END AS message,
    'dean_request_approval' AS type,
    r.created_at AS notification_time
  FROM requests r
  WHERE r.deanId IS NOT NULL  -- Ensure HOD action exists
  AND r.currentHandle LIKE '%Dean%'
  AND r.examinationId IS NULL  -- Ensure only HOD decisions are shown
  AND (r.status LIKE '%approved%' OR r.status LIKE '%disapproved%');  
  
   `;
  
    // Execute the status notifications query
    DB.query(statusNotificationsQuery, [ExaminationID], (err, statusResults) => {
      if (err) {
        console.error('Error fetching status notifications:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch status notifications' });
      }
  
      // Execute the request notifications query
      DB.query(requestNotificationsQuery, [ExaminationID], (err, requestResults) => {
        if (err) {
          console.error('Error fetching request notifications:', err);
          return res.status(500).json({ success: false, message: 'Failed to fetch request notifications' });
        }
  
        // Combine all results
        const allNotifications = [...statusResults, ...requestResults];
  
        // Filter out null messages
        const filteredNotifications = allNotifications.filter(notification => notification.message !== null);
  
        // Sort all notifications by created_at (descending) to show the most recent first
        const sortedNotifications = filteredNotifications.sort(
          (a, b) => new Date(b.notification_time) - new Date(a.notification_time)
        );
  
        // Respond with sorted notifications
        res.json(sortedNotifications);
      });
    });
  };
  


module.exports = {addExamination, viewExamination,getExamination,updateExamination,getExaminationNotifications}