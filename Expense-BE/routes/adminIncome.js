const router = require("express").Router();
const {
  getAllIncome,       // ✅ Will return all income entries
  getIncomeById,
  deleteIncome,
  createIncome,
  updateIncome,
  
} = require("../Controllers/incomeController");

//  No authentication middleware here
router.get("/", getAllIncome);           // Admin can see all
router.get("/:id", getIncomeById);
router.delete("/:id", deleteIncome); 
router.post("/", createIncome); 
router.put("/:id", updateIncome);       // Admin can delete

module.exports = router;
