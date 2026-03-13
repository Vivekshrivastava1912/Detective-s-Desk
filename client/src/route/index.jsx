import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";


import ResetPassword from "../pages/ResetPassword";
import VerifyOtp from "../pages/verifyOtp";
import Homepage from "../pages/Home";
import LearnSql from "../pages/LearnSql";


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
  {
    path: "home",
    element: <Homepage/>
  },

  {
    path : "learnsql",
    element : <LearnSql/>
  }
    ]
}])
export default router
