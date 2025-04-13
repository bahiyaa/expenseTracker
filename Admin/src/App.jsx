import { createBrowserRouter, Outlet, RouterProvider, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Expense from "./pages/Expense";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Income from "./pages/Income";
import NewUser from "./pages/NewUser";
import AddIncome from "./pages/AddIncome";
import AddExpense from "./pages/AddExpense";
import UpdateIncome from "./pages/UpdateIncome";
import UpdateExpense from "./pages/UpdateExpense";
import AdminProfile from "./pages/AdminProfile";

// ✅ Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  // ✅ Admin layout (protected)
  const Layout = () => {
    return (
      <div>
        <Navbar />
        <div className="flex">
          <div className="w-[20%]">
            <Menu />
          </div>
          <div className="w-[80%]">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/expenses", element: <Expense /> },
        { path: "/income", element: <Income /> },
        { path: "/users", element: <Users /> },
        { path: "/newuser", element: <NewUser /> },
        { path: "/addincome", element: <AddIncome /> },
        { path: "/addexpense", element: <AddExpense /> },
        { path: "/adminincome/:id", element: <UpdateIncome /> },
        { path: "/adminexpense/:id", element: <UpdateExpense></UpdateExpense> },
        { path: "/profile", element: <AdminProfile></AdminProfile> },


      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
