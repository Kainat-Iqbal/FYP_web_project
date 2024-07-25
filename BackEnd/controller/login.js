const DB = require("../DB/dbConfig");

const Login = async (req, res) => {
  const queryForAdmin =
    "SELECT * FROM admin WHERE `adminEmail` = ? AND `adminPassword` = ?";
  const queryForDean =
    "SELECT * FROM dean WHERE `email` = ? AND `password` = ?";
  const queryForTeacher =
    "SELECT * FROM teacher WHERE `email` = ? AND `password` = ?";

    const { email, password } = req.body;

  // Flag to determine if any login was successful
  let loginSuccess = false;

  // Query for admin
  DB.query(queryForAdmin, [email, password], (err, data) => {
    console.log("admin");
    if (err) {
      console.log("Login failed for admin, err:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (data.length > 0) {
      req.session.user = data[0].adminEmail;
      req.session.userId = data[0].adminId;
      loginSuccess = true;
      return res.json("Admin");
    } else {
      console.log("Fail for admin login");
      // Check for dean login only if admin login fails
      DB.query(queryForDean, [email, password], (err, data) => {
        if (err) {
          console.log("Login failed for Dean, err:", err);
          return res.status(500).json({ message: "Internal Server Error" });
        }
        if (data.length > 0) {
          console.log("first");
          // req.session.user = data[0].email;
          // req.session.userId = data[0].deanId;
          loginSuccess = true;
          return res.json("Dean");
        } else {
          console.log("Fail for admin login");
          // Check for teacher login only if dean and admin login fails
          DB.query(queryForTeacher, [email, password], (err, data) => {
            if (err) {
              console.log("Login failed for Teacher, err:", err);
              return res.status(500).json({ message: "Internal Server Error" });
            }
            if (data.length > 0) {
              console.log("Teacherrr");
              req.session.user = data[0].email;
              req.session.userId = data[0].teacherId;
              req.session.userName = data[0].name;
              loginSuccess = true;
              
              return res.json("Teacher");
            }
            else {
                console.log("Failed for teacher login");
                if (!loginSuccess) {
                    return res.json("Failed")
                }
            }
          });
        }
       
      });
    }
  });
};

module.exports = Login;
