// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sendMail = require("./helpers/sendmail");

const app = express();

app.use(cors());
app.use(express.json());

// Optional test route
app.get("/", (req, res) => {
  res.send("📨 Email service is running");
});

app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    
    console.log("⚙️ Sending email to:", to); // ✅ fixed from 'email' to 'to'
    await sendMail(to, subject, html); // ✅ removed text param since not used
    console.log("✅ Email sent!");
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
console.log(process.env.PASS);

