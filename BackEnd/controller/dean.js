const DB = require("../DB/dbConfig");

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
  DB.query(checkEmailQuery, [email, email, email, email, email], (err, result) => {
      if (err) {
          console.error("Error checking email:", err);
          return res.status(500).json({ success: false, message: "Failed to check email" });
      }

      if (result.length > 0) {
          // Email already exists
          return res.json("emailAlreadyExist");
      } else {
          // Email does not exist, proceed with inserting the dean
          const queryToAddDean = `
              INSERT INTO dean (adminId, name, email, password, faculty, CNIC, status, qualification, JoiningDate)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
          const VALUES = [
              adminId,
              req.body.name,
              email,
              req.body.password,
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


// const addDean = async (req, res) => {
//     // Query to fetch all teachers from the database
//     const adminId = req.body.adminId;
//     console.log("adminId",adminId)
//     const queryToAddDean = "INSERT INTO `dean` (`adminId`, `name`, `email`, `password`, `faculty`, `CNIC`, `status`, `qualification`, `JoiningDate`) VALUES (?)";
//     const VALUES = [
//         adminId,
//         req.body.name,
//         req.body.email,
//         req.body.password,
//         req.body.faculty,
//          // Use the retrieved admin ID
//         req.body.CNIC,
//         req.body.status,
//         req.body.qualification,
//         req.body.joiningDate
//       ];
//       console.log(VALUES)
//     // Execute the query
//     DB.query(queryToAddDean, [VALUES], (err, data) => {
//         if (err) {
//             console.error("Error adding dean:", err);
//             return res
//               .status(500)
//               .json({ success: false, message: "Failed to add dean" });
//           } 
//           else {
//             console.log("Dean added successfully");
//             return res.json("success");
//           }
//     });
// };

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
  
module.exports = {addDean,viewDean,getDean,updateDean}