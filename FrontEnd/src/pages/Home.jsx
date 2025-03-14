import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div className='h-[80vh] flex items-center p-[50px] text-gray-300'>
        <h2 className='text-3xl font-bold w-[50%] p-[50px]'>"STAY ON TOP OF YOUR FINANCES WITH FINFLOW" 🚀</h2>
        <img src="/src/assets/Expense-image.webp" alt="" width="300px" height="500px"/>

      </div>
      <Footer> </Footer>
    </div>
  )
}

export default Home