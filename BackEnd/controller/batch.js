const DB = require("../DB/dbConfig");

const addBatch = async (req, res) => {
    // Query to fetch all teachers from the database
    const adminId = req.body.adminId;
    console.log("adminId",adminId)
    const queryToAddBatch = "INSERT INTO `batch`(`adminId`, `year`, `session`) VALUES  (?)";
    const VALUES = [
        adminId,
        req.body.year,
        req.body.session,
      ];
      console.log(VALUES)
    // Execute the query
    DB.query(queryToAddBatch, [VALUES], (err, data) => {
        if (err) {
            console.error("Error adding batch:", err);
            return res
              .status(500)
              .json({ success: false, message: "Failed to add batch" });
          } 
          else {
            console.log("Batch added successfully");
            return res.json("success");
          }
    });
};

const viewBatch = async (req, res) => {
  // Query to fetch all teachers from the database
  const queryToViewBatch = "SELECT * FROM batch";
  // Execute the query
  DB.query(queryToViewBatch, (err, results) => {
      if (err) {
          console.error("Error fetching batch:", err);
          return res.status(500).json("Failed to fetch batch");
      } 
      else {
          // If there are results, return them
          if (results.length > 0) {
              // console.log(results)
              return res.json(results);
          } 
          else {
              // If no teachers are found, return an appropriate message
              return res.json("No batch found");
          }
      }
  });
};

const getBatch = async (req,res) => {
    const queryToGet = "SELECT * FROM `batch` WHERE `batchId` = ?";
    const id = req.params.id;
    DB.query(queryToGet,[id],(err,result) =>{
      if(err){
        // console.log("first")
        return res.json({Error: err})
      }
      else{
        console.log("up",result)
        return res.json(result);
      }
    })  
  }
  
  const updateBatch = async(req,res) => {
    const quertToUpdate ="UPDATE `batch` SET `adminId`=?,`year`=?,`session`=? WHERE batchId = ?";
    const id = req.params.id;
    const VALUE = [
        req.body.adminId,
        req.body.year,
        req.body.session,
        req.body.batchId
    ];
    console.log(VALUE)
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
  
module.exports = {addBatch,viewBatch,getBatch,updateBatch}