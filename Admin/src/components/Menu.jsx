import React from 'react';
import { FaHome, FaUser, FaCalculator, FaHdd, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className="w-full md:w-64 bg-secondary px-4 py-6 md:px-6 md:py-10 shadow-xl rounded-none md:rounded-tr-2xl md:rounded-br-2xl">
      <ul className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-8">
        <Link to="/">
          <li className="flex items-center text-text-muted hover:text-primary hover:bg-secondary-accent px-3 md:px-4 py-2 rounded-xl cursor-pointer text-[16px] md:text-[18px]">
            <FaHome className="mr-2 md:mr-3" />
            Home
          </li>
        </Link>

        {/* <Link to="/profile">
          <li className="flex items-center text-text-muted hover:text-primary hover:bg-secondary-accent px-3 md:px-4 py-2 rounded-xl cursor-pointer text-[16px] md:text-[18px]">
            <FaUser className="mr-2 md:mr-3" />
            Profile
          </li>
        </Link> */}

        <hr className="border-secondary-accent" />

        <Link to="/income">
          <li className="flex items-center text-text-muted hover:text-primary hover:bg-secondary-accent px-3 md:px-4 py-2 rounded-xl cursor-pointer text-[16px] md:text-[18px]">
            <FaCalculator className="mr-2 md:mr-3" />
            Income
          </li>
        </Link>

        <Link to="/expenses">
          <li className="flex items-center text-text-muted hover:text-primary hover:bg-secondary-accent px-3 md:px-4 py-2 rounded-xl cursor-pointer text-[16px] md:text-[18px]">
            <FaUsers className="mr-2 md:mr-3" />
            Expense
          </li>
        </Link>

        <Link to="/users">
          <li className="flex items-center text-text-muted hover:text-primary hover:bg-secondary-accent px-3 md:px-4 py-2 rounded-xl cursor-pointer text-[16px] md:text-[18px]">
            <FaUsers className="mr-2 md:mr-3" />
            Users
          </li>
        </Link>

        <hr className="border-secondary-accent" />

        <Link to="/login">
          <li className="flex items-center text-error hover:text-primary hover:bg-secondary-accent px-3 md:px-4 py-2 rounded-xl cursor-pointer text-[16px] md:text-[18px]">
            <FaHdd className="mr-2 md:mr-3" />
            Logout
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Menu;
