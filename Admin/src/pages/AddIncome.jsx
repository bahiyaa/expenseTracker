import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { publicRequest } from '../requestMethods';

const AddIncome = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        category: inputs.category,
        transactionDate: inputs.transactionDate,
        Amount: Number(inputs.amount),
        userId: "admin-user", // replace with real userId later
      };

      await publicRequest.post("/adminincome", payload);
      setInputs({});
      toast.success("Income successfully added!");
    } catch (error) {
      console.error("❌ Error creating income:", error.response?.data || error.message);
      toast.error("Failed to add Income. Please try again.");
    }
  };

  return (
    <div className="m-6 bg-card p-8 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-primary mb-6">Add Income</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <label className="text-muted">Income Source</label>
          <input
            type="text"
            placeholder="Freelancing"
            name="category"
            onChange={handleChange}
            value={inputs.category || ''}
            className="border border-border bg-background text-sm p-3 rounded-md outline-none focus:border-primary"
          />

          <label className="text-muted">Amount</label>
          <input
            type="number"
            placeholder="₹600"
            name="amount"
            onChange={handleChange}
            value={inputs.amount || ''}
            className="border border-border bg-background text-sm p-3 rounded-md outline-none focus:border-primary"
          />

          <label className="text-muted">Transaction Date</label>
          <input
            type="date"
            name="transactionDate"
            onChange={handleChange}
            value={inputs.transactionDate || ''}
            className="border border-border bg-background text-sm p-3 rounded-md outline-none focus:border-primary"
          />

          <button
            onClick={handleSubmit}
            className="mt-4 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
          >
            Add Income
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddIncome;
