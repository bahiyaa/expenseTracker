import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import banner from '../assets/banner.jpg';

function Home() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="h-[80vh] flex flex-col md:flex-row items-center p-6 md:p-12 text-text-main">
        
        {/* Text Section */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans w-full md:w-[50%] p-6 md:p-10 bg-primary-accent rounded-2xl text-center md:text-left">
          "STAY ON TOP OF YOUR FINANCES WITH FINFLOW" 
        </h2>
        
        {/* Image Section */}
        <img 
          src={banner} 
          className="w-full md:w-[50%] p-6 md:p-10 rounded-2xl object-cover" 
          alt="Banner" 
        />
      </div>

      <Footer />
    </div>
  )
}

export default Home;
