import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import SignUp from "./Component/LoginAndSignupPage/SignUp";
import Login from "./Component/LoginAndSignupPage/LoginIn";
import ContextStore from "./Component/Datastore/Context_SignUpAndLogin";
import Dashboard from "./Component/Dashboard/Dashboard";
import Layout from "./Component/Layout/Layout";
import Explore from "./Component/Dashboard/DashBoard-SubComponents/Explore";
import Reels from "./Component/Dashboard/DashBoard-SubComponents/Reels";
import Inbox from "./Component/Dashboard/DashBoard-SubComponents/Inbox";
function App() {

  //------------------ Router Routes-------------------------
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
      path:'/shutterShare/:userName',
      element:<Layout />,
      children:[
        {
          path:'/shutterShare/:userName',
          element:<Dashboard />
        },
        {
          path:'/shutterShare/:userName/Explore',
          element:<Explore />
        },
        {
          path:'/shutterShare/:userName/reels',
          element:<Reels />
        }
      ]
    }
  ]);


  return (
    <>
    {/*--------- Providing Context to Routes------------- */}
    
     <ContextStore>  
      <RouterProvider router={router} />
    </ContextStore>
    </>
  );
}

export default App;
