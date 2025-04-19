require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");



const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const incomeRoute = require("./routes/userincome")
const expenseRoute = require("./routes/userexpense")
const adminRoutes = require("./routes/admin");
const adminIncomeRoutes = require("./routes/adminIncome")
const adminExpenseRoute = require("./routes/expense")

const app = express();

// MIDDLEWARE
app.use(cors({
    origin: [
        "https://expense-tracker-8onam6bl6-bahiyas-projects.vercel.app",
        "https://expensetrackeruser-j3yxrqsxg-bahiyas-projects.vercel.app"
    ],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"]
}));
app.use((req, res, next) => {
    console.log("Authorization Header:", req.headers.authorization);
    next();
});


// ✅ Debug Middleware to Log All Incoming Requests
app.use((req, res, next) => {
    console.log(`🚀 Request Method: ${req.method}, URL: ${req.originalUrl}`);
    console.log("📦 Request Body:", req.body);
    next();
});
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Expense Tracker API");
});
app.use("/v1/auth", authRoute)
app.use("/v1/users", userRoute)
app.use("/v1/userexpense", expenseRoute)
app.use("/v1/userincome", incomeRoute)
app.use("/v1/admin", adminRoutes)
app.use("/v1/adminincome", adminIncomeRoutes);
app.use("/v1/adminexpense", adminExpenseRoute);




// DB CONNECTION
console.log("MongoDB URI:", process.env.DB_CONNECTION);

mongoose.connect(process.env.DB_CONNECTION).then((res) => {
    console.log("DB connection is successfull")
}).catch((e) => {
    console.log(e)
})

app.use((err, req, res, next) => {
    console.error("💥 Unhandled Error:", err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
