const DB = require("../DB/dbConfig");

const addDegree = async (req, res) => {
    // Query to fetch all teachers from the database
    const adminId = req.body.adminId;
    console.log("adminId",adminId)
    const queryToAddDegree = "INSERT INTO `degree_program`(`adminId`, `type`, `degree`, `total_credit_hours`) VALUES  (?)";
    const VALUES = [
        adminId,
        req.body.type,
        req.body.degree,
        req.body.total_credit_hours
      ];
      console.log(VALUES)
    // Execute the query
    DB.query(queryToAddDegree, [VALUES], (err, data) => {
        if (err) {
            console.error("Error adding degree:", err);
            return res
              .status(500)
              .json({ success: false, message: "Failed to add degree" });
          } 
          else {
            console.log("Degree added successfully");
            return res.json("success");
          }
    });
};

const viewDegree = async (req, res) => {
  // Query to fetch all teachers from the database
  const queryToViewDegree = "SELECT * FROM degree_program";
  // Execute the query
  DB.query(queryToViewDegree, (err, results) => {
      if (err) {
          console.error("Error fetching degree:", err);
          return res.status(500).json("Failed to fetch degree");
      } 
      else {
          // If there are results, return them
          if (results.length > 0) {
              // console.log(results)
              return res.json(results);
          } 
          else {
              // If no teachers are found, return an appropriate message
              return res.json("No degree found");
          }
      }
  });
};

const getDegree = async (req,res) => {
    const queryToGet = "SELECT * FROM degree_program WHERE programId = ?";
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
  
  const updateDegree = async(req,res) => {
    const quertToUpdate ="UPDATE `degree_program` SET `adminId`=?,`type`=?,`degree`=?,`total_credit_hours`=? WHERE programId = ?";
    const id = req.params.id;
    const VALUE = [
        req.body.adminId,
        req.body.type,
        req.body.degree,
        req.body.total_credit_hours,
        req.body.programId
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
  
module.exports = {addDegree,viewDegree,getDegree,updateDegree}