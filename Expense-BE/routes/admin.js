const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Admin = require("../models/Admin");
const CryptoJs = require("crypto-js"); // For password decryption
dotenv.config();

router.post("/login", async (req, res) => {
  try {
    console.log("🔐 Login request received");
    const { email, password } = req.body;
    console.log("📨 Payload:", email);

    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("❌ Admin not found");
      return res.status(401).json({ message: "Admin not found" });
    }

    console.log("✅ Admin found");

    const decrypted = CryptoJs.AES.decrypt(admin.password, process.env.PASS);
    const originalPassword = decrypted.toString(CryptoJs.enc.Utf8);
    console.log("🔓 Decrypted password:", originalPassword);

    if (originalPassword !== password) {
      console.log("❌ Invalid password");
      return res.status(401).json({ message: "Invalid password" });
    }

    console.log("✅ Password matched");

    const token = jwt.sign({ email: admin.email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("✅ Token created");

    res.status(200).json({
      email: admin.email,
      role: "admin",
      accessToken: token,
    });

  } catch (err) {
    console.error("❌ Admin login error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

// // POST /v1/admin/register
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: "Admin already exists" });
//     }

//     // Encrypt password
//     const encryptedPassword = CryptoJs.AES.encrypt(password, process.env.PASS).toString();

//     // Create new admin
//     const newAdmin = new Admin({
//       email,
//       password: encryptedPassword,
//     });

//     await newAdmin.save();

//     res.status(201).json({ message: "Admin registered successfully" });
//   } catch (err) {
//     console.error("Admin registration error:", err);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });
router.put("/change-password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const decrypted = CryptoJs.AES.decrypt(admin.password, process.env.PASS);
    const originalPassword = decrypted.toString(CryptoJs.enc.Utf8);

    if (originalPassword !== oldPassword) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const encryptedNewPassword = CryptoJs.AES.encrypt(newPassword, process.env.PASS).toString();
    admin.password = encryptedNewPassword;
    await admin.save();

    res.status(200).json({
      message: "Password changed successfully",
      email: admin.email,
      accessToken: token,
    });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});


module.exports = router;
