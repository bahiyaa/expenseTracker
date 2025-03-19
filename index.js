const express = require("express");

const cors = require("cors");
const mongoose= require("mongoose");
const authRoute=require("./routes/auth")
require('dotenv').config()

const app=express();
// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
const routes=require("./routes/router")
app.use("/expenses",routes)
app.use("/auth",authRoute)


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
