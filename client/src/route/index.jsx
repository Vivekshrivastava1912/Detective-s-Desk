import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";


import ResetPassword from "../pages/ResetPassword";
import VerifyOtp from "../pages/verifyOtp";


const router = createBrowserRouter([{
   

     path: "/",
  element: <App />,

    children : [
        {
    path: "Login",
    element: <Login />

  } ,
  {
    path: "register",
    element: <Register />

  }
    ,
  {
    path: "forgotpassword",
    element: <ForgotPassword />

  }
    ,
  {
    path: "verifyotp",
    element: <VerifyOtp/>

  }
    ,
  {
    path: "resetpassword",
    element: <ResetPassword />

  },
    ]
}])
export default router
