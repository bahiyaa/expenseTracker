import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Income from "./pages/Income"
import Expense from "./pages/Expense"
import MyPage from "./pages/MyPage"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>
    },
    {
      path: "/login",
      element: <Login></Login>
    },
    {
      path: "/mypage",
      element: <MyPage></MyPage>
    },
    {
      path: "/income",
      element: <Income></Income>
    },
    {
      path: "/expense",
      element: <Expense></Expense>
    },

  ])


  return (

    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
