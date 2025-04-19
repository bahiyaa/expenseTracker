const express = require("express");
const { registerUser,loginUser } = require("../Controllers/auth");
const router=express.Router();


//REGISTER

router.post("/register",registerUser)

//LOGIN
router.get("/test", (req, res) => {
    console.log("✅ /v1/auth/test hit");
    res.send("Auth routes are connected!");
  });

  router.post("/login", (req, res, next) => {
    console.log("🔥 /v1/auth/login route hit");
    console.log("➡️ Request body:", req.body);
    next();
  }, loginUser); // This calls the loginUser controller
module.exports = router;


