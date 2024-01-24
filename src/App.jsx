import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
// import LoginIn from "./Component/LoginAndSignupPage/LoginIn";
import SignUp from "./Component/LoginAndSignupPage/SignUp";
import Login from "./Component/LoginAndSignupPage/LoginIn";
import ContextStore from "./Component/Datastore/Context_SignUpAndLogin";
import Home from "./Component/LoginAndSignupPage/Home";
import Dashboard from "./Component/Dashboard/Dashboard";
function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path:'/:shutterShare-Dashboard',
      element:<Dashboard />
    }
  ]);
  return (
    <>
     <ContextStore>
      <RouterProvider router={router} />
    </ContextStore>
    </>
  );
}

export default App;
