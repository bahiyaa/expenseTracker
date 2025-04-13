const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    date: { type: String, required: true },
  },
  {
    timestamps: true, // Optional: adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
