const express = require("express");

const cors = require("cors");
const mongoose= require("mongoose");
const authRoute=require("./routes/auth")
require('dotenv').config()

const userRoute=require("./routes/user")
const expenseRoute=require("./routes/expense")

const app=express();
// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
const routes=require("./routes/expense")
app.use("/expenses",routes)
app.use("/auth",authRoute)
app.use("/users",userRoute)
app.use("/expense",expenseRoute)


// DB CONNECTION

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
