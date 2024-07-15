const DB = require("../DB/dbConfig");

const addCourse = async (req, res) => {
    // Query to fetch all teachers from the database
    const adminId = 1;
    console.log("adminId",adminId)
    const queryToAddCourse = "INSERT INTO `course`(`adminId`, `course_code`, `course_title`, `course_type`, `th_credit_hr`, `lab_credit_hr`, `max_mid_marks`, `min_mid_marks`, `max_th_marks`, `min_th_marks`, `max_sessional`, `min_sessional`, `max_lab`, `min_lab`, `total_marks`) VALUES (?)";
    const VALUES = [
        adminId,
        req.body.code,
        req.body.title,
        req.body.type,
        req.body.thHours,
        req.body.labHours,
        req.body.totalMid,
        req.body.passingMid,
        req.body.totalTerminal,
        req.body.passingTerminal,
        req.body.totalSessional,
        req.body.passingSessional,
        req.body.totalLab,
        req.body.passingLab,
        req.body.totalMarks
      ];
      console.log(VALUES)
    // Execute the query
    DB.query(queryToAddCourse, [VALUES], (err, data) => {
        if (err) {
            console.error("Error adding course:", err);
            return res
              .status(500)
              .json({ success: false, message: "Failed to add course" });
          } 
          else {
            console.log("Course added successfully");
            return res.json("success");
          }
    });
};

const viewCourse = async (req, res) => {
    const queryToViewCourse = "SELECT * FROM course";
    // Execute the query
    DB.query(queryToViewCourse, (err, results) => {
        if (err) {
            console.error("Error fetching course:", err);
            return res.status(500).json("Failed to fetch course");
        } 
        else {
            // If there are results, return them
            if (results.length > 0) {
                // console.log(results)
                return res.json(results);
            } 
            else {
                // If no teachers are found, return an appropriate message
                return res.json("No course found");
            }
        }
    });
  };
  
  const getCourse = async (req,res) => {
    const queryToGet = "SELECT * FROM course WHERE courseId = ?";
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
  
  const updateCourse = async(req,res) => {
    const quertToUpdate ="UPDATE `course` SET `adminId`=?, `course_code`=?,`course_title`=?,`course_type`=?,`th_credit_hr`=?,`lab_credit_hr`=?,`max_mid_marks`=?,`min_mid_marks`=?,`max_th_marks`=?,`min_th_marks`=?,`max_sessional`=?,`min_sessional`=?,`max_lab`=?,`min_lab`=?,`total_marks`=? WHERE courseId = ?";
    const id = req.params.id;
    const VALUE = [
        req.body.adminId,
        req.body.course_code,
        req.body.course_title,
        req.body.course_type,
        req.body.th_credit_hr,
        req.body.lab_credit_hr,
        req.body.max_mid_marks,
        req.body.min_mid_marks,
        req.body.max_th_marks,
        req.body.min_th_marks,
        req.body.max_sessional,
        req.body.min_sessional,
        req.body.max_lab,
        req.body.min_lab,
        req.body.total_marks,
        req.body.courseId 
    ];
     console.log(VALUE)
    DB.query(quertToUpdate,VALUE,(err,result)=>{
      if(err){
        // console.log("firsterrr",err)
        return res.json(err)
      } 
      else{
        console.log("firstsucc")
        return res.json({updated:true})
      }
    })
  
  }

module.exports={addCourse,viewCourse,getCourse,updateCourse}