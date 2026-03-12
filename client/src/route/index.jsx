import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";


const router = createBrowserRouter([{
   

     path: "/",
  element: <App />,

    children : [
        {
    path: "Login",
    element: <Login />

  }
    ]
}])
export default router
