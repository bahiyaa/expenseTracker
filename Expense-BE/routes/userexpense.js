// routes/userExpenseRoute.js
const router = require("express").Router();
const {
  createUserExpense,
  getUserExpense,
} = require("../Controllers/userexpenseController");

const { verifyToken } = require("../Middlewares/verifyToken");

router.post("/", verifyToken, createUserExpense);
router.get("/", verifyToken, getUserExpense);

module.exports = router;
