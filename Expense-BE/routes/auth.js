const express = require("express");
const { registerUser,loginUser} = require("../Controllers/auth");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//REGISTER

router.post("/register", registerUser)

// //LOGIN
// router.get("/test", (req, res) => {
//     console.log("✅ /v1/auth/test hit");
//     res.send("Auth routes are connected!");
// });
router.post("/login", async (req, res) => {
    try {
      console.log("🔐 User login request received");
      const { email, password } = req.body;
      console.log("📨 Payload:", email);
  
      const user = await User.findOne({ email });
      if (!user) {
        console.log("❌ User not found");
        return res.status(401).json({ message: "User not found" });
      }
  
      console.log("✅ User found");
  
      const decrypted = CryptoJS.AES.decrypt(user.password, process.env.PASS);
      const originalPassword = decrypted.toString(CryptoJS.enc.Utf8);
      console.log("🔓 Decrypted password:", originalPassword);
  
      if (originalPassword !== password) {
        console.log("❌ Invalid password");
        return res.status(401).json({ message: "Invalid password" });
      }
  
      console.log("✅ Password matched");
  
      const accessToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
  
      const { password: pwd, ...others } = user._doc;
  
      console.log("✅ Login successful");
      res.status(200).json({ ...others, accessToken });
  
    } catch (err) {
      console.error("❌ User login error:", err);
      res.status(500).json({ message: "Something went wrong", error: err.message });
    }
  });
module.exports = router;


