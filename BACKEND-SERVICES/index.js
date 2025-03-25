const express=require("express");
const cron=require("node-cron");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
require('dotenv').config()
const expenseEmail=require("./EmailService/Expense")


dotenv.config();

mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log("DB connection is successfull");   
}).catch((error)=>{
    console.log(error);   
});

const run=()=>{
    cron.schedule('* * * * *', () => {
        console.log('running a task every second');

        expenseEmail();
      });
}
run();

const PORT= process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Background Service is running on port ${process.env.PORT}`);
    
})
