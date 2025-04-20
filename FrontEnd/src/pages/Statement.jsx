import React, { useEffect, useState } from "react"; 
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethod";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from "react-router-dom";

function Statement() {
  const [statementData, setStatementData] = useState([]);

  const currentUser =
    useSelector((state) => state.user?.currentUser) ||
    JSON.parse(localStorage.getItem("user"));
  const token = currentUser?.accessToken;

  useEffect(() => {
    const fetchStatement = async () => {
      try {
        const [incomeRes, expenseRes] = await Promise.all([

          userRequest.get("/userincome", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          userRequest.get("/userexpense", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const formattedIncome = incomeRes.data.map((item) => ({
          id: `income-${item._id}`,
          type: "Income",
          category: item.category,
          Amount: item.Amount,
          transactionDate: item.transactionDate,
        }));

        const formattedExpense = expenseRes.data.map((item) => ({
          id: `expense-${item._id}`,
          type: "Expense",
          category: item.category,
          Amount: item.Amount,
          transactionDate: item.transactionDate,
        }));

        const combinedData = [...formattedIncome, ...formattedExpense].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setStatementData(combinedData);
      } catch (err) {
        console.error("❌ Error fetching statement data:", err);
      }
    };

    fetchStatement();
  }, [token]);

  const columns = [
    { field: "type", headerName: "Type", width: 120 },
    { field: "category", headerName: "Category", width: 160 },
    { field: "Amount", headerName: "Amount", width: 120 },
    { field: "transactionDate", headerName: "Date", width: 160 },
  ];

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Financial Statement", 14, 15);

    const tableColumn = ["Type", "Category", "Amount", "Date"];
    const tableRows = statementData.map((item) => [
      item.type,
      item.category,
      item.Amount,
      item.transactionDate,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("statement.pdf");
  };

  return (
    <div className="m-4 sm:m-6 lg:m-8 p-4 sm:p-6 bg-secondary rounded-2xl shadow-card font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl sm:text-3xl font-heading text-text-main uppercase text-center sm:text-left">
          Statement
        </h1>
        <div className="mt-4 sm:mt-0 flex gap-4">
          <button
            onClick={handleExportPDF}
            className="bg-primary text-white px-4 py-2 rounded-xl shadow hover:bg-primary-accent transition-all duration-200">
            Export to PDF
          </button>
          <Link to="/mypage">
            <button className="bg-primary text-white px-4 py-2 rounded-xl shadow hover:bg-primary-accent transition-all duration-200">
              Profile
            </button>
          </Link>
        </div>
      </div>
      <DataGrid
        rows={statementData}
        columns={columns}
        className="bg-card-bg rounded-xl text-text-main"
        autoHeight
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default Statement;
