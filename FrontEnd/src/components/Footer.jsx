
import React from 'react'
import logo from '../assets/logo.jpg';

function Footer() {
  return (
    <div className="bg-primary text-secondary px-6 py-10 font-sans">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left max-w-md">
          <img
            src={logo}
            alt="FinFlow Logo"
            className="h-24 w-24 object-contain rounded-full"
          />
          <span className="text-text-main text-base font-heading italic">
            Stay on top of your finances with a seamless, intuitive experience.
          </span>
          <span className="text-secondary-accent font-medium">+91 98456 72345</span>
          <span className="text-secondary-accent font-medium">info@finflow.com</span>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center md:items-end gap-2 text-text-muted text-sm">
          <span className="font-heading text-lg text-secondary-accent">Design by Bahiya</span>
          <span className="">© 2025 FinFlow. All rights reserved.</span>
        </div>
      </div>
    </div>
  )
}

export default Footer;
