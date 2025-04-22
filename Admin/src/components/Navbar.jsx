import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="h-[80px] md:h-[100px] bg-primary text-text-main flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 md:px-10 py-2 md:py-0 shadow-md gap-2 sm:gap-0">
      <Link to="/" className="flex items-center justify-center">
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-12 md:h-[80px] md:w-[80px] object-cover rounded-xl shadow-sm"
        />
      </Link>

      <button
        onClick={handleLogout}
        className="bg-secondary-accent text-text-main px-4 py-2 rounded-xl font-medium hover:bg-secondary transition-colors text-sm md:text-base"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
