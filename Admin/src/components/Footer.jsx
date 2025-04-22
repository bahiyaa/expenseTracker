import React from 'react';
import logo from '../assets/logo.jpg';

function Footer() {
  return (
    <footer className="bg-card-bg text-text-main flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-6 md:py-0 shadow-inner font-sans gap-4 md:gap-0">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <img src={logo} alt="FinFlow Logo" className="h-16 w-16 md:h-20 md:w-20 object-contain" />
      </div>

      {/* Footer Links / Info */}
      <ul className="text-center md:text-right space-y-1">
        <li className="text-base md:text-lg font-semibold">Admin Panel</li>
        <li className="text-sm text-text-muted">&copy; 2025 FinFlow. All rights reserved.</li>
      </ul>
    </footer>
  );
}

export default Footer;
