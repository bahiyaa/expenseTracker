import { createBrowserRouter,Outlet,RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Expense from "./pages/Expense"
import Allusers from "./pages/Allusers"
import Navbar from "./components/Navbar"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import Users from "./pages/Users"

function App() {

  const Layout=()=>{
    return(
      <div>
        <Navbar></Navbar>
        <div className="flex">
          <div className="w-[20%]">
            <Menu></Menu>
            </div>
            <div className="w-[80%]">
              <Outlet></Outlet>
            </div>
          </div>
        <Footer></Footer>
      </div>
    )
  }
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Layout></Layout>,
      children:[
        {
          path:"/",
        element:<Home></Home>
        },
        {
          path:"/expenses",
          element:<Expense></Expense>
        },
        {
          path:"/allusers/:id",
          element:<Allusers></Allusers>
        },
        {
          path:"/users",
          element:<Users></Users>
        }
      ]
    },
    
    
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
