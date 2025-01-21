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

const addTeacher = async (req, res) => {
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
          SELECT email FROM teacher WHERE email = ? 
          UNION
          SELECT email FROM student WHERE email = ?
      ) AS email_check
      LIMIT 1
  `;

  // Execute the email check query
  DB.query(checkEmailQuery, [email, email, email, email,email, email], async (err, result) => {
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

        const queryToAdd = `
          INSERT INTO teacher (name, email, password, designation, department, adminId, CNIC, status, qualification, JoiningDate, photo)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const VALUES = [
          req.body.name,
          req.body.email,
          hashedPassword, // Use hashed password
          req.body.designation,
          req.body.department,
          adminId,
          req.body.CNIC,
          req.body.status,
          req.body.qualification,
          req.body.JoiningDate,
          req.body.photo
        ];
          
          console.log(VALUES);

          // Execute the insert query
          DB.query(queryToAdd, VALUES, (err, data) => {
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


// const addTeacher = async (req, res) => {
//   try {
//     // Query for Admin ID
//     const queryForAdminId = "SELECT adminId FROM admin WHERE adminEmail = ?";
//     const adminEmail = req.body.adminEmail;
//     let adminId;

//     // Make the callback function async
//     DB.query(queryForAdminId, [adminEmail], async (err, result) => {
//       if (err) {
//         console.error("Error retrieving admin ID:", err);
//         return res.status(500).json({ success: false, message: "Failed to retrieve admin ID" });
//       }

//       if (result.length > 0) {
//         adminId = result[0].adminId;
//         console.log("Admin ID:", adminId);

//         // Encrypt the password
//         const hashedPassword = await hashPassword(req.body.password);

//         const queryToAdd = `
//           INSERT INTO teacher (name, email, password, designation, department, adminId, CNIC, status, qualification, JoiningDate, photo)
//           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;
//         const VALUES = [
//           req.body.name,
//           req.body.email,
//           hashedPassword, // Use hashed password
//           req.body.designation,
//           req.body.department,
//           adminId,
//           req.body.CNIC,
//           req.body.status,
//           req.body.qualification,
//           req.body.JoiningDate,
//           req.body.photo
//         ];

//         DB.query(queryToAdd, VALUES, (err, result) => {
//           if (err) {
//             console.error("Error adding teacher:", err);
//             return res.status(500).json({ success: false, message: "Failed to add teacher" });
//           }
//           return res.json("success");
//         });
//       } else {
//         return res.status(404).json({ success: false, message: "Admin not found" });
//       }
//     });
//   } catch (error) {
//     console.error("Error in addTeacher:", error);
//     return res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };



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

const getTeacher = async (req,res) => {
  const queryToGet = "SELECT * FROM teacher WHERE teacherId = ?";
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

const updateTeacher = async(req,res) => {

  const quertToUpdate ="UPDATE `teacher` SET `name`=?,`email`=?,`designation`=?,`department`=?,`adminId`=?,`CNIC`=?,`status`=?,`qualification`=?,`JoiningDate`=? WHERE teacherId = ?";
  const id = req.params.id;
  const VALUE = [
    req.body.name,
    req.body.email,
    req.body.designation,
    req.body.department,
    req.body.adminId, // Use the retrieved admin ID
    req.body.CNIC,
    req.body.status,
    req.body.qualification,
    req.body.JoiningDate,
    req.body.teacherId
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

const getTeacherNotifications = (req, res) => {
  const TeacherID = req.params.id;

  // Query to get course notifications
  const courseNotificationsQuery = `
    SELECT 
      CONCAT(
        c.course_title, 
        ' (', c.course_code, ') for ', dp.type, 
        ' (', dp.degree, ') batch ', b.year, 
        ' (', b.session, '), for Academic year ', 
        s.academic_year, 
        ' (', s.semester, ') is assigned to you.'
      ) AS message,
      'course' AS type,
      ac.created_at AS notification_time
    FROM assign_course ac
    JOIN course c ON ac.courseId = c.courseId
    JOIN session s ON ac.sessionId = s.sessionId
    JOIN degree_program dp ON s.programId = dp.programId
    JOIN batch b ON s.batchId = b.batchId
    WHERE ac.teacherId = ?
  `;

  // Query to get status notifications with approval details
  const statusNotificationsQuery = `
    SELECT 
      CASE 
        WHEN s.examinationId IS NOT NULL AND s.approvedExamination = 'Yes' THEN 
          CONCAT('The result of "', c.course_title, ' (', c.course_code, ')" has been approved by the Examination Office.')
        WHEN s.examinationId IS NOT NULL AND s.approvedExamination = 'No' THEN 
          CONCAT('The result of "', c.course_title, ' (', c.course_code, ')" has been disapproved by the Examination Office.')
        
        WHEN s.deanId IS NOT NULL AND s.approvedDean = 'Yes' THEN 
          CONCAT('The result of "', c.course_title, ' (', c.course_code, ')" has been approved by the Dean.')
        WHEN s.deanId IS NOT NULL AND s.approvedDean = 'No' THEN 
          CONCAT('The result of "', c.course_title, ' (', c.course_code, ')" has been disapproved by the Dean.')
        
        WHEN s.HODId IS NOT NULL AND s.approvedHod = 'Yes' THEN 
          CONCAT('The result of "', c.course_title, ' (', c.course_code, ')" has been approved by the HOD.')
        WHEN s.HODId IS NOT NULL AND s.approvedHod = 'No' THEN 
          CONCAT('The result of "', c.course_title, ' (', c.course_code, ')" has been disapproved by the HOD.')
      END AS message,
      'approved_course' AS type,
      s.created_at AS notification_time
    FROM status s
    JOIN assign_course ac ON s.assignId = ac.assignId
    JOIN course c ON ac.courseId = c.courseId
    WHERE ac.teacherId = ? AND 
          (s.HODId IS NOT NULL OR s.deanId IS NOT NULL OR s.examinationId IS NOT NULL)
  `;

  // Query to get request notifications (editing requests)
  const requestNotificationsQuery = `
    SELECT 
      CASE 
        WHEN r.status LIKE '%teacher%' THEN NULL
        WHEN r.status LIKE '%disapproved%' THEN 
          CONCAT('Request for editing "', r.course_name, '" is ', r.status, '. Reason: ', r.disapproveReason)
        ELSE 
          CONCAT('Request for editing "', r.course_name, '" is ', r.status)
      END AS message,
      'requests' AS type,
      r.created_at AS notification_time
    FROM requests r
    WHERE r.teacherId = ? AND 
          (r.status NOT LIKE '%teacher%' AND r.status NOT LIKE '%disapproved%')
  `;

  // Execute the course notifications query
  DB.query(courseNotificationsQuery, [TeacherID], (err, courseResults) => {
    if (err) {
      console.error('Error fetching course notifications:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch course notifications' });
    }

    // Execute the status notifications query
    DB.query(statusNotificationsQuery, [TeacherID], (err, statusResults) => {
      if (err) {
        console.error('Error fetching status notifications:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch status notifications' });
      }

      // Execute the request notifications query
      DB.query(requestNotificationsQuery, [TeacherID], (err, requestResults) => {
        if (err) {
          console.error('Error fetching request notifications:', err);
          return res.status(500).json({ success: false, message: 'Failed to fetch request notifications' });
        }

        // Combine all results
        const allNotifications = [...courseResults, ...statusResults, ...requestResults];

        // Filter out null messages (from requests where the status includes 'teacher')
        const filteredNotifications = allNotifications.filter(notification => notification.message !== null);

        // Sort all notifications by created_at (descending) to show the most recent first
        const sortedNotifications = filteredNotifications.sort(
          (a, b) => new Date(b.notification_time) - new Date(a.notification_time)
        );

        // Respond with sorted notifications
        res.json(sortedNotifications);
      });
    });
  });
};


module.exports = { addTeacher,viewTeacher, getTeacher,updateTeacher,getTeacherNotifications};
