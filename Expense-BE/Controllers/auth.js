const express = require("express");
const router = express.Router();
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const axios = require("axios");  // Import axios for HTTP requests
dotenv.config();

// ✅ Register User (Corrected)
const registerUser = async (req, res) => {
  console.log("request for reg recieved");
  
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

    // Send email with password using remote backend-services
    const subject = "Welcome to FinFlow – Your Login Details";
    const html = `
      <h2>Hi ${fullname},</h2>
      <p>Your account has been created successfully on FinFlow.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>You can log in here: <a href="https://expense-tracker-userfrontend-2azxn4cib-bahiyas-projects.vercel.app/login">FinFlow Login</a></p>
      <br />
      <p>Best regards,<br />FinFlow Team</p>
    `;

    console.log("📨 Sending email to:", email);

    // Make a POST request to the deployed backend-services API
    const response = await axios.post(
      "https://expensetracker-6nwq.onrender.com/send-email",  // Replace with actual URL of your backend-services
      {
        to:email,
        subject,
        html,
      }
    );

    console.log("✅ Email sent via backend-services!");

    res.status(201).json({ message: "User registered and email sent" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// // ✅ Login User (Fixed)
// const loginUser = async (req, res) => {
//   console.log("Login request received");
//   try {
//     const { email, password } = req.body;
//     console.log("Received email:", email);
//       console.log("Received password:", password);

//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json("User not registered");

//     // 2. Debug: log the entered password and the stored hash
//     console.log("Entered password:", `"${password}"`);
//     console.log("Stored hash:", user.password);

//     // Compare the plain password with the hashed password from DB
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) return res.status(401).json("Invalid password");

//     // Generate JWT token
//     const accessToken = jwt.sign(
//       { id: user._id.toString(), role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "10d" }
//     );

//     // Send response without password field
//     const { password: userPassword, ...userInfo } = user._doc;
//     res.status(200).json({ ...userInfo, accessToken });

//   } catch (error) {
//     console.error("❌ Error in loginUser:", error);
//     res.status(500).json(error);
//   }
// };

module.exports = {registerUser}
