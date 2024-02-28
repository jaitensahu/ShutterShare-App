import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import SignUp from "./Component/LoginAndSignupPage/SignUp";
import Login from "./Component/LoginAndSignupPage/LoginIn";
import ContextStore from "./Component/Datastore/Context_SignUpAndLogin";
import Dashboard from "./Component/Dashboard/Dashboard";
import Layout from "./Component/Layout/Layout";
import Explore from "./Component/Dashboard/DashBoard-SubComponents/Explore";
import Reels from "./Component/Dashboard/DashBoard-SubComponents/Reels";
import ProfileLayout from "./Component/EditProfilePage/ProfileLayout";
import Posts from "./Component/EditProfilePage/Posts"
import ReelsOnProfile from "./Component/EditProfilePage/ReelsOnProfile";
import Saved from './Component/EditProfilePage/Saved'
import EditPopUp from "./Component/EditProfilePage/editPopUpWindow/editPopUp";
import ChangePassWord from "./Component/LoginAndSignupPage/ChangePassWord";

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
      path: "/reset-password",
      element: <ChangePassWord />
    },
    {
      path: "/shutterShare",
      element: <Layout />,
      children: [
        {
          path: "/shutterShare",
          element: <Dashboard />,
        },
        {
          path: "/shutterShare/Explore",
          element: <Explore />,
        },
        {
          path: "/shutterShare/reels",
          element: <Reels />,
        },
        {
          path: "/shutterShare/:userName",
          element: <ProfileLayout />,
          children: [
            {
              path: "/shutterShare/:userName",
              element: <Posts />,
            },
            {
              path: "/shutterShare/:userName/reels",
              element: <ReelsOnProfile />,
            },
            {
              path: "/shutterShare/:userName/saved",
              element: <Saved />,
            },
          ],
        },
        {
          path: "/shutterShare/account/edit",
          element: <EditPopUp />,
        },
      ],
    },
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
