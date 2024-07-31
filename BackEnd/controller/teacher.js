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

module.exports = { addTeacher,viewTeacher, getTeacher,updateTeacher};
