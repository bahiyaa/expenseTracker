const router = require("express").Router();
const { createUserIncome, getUserIncome ,updateUserIncome, deleteUserIncome} = require("../Controllers/userincomeController");
const { verifyToken } = require("../Middlewares/verifyToken");

router.post("/", verifyToken, createUserIncome);
router.get("/", verifyToken, getUserIncome);
router.put("/:id", verifyToken, updateUserIncome);
router.delete("/:id", verifyToken, deleteUserIncome);


module.exports = router;
