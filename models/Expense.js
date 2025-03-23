const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema({

    category: { type: String, require: true },
    Amount: { type: Number, require: true },
    transactionDate: { type: String, require: true},
},{
timestamp:true

});

module.exports = mongoose.model("expenses", ExpenseSchema)
