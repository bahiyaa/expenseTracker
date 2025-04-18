require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose= require("mongoose");



const authRoute=require("./routes/auth")
const userRoute=require("./routes/user")
const incomeRoute=require("./routes/userincome")
const expenseRoute=require("./routes/userexpense")
const adminRoutes = require("./routes/admin");
const adminIncomeRoutes=require("./routes/adminIncome")
const adminExpenseRoute=require("./routes/expense")

const app=express();
// MIDDLEWARE
app.use(cors({
    origin: ["https://expense-tracker-gamma-three-69.vercel.app","https://expense-tracker-userfrontend-lx1glbk24-bahiyas-projects.vercel.app/"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"]
  }));
app.use((req, res, next) => {
    console.log("Authorization Header:", req.headers.authorization);
    next();
});
app.use(express.json());

// ✅ Debug Middleware to Log All Incoming Requests
app.use((req, res, next) => {
    console.log("📝 Request Headers:", req.headers);
    next();
});


// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to the Expense Tracker API");
  });
app.use("/v1/auth",authRoute)
app.use("/v1/users",userRoute)
app.use("/v1/userexpense",expenseRoute)
app.use("/v1/userincome",incomeRoute)
app.use("/v1/admin",adminRoutes)
app.use("/v1/adminincome", adminIncomeRoutes); 
app.use("/v1/adminexpense", adminExpenseRoute); 




// DB CONNECTION
console.log("MongoDB URI:", process.env.DB_CONNECTION);

mongoose.connect(process.env.DB_CONNECTION).then((res) =>{
    console.log("DB connection is successfull")
}).catch((e) =>{
    console.log(e)
})

// start server
const PORT=process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})
