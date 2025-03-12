import { createBrowserRouter,Outlet,RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Expense from "./pages/Expense"
import Navbar from "./components/Navbar"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import Users from "./pages/Users"
import Login from "./pages/Login"
import Income from "./pages/Income"
import NewUser from "./pages/NewUser"
import AddIncome from "./pages/AddIncome"
import AddExpense from "./pages/AddExpense"
import UpdateIncome from "./pages/UpdateIncome"

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
          path:"/income",
          element:<Income></Income>
        },
        {
          path:"/users",
          element:<Users></Users>
        },
        {
          path:"/newuser",
          element:<NewUser></NewUser>
        },
        {
          path:"/addincome",
          element:<AddIncome></AddIncome>
        },
        {
          path:"/addexpense",
          element:<AddExpense></AddExpense>
        },
        {
          path:"/income/:id",
          element:<UpdateIncome></UpdateIncome>
        },
      ]
    },
    {
      path:"/login",
      element:<Login></Login>
    },
    
    
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
