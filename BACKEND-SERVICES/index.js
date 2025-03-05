const express=require("express");
const cron=require("node-cron");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
require('dotenv').config()


dotenv.config();

mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log("DB connection is successfull");   
}).catch((err)=>{
    console.log(err);   
});

const run=()=>{
    cron.schedule('* * * * * *', () => {
        console.log('running a task every second');
      });
}
run();


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
    
})
