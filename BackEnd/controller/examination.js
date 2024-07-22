const DB = require("../DB/dbConfig");

const addExamination = async (req, res) => {
    // Query to fetch all teachers from the database
    const adminId = req.body.adminId;
    console.log("adminId",adminId)
    const queryToAddDean = "INSERT INTO `examination_controller`(`adminId`, `name`, `email`, `password`, `CNIC`, `status`, `joiningDate`) VALUES (?)";
    const VALUES = [
        adminId,
        req.body.name,
        req.body.email,
        req.body.password,
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


module.exports = {addExamination, viewExamination,getExamination,updateExamination}