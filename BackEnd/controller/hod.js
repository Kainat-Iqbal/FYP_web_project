const DB = require("../DB/dbConfig");
const bcrypt = require('bcrypt');
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

module.exports = {addHod,getHod,getToUpdateHod,updateHod,getAllHod}