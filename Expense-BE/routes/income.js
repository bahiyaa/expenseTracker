const express = require("express");
const router = express.Router();
const { createIncome,getAllIncome,updateIncome,deleteIncome} = require("../Controllers/incomeController");
const { verifyToken, verifyTokenAuthorization } = require("../Middlewares/verifyToken");



// ADD EXPENSE

router.post("/",createIncome)
   

// GET ALL EXPENSES

router.get("/",getAllIncome)

// UPDATE EXPENSE

router.put("/:id",updateIncome) 

// DELETE AN EXPENSE
router.delete("/:id",deleteIncome) 

module.exports = router;