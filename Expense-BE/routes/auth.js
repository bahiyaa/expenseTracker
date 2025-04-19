const router = require("express").Router();
const { registerUser, loginUser } = require("../Controllers/auth");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");



//REGISTER

router.post("/register", registerUser)


router.post("/login", async (req, res) => {
    try {
        console.log("📥 Login request received");
        console.log("➡️ Request body:", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            console.log("❌ Missing email or password");
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        console.log("👤 User from DB:", user);

        if (!user) {
            console.log("❌ User not found");
            return res.status(401).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔍 Password match:", isMatch);

        if (!isMatch) {
            console.log("❌ Invalid password");
            return res.status(401).json({ message: "Invalid password" });
        }

        console.log("🔐 Creating JWT...");
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        const accessToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        console.log("✅ JWT created");

        const { password: pwd, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        console.error("❌ Login error caught:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
});


module.exports = router;
