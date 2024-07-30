const DB = require("../DB/dbConfig");
const bcrypt = require("bcrypt");

// Helper function to verify hashed passwords
const verifyPassword = async (password, hashedPassword) => {
  console.log(
    "Verifying password. Types:",
    typeof password,
    typeof hashedPassword
  );
  if (typeof password !== "string" || typeof hashedPassword !== "string") {
    console.log(
      "Invalid types for password or hashedPassword:",
      typeof password,
      typeof hashedPassword
    );
    throw new Error("data and hash must be strings");
  }
  return await bcrypt.compare(password, hashedPassword);
};
// // Verify Password Function
// const verifyPassword = async (password, hashedPassword) => {
//   try {
//     const match = await bcrypt.compare(password, hashedPassword);
//     return match;
//   } catch (error) {
//     console.error("Verification error:", error);
//     return false;
//   }
// };

const Login = async (req, res) => {
  const { email } = req.body;

  let password = req.body.password;

  // Ensure password is a string
  if (Array.isArray(password)) {
    password = password[0];
  }
  const queryForAdmin = "SELECT * FROM admin WHERE `adminEmail` = ?";
  const queryForHod = "SELECT * FROM hod WHERE `email` = ?";

  const queryForDean = "SELECT * FROM dean WHERE `email` = ?";

  const queryForExamination =
    "SELECT * FROM examination_controller WHERE `email` = ?";

  const queryForTeacher = "SELECT * FROM teacher WHERE `email` = ?";

  let loginSuccess = false;

  // Query for admin
  DB.query(queryForAdmin, [email], async (err, data) => {
    console.log("admin");
    if (err) {
      console.log("Login failed for admin, err:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (data.length > 0) {
      const hashedPassword = data[0].adminPassword;
      console.log("Admin hashedPassword:", hashedPassword);
      if (await verifyPassword(password, hashedPassword)) {
        req.session.user = data[0].adminEmail;
        req.session.userId = data[0].adminId;
        req.session.userName = data[0].name;
        loginSuccess = true;
        return res.json("Admin");
      }
    } else {
      console.log("Fail for admin login");

      // Check for hod login only if admin login fails
      DB.query(queryForHod, [email], async (err, data) => {
        if (err) {
          console.log("Login failed for HOD, err:", err);
          return res.status(500).json({ message: "Internal Server Error" });
        }
        if (data.length > 0) {
          const hashedPassword = data[0].password;
          console.log("Admin hashedPassword:", hashedPassword);
          if (await verifyPassword(password, hashedPassword)) {
            console.log("first");
            req.session.user = data[0].email;
            req.session.userId = data[0].HODId;
            req.session.userName = data[0].name;
            loginSuccess = true;
            return res.json("HOD");
          }
        } else {
          console.log("Fail for admin login");

          DB.query(queryForDean, [email], async (err, data) => {
            if (err) {
              console.log("Login failed for Dean, err:", err);
              return res.status(500).json({ message: "Internal Server Error" });
            }
            if (data.length > 0) {
              const hashedPassword = data[0].password;
              console.log("Admin hashedPassword:", hashedPassword);
              if (await verifyPassword(password, hashedPassword)) {
                console.log("first");
                req.session.user = data[0].email;
                req.session.userId = data[0].deanId;
                req.session.userName = data[0].name;
                loginSuccess = true;
                return res.json("Dean");
              }
            } else {
              console.log("Fail for admin login");

              DB.query(queryForExamination, [email], async (err, data) => {
                if (err) {
                  console.log("Login failed for Examination, err:", err);
                  return res
                    .status(500)
                    .json({ message: "Internal Server Error" });
                }
                if (data.length > 0) {
                  const hashedPassword = data[0].password;
                  console.log("Admin hashedPassword:", hashedPassword);
                  if (await verifyPassword(password, hashedPassword)) {
                    req.session.user = data[0].email;
                    req.session.userId = data[0].examinationId;
                    req.session.userName = data[0].name;
                    loginSuccess = true;
                    return res.json("Examination");
                  }
                } else {
                  console.log("Fail for admin login");

                  // Check for teacher login only if dean and admin login fails
                  DB.query(queryForTeacher, [email], async (err, data) => {
                    if (err) {
                      console.log("Login failed for Teacher, err:", err);
                      return res
                        .status(500)
                        .json({ message: "Internal Server Error" });
                    }
                    if (data.length > 0) {
                      const hashedPassword = data[0].password;
                      console.log("Admin hashedPassword:", hashedPassword);
                      if (await verifyPassword(password, hashedPassword)) {
                        console.log("Teacherrr");
                        req.session.user = data[0].email;
                        req.session.userId = data[0].teacherId;
                        req.session.userName = data[0].name;
                        req.session.userDesignation = data[0].designation;
                        loginSuccess = true;
                        return res.json("Teacher");
                      }
                    } else {
                      console.log("Failed for teacher login");
                      if (!loginSuccess) {
                        return res.json("Failed");
                      }
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};

module.exports = { Login /* ,Logout */ };
