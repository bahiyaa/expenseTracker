import { publicRequest, userRequest } from "../requestMethod"; // ✅ Ensure correct import
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  try {
    dispatch(loginStart()); // Dispatch login start action
    const res = await publicRequest.post("/auth/login", user); // ✅ Use publicRequest for login
    dispatch(loginSuccess(res.data)); // Store user data in Redux
    console.log("✅ Login Successful:", res.data); // Debugging
  } catch (error) {
    dispatch(loginFailure()); // Dispatch failure action
    console.error("❌ Login Error:", error.response?.data || error.message);
  }
};
