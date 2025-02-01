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

const addDean = async (req, res) => {
  const adminId = req.body.adminId;
  const email = req.body.email;

  console.log("adminId", adminId);

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

        // Email does not exist, proceed with inserting the dean
          const queryToAddDean = `
              INSERT INTO dean (adminId, name, email, password, faculty, CNIC, status, qualification, JoiningDate)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
          const VALUES = [
              adminId,
              req.body.name,
              email,
              hashedPassword,
              req.body.faculty,
              req.body.CNIC,
              req.body.status,
              req.body.qualification,
              req.body.joiningDate
          ];
          
          console.log(VALUES);

          // Execute the insert query
          DB.query(queryToAddDean, VALUES, (err, data) => {
              if (err) {
                  console.error("Error adding dean:", err);
                  return res.status(500).json({ success: false, message: "Failed to add dean" });
              } else {
                  console.log("Dean added successfully");
                  return res.json("success");
              }
          });
      }
  });
};


const viewDean = async (req, res) => {
  // Query to fetch all teachers from the database
  const queryToViewTeacher = "SELECT * FROM dean";
  // Execute the query
  DB.query(queryToViewTeacher, (err, results) => {
      if (err) {
          console.error("Error fetching deans:", err);
          return res.status(500).json("Failed to fetch deans");
      } 
      else {
          // If there are results, return them
          if (results.length > 0) {
              // console.log(results)
              return res.json(results);
          } 
          else {
              // If no teachers are found, return an appropriate message
              return res.json("No Deans found");
          }
      }
  });
};

const getDean = async (req,res) => {
    const queryToGet = "SELECT * FROM dean WHERE deanId = ?";
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
  
  const updateDean = async(req,res) => {
    const quertToUpdate ="UPDATE `dean` SET `adminId`=?,`name`=?,`email`=?,`password`=?,`faculty`=?,`CNIC`=?,`status`=?,`qualification`=?,`JoiningDate`=? WHERE deanId = ?";
    const id = req.params.id;
    const VALUE = [
      req.body.adminId, // Use the retrieved admin ID
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.faculty,
      req.body.CNIC,
      req.body.status,
      req.body.qualification,
      req.body.JoiningDate,
      req.body.deanId
    ];
    // console.log(VALUE)
    DB.query(quertToUpdate,VALUE,(err,result)=>{
      if(err){
        // console.log("firsterrr",err)
        return res.json(err)
      } 
      else{
    // console.log("firstsucc")
        return res.json({updated:true})
      }
    })
  
  }
  const getDeanNotifications = (req, res) => {
    const DeanID = req.params.id;
  
    // Query to get status notifications (HOD's approvals/disapprovals for results)
    const statusNotificationsQuery = `
    SELECT 
  CASE 
    WHEN s.HODId IS NOT NULL AND s.approvedHod = 'Yes' THEN 
      CONCAT('The result of "', c.course_title, ' (', c.course_code, ')" has been approved by the HOD.')
    WHEN s.HODId IS NOT NULL AND s.approvedHod = 'No' THEN 
      CONCAT('The result of "', c.course_title, ' (', c.course_code, ')" has been disapproved by the HOD.')
  END AS message,
  'hod_result_approval' AS type,
  s.created_at AS notification_time
FROM status s
JOIN assign_course ac ON s.assignId = ac.assignId
JOIN course c ON ac.courseId = c.courseId
WHERE s.HODId IS NOT NULL  -- Ensure HOD action exists
AND s.deanId IS NULL;  -- Ensure result reached Dean level

    `;
  
    // Query to get request notifications (HOD's approvals/disapprovals for editing requests)
    const requestNotificationsQuery = `
    SELECT 
    CASE 
      WHEN r.HODId IS NOT NULL AND r.status LIKE '%approvedByHod%' THEN 
        CONCAT('Request for editing "', r.course_name, ' (', r.course_code, ')" has been approved by the HOD.')
      WHEN r.HODId IS NOT NULL AND r.status LIKE '%disapproved By Hod%' THEN 
        CONCAT('Request for editing "', r.course_name, ' (', r.course_code, ')" has been disapproved by the HOD. Reason: ', IFNULL(r.disapproveReason, 'No reason provided.'))
    END AS message,
    'hod_request_approval' AS type,
    r.created_at AS notification_time
  FROM requests r
  WHERE r.HODId IS NOT NULL  -- Ensure HOD action exists
  AND r.currentHandle LIKE '%HOD%'
  AND r.deanId IS NULL  -- Ensure only HOD decisions are shown
  AND (r.status LIKE '%approved%' OR r.status LIKE '%disapproved%');  
  
   `;
  
    // Execute the status notifications query
    DB.query(statusNotificationsQuery, [DeanID], (err, statusResults) => {
      if (err) {
        console.error('Error fetching status notifications:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch status notifications' });
      }
  
      // Execute the request notifications query
      DB.query(requestNotificationsQuery, [DeanID], (err, requestResults) => {
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
  

module.exports = { addDean, viewDean, getDean, updateDean, getDeanNotifications };
