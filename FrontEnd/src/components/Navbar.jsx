import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg';

function Navbar() {
  return (
    <div className="bg-primary text-secondary px-6 py-4 md:py-6 font-sans">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="FinFlow Logo" className="h-20 w-20 object-contain" />
        </div>

        {/* Login Button */}
        <div>
          <Link to="/login">
            <button className="bg-primary-accent text-text-main font-sans px-4 py-2 rounded-xl border-none hover:bg-primary transition">
              LOGIN
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
