import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home/Home";
import LogIn from "../pages/LogIn";
import Payment from "../pages/Payment/Payment";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
