const mongoose = require("mongoose");

const IncomeSchema = mongoose.Schema({

    category: { type: String, require: true },
    Amount: { type: Number, require: true },
    transactionDate: { type: String, require: true },
    status: { type: Number, default: 0 },
},{
    timestamp:true

});

module.exports = mongoose.model("income", IncomeSchema)
