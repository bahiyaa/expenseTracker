const express = require("express");
const router = express.Router();
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const sendMail = require("../../backend-services/helpers/sendmail");
dotenv.config();

// ✅ Register User (Corrected)
const registerUser = async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({
        fullname,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      // Send email with password
      const subject = "Welcome to FinFlow – Your Login Details";
      const html = `
        <h2>Hi ${fullname},</h2>
        <p>Your account has been created successfully on FinFlow.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>You can log in here: <a href="http://localhost:5173/login">FinFlow Login</a></p>
        <br />
        <p>Best regards,<br />FinFlow Team</p>
      `;
  
      console.log("📨 Sending email to:", email);
      await sendMail(email, subject, html);
      console.log("✅ Email sent!");
      
  
      res.status(201).json({ message: "User registered and email sent" });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  

// ✅ Login User (Fixed)
const loginUser = async (req, res) => {
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
};

module.exports = { loginUser, registerUser };