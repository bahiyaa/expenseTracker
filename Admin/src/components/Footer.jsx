import React from 'react';

function Footer() {
  return (
    <footer className="h-40 bg-card-bg text-text-main flex items-center justify-between px-10 shadow-inner font-sans">
      {/* Logo */}
      <div className="flex items-center">
        <img src="src/assets/logo.jpg" alt="FinFlow Logo" className="h-20 w-20 object-contain" />
      </div>

      {/* Footer Links / Info */}
      <ul className="space-y-2 text-right">
        <li className="text-lg font-semibold">Admin Panel</li>
        <li className="text-sm text-text-light">&copy; 2025 FinFlow. All rights reserved.</li>
      </ul>
    </footer>
  );
}

export default Footer;
