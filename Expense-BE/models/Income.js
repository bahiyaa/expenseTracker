// models/Income.js
const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
    category: { type: String },
    Amount: { type: Number, required: true }, // capital A
    transactionDate: { type: String },
    userId: { type: String, required: true },
  });

module.exports = mongoose.model("Income", IncomeSchema);
