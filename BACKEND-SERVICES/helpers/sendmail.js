const nodemailer = require("nodemailer");
require("dotenv").config({ path: __dirname + "/../.env" });

const sendMail = async (to, subject, html) => {
    console.log("✅ Loaded Email:", process.env.EMAIL);
    console.log("✅ Loaded Pass:", process.env.PASS);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    console.log("ENV EMAIL:", process.env.EMAIL);
    console.log("ENV PASS:", process.env.PASS);

    const mailOptions = {
        from: `"FinFlow" <${process.env.EMAIL}>`,
        to,
        subject,
        html,
    };

    try {
        console.log("Sending email to:", to);
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent!");
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

module.exports = sendMail;
