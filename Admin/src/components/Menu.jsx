import React from 'react';
import { FaHome, FaUser, FaCalculator, FaHdd, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className="min-h-[calc(100vh-100px)] bg-secondary px-6 py-10 shadow-xl rounded-tr-2xl rounded-br-2xl">
      <ul className="flex flex-col gap-6 mt-8">
        <Link to="/">
          <li className="flex items-center text-text-muted hover:text-primary hover:bg-secondary-accent px-4 py-2 rounded-xl cursor-pointer text-[18px]">
            <FaHome className="mr-3" />
            Home
          </li>
        </Link>

        {/* <Link to="/profile">
          <li className="flex items-center text-text-muted hover:text-primary hover:bg-secondary-accent px-4 py-2 rounded-xl cursor-pointer text-[18px]">
            <FaUser className="mr-3" />
            Profile
          </li>
        </Link> */}

        <hr />

        <Link to="/income">
          <li className="flex items-center text-text-muted hover:text-primary hover:bg-secondary-accent px-4 py-2 rounded-xl cursor-pointer text-[18px]">
            <FaCalculator className="mr-3" />
            Income
          </li>
        </Link>

        <Link to="/expenses">
          <li className="flex items-center text-text-muted hover:text-primary hover:bg-secondary-accent px-4 py-2 rounded-xl cursor-pointer text-[18px]">
            <FaUsers className="mr-3" />
            Expense
          </li>
        </Link>

        <Link to="/users">
          <li className="flex items-center text-text-muted hover:text-primary hover:bg-secondary-accent px-4 py-2 rounded-xl cursor-pointer text-[18px]">
            <FaUsers className="mr-3" />
            Users
          </li>
        </Link>

        <hr />

        <Link to="/login">
          <li className="flex items-center text-error hover:text-primary hover:bg-secondary-accent px-4 py-2 rounded-xl cursor-pointer text-[18px]">
            <FaHdd className="mr-3" />
            Logout
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Menu;
