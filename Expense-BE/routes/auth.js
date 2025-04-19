const router = require("express").Router();
const { registerUser,loginUser} = require("../Controllers/auth");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");



//REGISTER

router.post("/register", registerUser)



// LOGIN
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: "User not found" });
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid password" });
  
      // Generate JWT
      const accessToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
  
      // Send user data with token
      const { password: pwd, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken });
  
    } catch (err) {
      console.error("❌ Login error:", err);
      res.status(500).json({ message: "Something went wrong", error: err.message });
    }
  });
  

module.exports = router;
