import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="h-[100px] bg-primary text-text-main flex items-center justify-between px-10 shadow-md">
      <Link to="/" className="flex items-center">
        <img
          src="src/assets/logo.jpg"
          alt="Logo"
          className="h-[80px] w-[80px] object-cover rounded-xl shadow-sm"
        />
      </Link>

      <button
        onClick={handleLogout}
        className="bg-secondary-accent text-text-main px-4 py-2 rounded-xl font-medium hover:bg-secondary transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
