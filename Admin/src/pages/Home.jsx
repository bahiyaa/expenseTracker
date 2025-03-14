import React from 'react'
import { FaWallet } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import { PiHandCoins } from "react-icons/pi";
import { PieChart } from '@mui/x-charts/PieChart';

function Home() {
  return (
    <div>
      <div className='flex items-center mt-[5%]'>
        <div className='flex flex-column text-gray-500 h-[150px] w-[350px] shadow-lg m-[20px]'>
          <div className='flex flex-col items-center justify-center mt-[10%]'>
            <div className='flex items-center ml-[30px]'>
              <div className='bg-pink-400 w-16 h-16 rounded-full flex items-center justify-center'>
                <IoCardOutline className='text-xl' />
              </div>
              <h1 className='text-[20px] font-semibold items-center ml-[25px] mt-[-30px]'>Total Balance</h1>
            </div>
            <div>
              <h4 className='text-[20px] items-center ml-[60px] mt-[-30px]'>$22500</h4>
            </div>
          </div>
        </div>

        <div className='flex flex-column text-gray-500 h-[150px] w-[350px] shadow-lg m-[20px]'>
          <div className='flex flex-col items-center justify-center mt-[10%]'>
            <div className='flex items-center ml-[30px]'>
              <div className='bg-pink-400 w-16 h-16 rounded-full flex items-center justify-center'>
                <FaWallet className='text-lg' />
              </div>
              <h1 className='text-[20px] font-semibold items-center ml-[25px] mt-[-30px]'>Total Income</h1>
            </div>
            <div>
              <h4 className='text-[20px] items-center ml-[70px] mt-[-30px]'>$25000</h4>
            </div>
          </div>
        </div>

        <div className='flex flex-column text-gray-500 h-[150px] w-[350px] shadow-lg m-[20px]'>
          <div className='flex flex-col items-center justify-center mt-[10%]'>
            <div className='flex items-center ml-[30px]'>
              <div className='bg-pink-400 w-16 h-16 rounded-full flex items-center justify-center'>
                <PiHandCoins className='text-xl' />
              </div>
              <h1 className='text-[20px] font-semibold items-center ml-[25px] mt-[-30px]'>Total Expense</h1>
            </div>
            <div>
              <h4 className='text-[20px] items-center ml-[50px] mt-[-30px]'>$2500</h4>
            </div>
          </div>
        </div>

      </div>

      <div className='flex items-center justify-between'>
        <div className='h-[450px] w-[500px]'>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: 'series A' },
                { id: 1, value: 15, label: 'series B' },
                { id: 2, value: 20, label: 'series C' },
              ],
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -45,
              endAngle: 225,
              cx: 150,
              cy: 150,
            }
          ]}
        />
        </div>
        <div className='h-[350px] w-[300[px] shadow-[lg] p-[20px]'>
        <h2 className='flex px-[20px] text-gray-500'>Recent Users</h2>
       <ol className='flex font-semibold flex-col justify-end px-[20px] mt-[10px] text-gray-400'>
        <li>1.Daniel</li>
        <li>2.Riya</li>
        <li>3.Rose</li>
       </ol>
      </div>
        
      </div>
 
     

    </div>
  )
}

export default Home