const DB = require("../DB/dbConfig");

const addTeacher = async (req, res) => {
  const adminEmail = req.body.adminEmail;
  const queryForAdminId = "SELECT adminId FROM admin WHERE adminEmail = ?";

  DB.query(queryForAdminId, [adminEmail], (err, result) => {
    if (err) {
      console.error("Error retrieving admin ID:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to retrieve admin ID" });
    } 
    else {
      if (result.length > 0) {
        const adminId = result[0].adminId;
        console.log("Admin ID:", adminId);

        const queryToAdd =
          "INSERT INTO `teacher` (`name`, `email`, `password`, `designation`, `department`, `adminId`, `CNIC`, `status`, `qualification`, `JoiningDate`) VALUES (?)";
        const VALUES = [
          req.body.name,
          req.body.email,
          req.body.password,
          req.body.designation,
          req.body.department,
          adminId, // Use the retrieved admin ID
          req.body.cnic,
          req.body.status,
          req.body.qualification,
          req.body.joiningDate
        ];
        console.log("values",VALUES)
        DB.query(queryToAdd, [VALUES], (err, data) => {
          if (err) {
            console.error("Error adding teacher:", err);
            return res
              .status(500)
              .json({ success: false, message: "Failed to add teacher" });
          } 
          else {
            console.log("Teacher added successfully");
            return res.json("success");
          }
        });
      } 
      else {
        console.log("Admin not found for email:", adminEmail);
        return res
          .status(404)
          .json({ success: false, message: "Admin not found" });
      }
    }
  });
};

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
  const quertToUpdate ="UPDATE `teacher` SET `name`=?,`email`=?,`password`=?,`designation`=?,`department`=?,`adminId`=?,`CNIC`=?,`status`=?,`qualification`=?,`JoiningDate`=? WHERE teacherId = ?";
  const id = req.params.id;
  const VALUE = [
    req.body.name,
    req.body.email,
    req.body.password,
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
