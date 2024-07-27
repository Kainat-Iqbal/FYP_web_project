const DB = require("../DB/dbConfig");

const getBatchProgram = (req, res) => {
    const queryToGetBatch = "SELECT * FROM batch";
    const queryToGetclass = "SELECT * FROM degree_program";

    let results = {};
    let completedQueries = 0;
    const totalQueries = 2;

    const checkIfComplete = () => {
        completedQueries++;
        if (completedQueries === totalQueries) {
            res.json(results);
        }
    };

    DB.query(queryToGetBatch, (err, batch) => {
        if (err) {
            console.log("Error to get Batch");
            results.batch = [];
        } else {
            results.batch = batch;
        }
        checkIfComplete();
    });

    DB.query(queryToGetclass, (err, degree_program) => {
        if (err) {
            console.log("Error to get class");
            results.degree_program = [];
        } else {
            results.degree_program = degree_program;
        }
        checkIfComplete();
    });
};

const addSession = async (req, res) => {
    const adminId = req.body.adminId;
    console.log("adminId",adminId)
    const queryToAddSession = "INSERT INTO `session`(`adminId`, `programId`, `batchId`, `academic_year`, `semester`) VALUES (?)";
    const VALUES = [
        adminId,
        req.body.programId,
        req.body.batchId,
        req.body.academic_year,
        req.body.semester
        ];
      console.log(VALUES)
    // Execute the query
    DB.query(queryToAddSession, [VALUES], (err, data) => {
        if (err) {
           console.log("Error",err)
          } 
          else {
            console.log("Session created successfully");
            return res.json("success");
          }
    });
};

const viewSession = async (req, res) => {
    // Query to fetch all teachers from the database
    const queryToViewSession = "SELECT s.sessionId, s.adminId, s.programId, s.batchId, s.academic_year, s.semester, b.*, d.* FROM session s LEFT JOIN batch b ON s.batchId = b.batchId LEFT JOIN degree_program d ON s.programId = d.programId";
    // Execute the query
    DB.query(queryToViewSession, (err, results) => {
        if (err) {
            console.error("Error fetching session:", err);
            return res.status(500).json("Failed to fetch session");
        } 
        else {
            // If there are results, return them
            if (results.length > 0) {
                // console.log(results)
                return res.json(results);
            } 
            else {
                // If no teachers are found, return an appropriate message
                return res.json("No session found");
            }
        }
    });
  };

  const getSession = async (req,res) => {
    const queryToGet = "SELECT * FROM `session` WHERE `sessionId` = ?";
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
  
  const updateSession = async(req,res) => {
    const quertToUpdate ="UPDATE `session` SET `adminId`=?,`programId`=?,`batchId`=?,`academic_year`=?,`semester`=? WHERE sessionId = ?";
    const id = req.params.id;
    const VALUE = [
        req.body.adminId,
        req.body.programId,
        req.body.batchId,
        req.body.academic_year,
        req.body.semester,
        req.body.sessionId
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

module.exports = {getBatchProgram,addSession,viewSession,getSession,updateSession};
