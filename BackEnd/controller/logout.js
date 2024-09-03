const DB = require("../DB/dbConfig");

const Logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log("Logout failed:", err);
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie('connect.sid'); // Clear the session cookie
      return res.json({ message: "Logout successful" });
    });
  };

module.exports={Logout}