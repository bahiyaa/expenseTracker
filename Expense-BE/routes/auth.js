const router = require("express").Router();
const { registerUser,loginUser} = require("../Controllers/auth");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");



//REGISTER

router.post("/register", registerUser)



router.post("/login", async (req, res) => {
  try {
    console.log("📥 Login request received:", req.body);

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "User not found" });
    }

    const decrypted = CryptoJs.AES.decrypt(user.password, process.env.PASS);
    const originalPassword = decrypted.toString(CryptoJs.enc.Utf8);

    if (originalPassword !== req.body.password) {
      console.log("❌ Invalid password");
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("✅ Login successful");
    res.status(200).json({ token, email: user.email });

  } catch (err) {
    console.error("💥 Login error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
