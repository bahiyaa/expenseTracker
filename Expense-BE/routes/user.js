const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { deleteUser, getAllUsers } = require("../Controllers/user");

// DELETE 

router.delete("/:id",deleteUser)

  //GET ALL USERS

  router.get("/",getAllUsers) 

module.exports = router;