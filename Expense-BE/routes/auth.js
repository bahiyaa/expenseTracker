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
    
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json("User not registered");
    
        // Compare the plain password with the hashed password from DB
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(401).json("Wrong credentials");
    
        // Generate JWT token
        const accessToken = jwt.sign(
          { id: user._id.toString(), role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "10d" }
        );
    
        // Send response without password field
        const { password: userPassword, ...userInfo } = user._doc;
        res.status(200).json({ ...userInfo, accessToken });
    
      } catch (error) {
        console.error("❌ Error in loginUser:", error);
        res.status(500).json(error);
      }
});

module.exports = router;
