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

const addHod = async (req, res) => {
  const teacherID = req.body.teacherId;
  const adminId = req.body.adminId;
  // console.log("adminId", adminId, teacherID);

  const queryForTeacher = "SELECT * FROM teacher WHERE teacherId = ?";
  DB.query(queryForTeacher, [teacherID], async (err, result) => {
    if (err) {
      console.error("Error retrieving teacher for hod:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to retrieve teacher for hod" });
    } else {
              // Encrypt the password
              const hashedPassword = await hashPassword("hodUser123*");

      if (result.length > 0) {
        // console.log(result);
        const teacherData = result[0];
        const values = [
          adminId,
          teacherID,
          teacherData.name,
          teacherData.email,
          hashedPassword,
          teacherData.designation,
          teacherData.department,
          teacherData.CNIC,
          teacherData.status,
          teacherData.qualification,
          teacherData.JoiningDate
        ];

        const queryToAddHod = "INSERT INTO `hod`(`adminId`,`teacherId`, `name`, `email`, `password`, `designation`, `department`, `CNIC`, `status`, `qualification`, `JoiningDate`) VALUES (?)";

        // Execute the query
        DB.query(queryToAddHod, [values], (err, data) => {
          if (err) {
            console.error("Error adding hod:", err);
            return res
              .status(500)
              .json({ success: false, message: "Failed to add hod" });
          } else {
            console.log("hod added successfully");
            return res.json("success");
          }
        });
      }
    }
  });
};


const getHod = async (req, res) => {
  const queryToGet = "SELECT * FROM hod WHERE status = 'Active'";
  DB.query(queryToGet, (err, result) => {
    if (err) {
      return res.json({ Error: err });
    } else {
      // console.log("up", result);
      return res.json(result);
    }
  });
};

const getToUpdateHod = async (req,res) => {
  const queryToGet = "SELECT * FROM hod WHERE HODId = ?";
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

const updateHod = async(req,res) => {
  
  const quertToUpdate ="UPDATE `hod` SET `name`=?,`email`=?,`password`=?,`designation`=?,`department`=?,`CNIC`=?,`status`=?,`qualification`=?,`JoiningDate`=? WHERE HODId = ?";
  const id = req.params.id;
  const VALUE = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.designation,
    req.body.department,
    req.body.CNIC,
    req.body.status,
    req.body.qualification,
    req.body.JoiningDate,
    req.body.HODId,
    req.body.adminId
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

const getAllHod = async (req, res) => {
  // Query to fetch all teachers from the database
  const queryToViewHod = "SELECT * FROM hod";
  // Execute the query
  DB.query(queryToViewHod, (err, results) => {
      if (err) {
          console.error("Error fetching hod:", err);
          return res.status(500).json("Failed to fetch hod");
      } 
      else {
          // If there are results, return them
          if (results.length > 0) {
              // console.log(results)
              return res.json(results);
          } 
          else {
              // If no teachers are found, return an appropriate message
              return res.json("No hod found");
          }
      }
  });
};

const getHodNotifications = (req, res) => {
  const HODId = req.params.id;

  // Query for teacher result lock/upload notifications (includes teacher's name)
  const resultLockNotificationsQuery = `
    SELECT 
      CONCAT('Ms. ', t.name, ' has uploaded the result of "', c.course_title, ' (', c.course_code, ')" ') AS message,
      'result_locked' AS type,
      s.created_at AS notification_time
    FROM status s
    JOIN assign_course ac ON s.assignId = ac.assignId
    JOIN course c ON ac.courseId = c.courseId
    JOIN teacher t ON ac.teacherId = t.teacherId
    WHERE s.lockResult IS NOT NULL
  `;

  // Query for teacher editing requests notifications
  const teacherRequestNotificationsQuery = `
  SELECT 
  CONCAT('Ms. ', t.name, ' has requested editing for "', r.course_name, ' (', r.course_code, ')" result. Reason: ', r.description) AS message,
  'editing_request' AS type,
  r.created_at AS notification_time
FROM requests r
JOIN teacher t ON r.teacherId = t.teacherId
WHERE 
r.status IS NOT NULL 
AND r.status NOT LIKE '%disapproved%' 

  `;

  // Execute the result lock/upload notifications query
  DB.query(resultLockNotificationsQuery, (err, lockResults) => {
    if (err) {
      console.error('Error fetching result lock notifications:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch result lock notifications' });
    }

    // Execute the teacher editing request notifications query
    DB.query(teacherRequestNotificationsQuery, [HODId], (err, requestResults) => {
      if (err) {
        console.error('Error fetching teacher request notifications:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch teacher request notifications' });
      }

      // Combine and sort notifications by time
      const allNotifications = [...lockResults, ...requestResults];
      const sortedNotifications = allNotifications.sort(
        (a, b) => new Date(b.notification_time) - new Date(a.notification_time)
      );

      res.json(sortedNotifications);
    });
  });
};

module.exports = {addHod,getHod,getToUpdateHod,updateHod,getAllHod,getHodNotifications}