// import React, { useState, useEffect } from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../redux/apiCalls";
// import { useNavigate } from "react-router-dom";
// import banner from '../assets/banner.jpg';


// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const user = useSelector((state) => state.user.currentUser);
//   const error = useSelector((state) => state.user.error);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleTogglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = async () => {
//     if (email && password) {
//       try {
//         setLoading(true);
//         await login(dispatch, { email, password });
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       navigate("/mypage");
//     }
//   }, [user, navigate]);

//   return (
//     <div className="bg-background min-h-screen font-sans text-text-main">
//       <Navbar />

//       <div className="flex flex-col lg:flex-row items-center justify-evenly py-16 px-6 lg:px-20">
//         <img
//           src={banner}
//           alt="Login Banner"
//           className="w-[300px] lg:w-[350px] rounded-2xl shadow-card"
//         />

//         <div className="bg-card-bg w-full max-w-md mt-10 lg:mt-0 p-8 rounded-2xl shadow-card">
//           <h2 className="text-2xl font-heading mb-6 text-center">Welcome Back</h2>

//           <input
//             type="email"
//             placeholder="Enter your Email"
//             onChange={(e) => setEmail(e.target.value.trim())}
//             className="w-full p-4 mb-4 border border-secondary-accent rounded-xl bg-secondary text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
//           />

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your Password"
//               onChange={(e) => setPassword(e.target.value.trim())}
//               className="w-full p-4 pr-10 mb-4 border border-secondary-accent rounded-xl bg-secondary text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//             <span
//               className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-xl"
//               onClick={handleTogglePassword}
//             >
//               {showPassword ? "👀" : "🔒"}
//             </span>
//           </div>

//           <button
//             onClick={handleLogin}
//             disabled={loading}
//             className={`w-full p-4 rounded-xl font-semibold text-white transition-all ${
//               loading
//                 ? "bg-primary-accent cursor-not-allowed"
//                 : "bg-primary hover:bg-primary-accent"
//             }`}
//           >
//             {loading ? "Loading..." : "Login"}
//           </button>

//           {error && (
//             <span className="text-error block text-center mt-4">
//               Invalid email or password
//             </span>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Login;

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.jpg";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/userRedux";
import { publicRequest } from "../requestMethod";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.currentUser);
  const error = useSelector((state) => state.user.error);
  const isFetching = useSelector((state) => state.user.isFetching);

  useEffect(() => {
    if (user) {
      navigate("/mypage");
    }
  }, [user, navigate]);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    setSubmitted(true);
    if (email && password) {
      dispatch(loginStart());
      try {
        const res = await publicRequest.post("/auth/login", {
          email,
          password,
        });
        dispatch(loginSuccess(res.data));
      } catch (err) {
        dispatch(loginFailure());
      }
    }
  };

  return (
    <div className="bg-background min-h-screen font-sans text-text-main">
      <Navbar />

      <div className="flex flex-col lg:flex-row items-center justify-evenly py-16 px-6 lg:px-20">
        <img
          src={banner}
          alt="Login Banner"
          className="w-[300px] lg:w-[350px] rounded-2xl shadow-card"
        />

        <div className="bg-card-bg w-full max-w-md mt-10 lg:mt-0 p-8 rounded-2xl shadow-card">
          <h2 className="text-2xl font-heading mb-6 text-center">
            Welcome Back
          </h2>

          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            className="w-full p-4 mb-4 border border-secondary-accent rounded-xl bg-secondary text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              className="w-full p-4 pr-10 mb-4 border border-secondary-accent rounded-xl bg-secondary text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-xl"
              onClick={handleTogglePassword}
            >
              {showPassword ? "👀" : "🔒"}
            </span>
          </div>

          <button
            onClick={handleLogin}
            disabled={isFetching}
            className={`w-full p-4 rounded-xl font-semibold text-white transition-all ${
              isFetching
                ? "bg-primary-accent cursor-not-allowed"
                : "bg-primary hover:bg-primary-accent"
            }`}
          >
            {isFetching ? "Logging in..." : "Login"}
          </button>

          {submitted && error && (
            <p className="text-red-500 mt-4 text-center">
              Invalid email or password
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
