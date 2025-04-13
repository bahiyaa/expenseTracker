import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { FaWallet } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import { PiHandCoins } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from '../requestMethod';
import { logOut } from "../redux/userRedux";
import { userRequest } from '../requestMethod'; // Use the authenticated request

function MyPage() {
  const [open, setOpen] = useState(false);
  const [info, SetInfo] = useState([]);
  const user = useSelector((state) => state.user);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);


  const handleOpen = () => {
    setOpen(!open)
  }
  const handleLogout = () => {
    dispatch(logOut());
    setIncomes([]);  // Clear stored incomes
    setExpenses([]); // Clear stored expenses
    navigate("/login");
  };
  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await publicRequest.get(`/income?email=${user.currentUser.email}`); // Use GET instead of POST
        SetInfo(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, [user]); // Ensure it only runs when the user changes

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const incomeRes = await publicRequest.get("/income"); // Fetch incomes
  //       console.log("Income Data:", incomeRes.data);
  //       setIncomes(incomeRes.data);

  //       const expenseRes = await publicRequest.get("/expense"); // Fetch expenses
  //       setExpenses(expenseRes.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await userRequest.get("/userincome"); // ✅ Send token
        setIncomes(incomeRes.data);

        const expenseRes = await userRequest.get("/userexpense");
        setExpenses(expenseRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate total income
  const totalIncome = incomes.reduce((sum, income) => sum + income.Amount, 0);

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.Amount, 0);

  return (
    <div>
      {/* User Profile Menu */}
      <div className="relative flex items-end justify-end mr-[20%] mt-[6%] text-primary font-medium cursor-pointer font-sans">
        <div className="flex items-center gap-2" onClick={handleOpen}>
          <FaUser />
          {user.currentUser.fullname}
        </div>
        {open && (
          <div className="absolute top-[30px] right-0 w-[200px] bg-secondary-accent z-[999] shadow-xl rounded-xl p-4">
            <ul className="flex flex-col items-center justify-center text-text-main font-sans text-sm gap-2">
              <Link to="/income">
                <li className="hover:text-white hover:bg-primary-accent w-full text-center rounded-md py-1 cursor-pointer">Income</li>
              </Link>
              <Link to="/expense">
                <li className="hover:text-white hover:bg-primary-accent w-full text-center rounded-md py-1 cursor-pointer">Expense</li>
              </Link>
             <Link to='/statement'>
             <li className="hover:text-white hover:bg-primary-accent w-full text-center rounded-md py-1 cursor-pointer">Statement</li>
             </Link>
              <li
                className="hover:text-white hover:bg-error w-full text-center rounded-md py-1 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Welcome Header */}
      <div className="flex items-center justify-center mt-[6%] mx-[10%]">
        <h2 className="text-text-muted text-3xl text-center font-heading leading-relaxed max-w-4xl uppercase">
          WELCOME BACK, {user.currentUser.fullname}! <br /> TRACK, SAVE, AND STAY IN CONTROL OF YOUR FINANCES. 💰🚀
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="flex flex-wrap justify-center gap-8 mt-12 mx-[10%] font-sans">
        {/* Total Balance */}
        <div className="bg-card-bg text-text-main h-[150px] w-[350px] shadow-card rounded-2xl p-4 flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <div className="bg-secondary-accent w-16 h-16 rounded-full flex items-center justify-center">
              <IoCardOutline className="text-2xl text-text-main" />
            </div>
            <h1 className="text-xl font-semibold">Total Balance</h1>
          </div>
          <h4 className="text-xl font-medium mt-2 ml-20">₹{totalIncome - totalExpenses}</h4>
        </div>

        {/* Total Income */}
        <div className="bg-card-bg text-text-main h-[150px] w-[350px] shadow-card rounded-2xl p-4 flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <div className="bg-secondary-accent w-16 h-16 rounded-full flex items-center justify-center">
              <FaWallet className="text-xl text-text-main" />
            </div>
            <h1 className="text-xl font-semibold">Total Income</h1>
          </div>
          <h4 className="text-xl font-medium mt-2 ml-20">₹{totalIncome}</h4>
        </div>

        {/* Total Expense */}
        <div className="bg-card-bg text-text-main h-[150px] w-[350px] shadow-card rounded-2xl p-4 flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <div className="bg-secondary-accent w-16 h-16 rounded-full flex items-center justify-center">
              <PiHandCoins className="text-2xl text-text-main" />
            </div>
            <h1 className="text-xl font-semibold">Total Expense</h1>
          </div>
          <h4 className="text-xl font-medium mt-2 ml-20">₹{totalExpenses}</h4>
        </div>
      </div>
    </div>
  )
}

export default MyPage

