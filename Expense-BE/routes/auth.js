const router = require("express").Router();
const { registerUser, loginUser } = require("../Controllers/auth");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


//REGISTER

router.post("/register", registerUser)


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("📥 Login attempt:", email);
    
        const user = await User.findOne({ email });
        if (!user) {
          console.log("❌ User not found");
          return res.status(401).json("User not registered");
        }
    
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          console.log("❌ Incorrect password");
          return res.status(401).json("Wrong credentials");
        }
    
        const accessToken = jwt.sign(
          { id: user._id.toString(), role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "10d" }
        );
    
        const { password: userPassword, ...userInfo } = user._doc;
        console.log("✅ Login successful for:", email);
        res.status(200).json({ ...userInfo, accessToken });
    
      } catch (error) {
        console.error("🔥 Error in loginUser:", error);
        res.status(500).json("Server error during login");
      }
});

module.exports = router;
