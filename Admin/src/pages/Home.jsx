import React, { useEffect, useState } from 'react';
import { FaWallet } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import { PiHandCoins } from "react-icons/pi";
import { PieChart } from '@mui/x-charts/PieChart';
import { publicRequest } from '../requestMethods';

function Home() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await publicRequest.get("/adminincome");
        setIncomes(incomeRes.data);

        const expenseRes = await publicRequest.get("/adminexpense");
        setExpenses(expenseRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalIncome = incomes.reduce((sum, income) => sum + income.Amount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.Amount, 0);
  const totalBalance = totalIncome - totalExpenses;

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const res = await publicRequest.get('/users');
        const latestUsers = res.data
          .slice(-5)
          .reverse();
        setRecentUsers(latestUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchRecentUsers();
  }, []);

  return (
    <div className="bg-background min-h-screen p-6">
      {/* Top Cards */}
      <div className="flex flex-wrap gap-6 justify-start mt-6">
        {/* Card Component */}
        {[{
          title: "Total Balance",
          value: totalBalance,
          icon: <IoCardOutline className="text-xl text-white" />
        },
        {
          title: "Total Income",
          value: totalIncome,
          icon: <FaWallet className="text-lg text-white" />
        },
        {
          title: "Total Expense",
          value: totalExpenses,
          icon: <PiHandCoins className="text-xl text-white" />
        }].map((card, idx) => (
          <div
            key={idx}
            className="bg-card-bg shadow-card w-full sm:w-[320px] h-[160px] rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="bg-primary w-14 h-14 rounded-full flex items-center justify-center">
              {card.icon}
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-text-muted font-medium text-sm">{card.title}</h3>
              <p className="text-text-main font-heading text-xl">₹{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Users */}
      <div className="flex flex-wrap justify-between mt-10 gap-6">
        <div className="bg-card-bg shadow-card rounded-xl p-4 w-full sm:w-[500px] h-[450px]">
          <h2 className="font-heading text-lg text-text-main mb-4">Overview</h2>
          <PieChart
            series={[{
              data: [
                { id: 0, value: totalIncome, label: 'Total Income' },
                { id: 1, value: totalExpenses, label: 'Total Expense' },
                { id: 2, value: totalBalance, label: 'Total Balance' }
              ],
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -45,
              endAngle: 225,
              cx: 150,
              cy: 150
            }]}
            sx={{
              '--ChartsLegend-labelFontFamily': 'Inter',
              '--ChartsLegend-labelColor': '#3E2C1C',
              '--ChartsLegend-labelFontSize': '14px',
            }}
            slotProps={{
              legend: {
                labelStyle: {
                  fill: '#3E2C1C',
                  fontFamily: 'Inter',
                }
              }
            }}
            colors={['#A67B5B', '#D8BFAA', '#CBBBA0']}
          />
        </div>

        <div className="bg-card-bg shadow-card rounded-xl p-6 w-full sm:w-[300px] h-[350px]">
          <h2 className="font-heading text-lg text-text-main mb-2">Recent Users</h2>
          <ol className="text-text-muted font-semibold list-decimal list-inside space-y-1 mt-2">
            {recentUsers.map((user) => (
              <li key={user._id}>{user.fullname}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Home;
