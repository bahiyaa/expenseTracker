const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");
require("dotenv").config();

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.role !== "admin") {
            return res.status(403).json("You are not authorized as an admin");
        }

        const decrypted = CryptoJS.AES.decrypt(user.password, process.env.PASS);
        const originalPassword = decrypted.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== password) {
            return res.status(401).json("Invalid password");
        }
        console.log("User ID before token creation:", user._id); 
        const token = jwt.sign(
            { id: user._id.toString(), role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "10d" }
        );

        const { password: _, ...userData } = user._doc;
        // res.status(200).json({ ...userData, accessToken: token });
        res.status(200).json({
            email: user.email,
            role: user.role,
            accessToken: token
          });
    } catch (err) {
        console.error("❌ Admin login failed:", err);
        res.status(500).json("Something went wrong");
    }
};

  


module.exports = { adminLogin};
