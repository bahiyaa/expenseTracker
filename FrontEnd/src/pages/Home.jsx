import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div className='h-[80vh] flex items-center p-[50px] text-text-main'>
        <h2 className='text-3xl font-bold font-sans w-[50%] p-[50px] bg-primary-accent'>"STAY ON TOP OF YOUR FINANCES WITH FINFLOW" 🚀</h2>
        <img src="/src/assets/banner.jpg" className="p-[50px]  rounded-2xl" alt="" width="700px" />

      </div>
      <Footer> </Footer>
    </div>
  )
}

export default Home