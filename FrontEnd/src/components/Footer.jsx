// import React from 'react'

// function Footer() {
//   return (
//     <div className='h-[300px] bg-primary flex items-center justify-between p-[30px]'>
//       <div className='flex flex-col '>
//         <img src="/src/assets/logo.webp" alt="error" height="150px" width="150px" />
//         <span className='w-[50%]'>Stay on top of your finances with a seamless,
//           intuitive experience"</span>
//         <span>+91 9845672345</span>
//         <span>info@finflow.com</span>
//       </div>
//       <div className='flex flex-col'>
//         <span>Design by Bahiya</span>
//         <span>&copy; copyright 2025</span>

//       </div>

//     </div>
//   )
// }

// export default Footer

import React from 'react'
import logo from '../assets/logo.jpg';

function Footer() {
  return (
    <div className="h-[300px] bg-primary text-secondary flex items-center justify-between px-10 py-8 font-sans">
      <div className="flex flex-col gap-3 max-w-[50%]">
        <img
          src={logo}
          alt="FinFlow Logo"
          className="h-[120px] w-[120px] object-contain rounded-full"
        />
        <span className="text-text-main text-base font-heading italic">
          Stay on top of your finances with a seamless, intuitive experience.
        </span>
        <span className="text-secondary-accent font-medium">+91 98456 72345</span>
        <span className="text-secondary-accent font-medium">info@finflow.com</span>
      </div>

      <div className="flex flex-col items-end gap-2 text-text-muted text-sm">
        <span className="font-heading text-lg text-secondary-accent">Design by Bahiya</span>
        <span className="">© 2025 FinFlow. All rights reserved.</span>
      </div>
    </div>
  )
}

export default Footer