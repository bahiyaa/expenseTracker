import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { PieChart } from "@mui/x-charts/PieChart";
import { FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethod"; // ✅ Authenticated request method

function Income() {
  const [showReport, setShowReport] = useState(false);
  const [data, setData] = useState([]);

  // ✅ Toggle report visibility
  const handleShowReport = () => setShowReport((prev) => !prev);

  // ✅ Retrieve user from Redux or localStorage
  const currentUser =
    useSelector((state) => state.user?.currentUser) ||
    JSON.parse(localStorage.getItem("user")); // Fallback if Redux is cleared

  const token = currentUser?.accessToken; // ✅ Extract token safely

  useEffect(() => {
    const getIncome = async () => {
      if (!token) {
        console.error("❌ No token found! API request canceled.");
        return;
      }

      try {
        const res = await userRequest.get("/userincome", {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Attach token correctly
          withCredentials: true, // ✅ Ensures credentials are sent (important for CORS)
        });

        setData(res.data || []); // ✅ Store response in state, prevent null issues
      } catch (err) {
        console.error("❌ API Error:", err.response?.data || err.message);
      }
    };

    getIncome();
  }, [token]); // ✅ Runs when token changes

  // ✅ Define columns for DataGrid
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "category", headerName: "Category", width: 140 },
    { field: "transactionDate", headerName: "Transaction Date", width: 130 },
    { field: "Amount", headerName: "Amount", width: 130 },
  ];

  const pieColors = [
    "#7B3F00", "#A0522D", "#8B4513", "#CD853F", "#D2B48C", "#DEB887", "#F5DEB3", "#E6D3B3",
  ];

  // Group data by category and sum the amounts
  const incomeByCategory = data.reduce((acc, item) => {
    const category = item.category || "Uncategorized";
    const amount = Number(item.Amount) || 0;

    if (acc[category]) {
      acc[category] += amount;
    } else {
      acc[category] = amount;
    }

    return acc;
  }, {});

  // Convert to PieChart data format
  const pieChartData = Object.entries(incomeByCategory).map(([category, amount], index) => ({
    id: index,
    value: amount,
    label: category,
    color: pieColors[index % pieColors.length],
  }));

  return (
    <div className="m-4 sm:m-6 md:m-8 lg:m-10 p-6 bg-secondary-accent rounded-2xl shadow-card font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4 sm:gap-8">
        <h1 className="text-2xl font-heading text-text-main">Income Details</h1>

        <div className="flex flex-wrap gap-4 sm:flex-nowrap justify-center sm:justify-start">
          <Link to="/addincome">
            <button className="bg-primary text-white px-4 py-2 rounded-xl shadow hover:bg-primary-accent transition-all duration-200">
              Add Income
            </button>
          </Link>
          <button
            className="bg-primary text-white px-4 py-2 rounded-xl shadow hover:bg-primary-accent transition-all duration-200"
            onClick={handleShowReport}
          >
            Income Chart
          </button>
          <Link to="/mypage">
            <button className="bg-primary text-white px-4 py-2 rounded-xl shadow hover:bg-primary-accent transition-all duration-200">
              Profile
            </button>
          </Link>
        </div>

        {/* Income Pie Chart Modal */}
        {showReport && (
          <div className="absolute z-[999] top-[80px] right-0 max-w-full w-[90vw] sm:w-[400px] h-[400px] bg-card-bg shadow-2xl rounded-2xl p-4">
            <div className="flex justify-end">
              <FaWindowClose
                className="text-2xl text-error cursor-pointer"
                onClick={handleShowReport}
              />
            </div>
            <PieChart
              series={[
                {
                  data: pieChartData,
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 180,
                  cx: 150,
                  cy: 150,
                },
              ]}
              colors={pieChartData.map((entry) => entry.color)} // Assign colors to chart
            />
          </div>
        )}
      </div>

      {/* Income Data Table */}
      <div className="overflow-x-auto">
        <DataGrid
          rows={data}
          getRowId={(row) => row._id || row.id}
          columns={columns}
          checkboxSelection
          className="bg-card-bg rounded-xl shadow-card text-text-main"
        />
      </div>
    </div>
  );
}

export default Income;
