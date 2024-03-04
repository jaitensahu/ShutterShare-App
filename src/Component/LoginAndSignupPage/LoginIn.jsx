import React, { useContext, useEffect } from "react";
import mobileFrame from "../../assets/home-phones.png";
import screenshot1 from "../../assets/screenshot1.png";
import screenshot2 from "../../assets/screenshot2.png";
import screenshot3 from "../../assets/screenshot3.png";
import screenshot4 from "../../assets/screenshot4.png";
import "@coreui/coreui/dist/css/coreui.min.css";
import insta from "../../assets/WBLlWbPOKZ9.png";
import style from "./LoginIn.module.css";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import ContextStore, { Store } from "../Datastore/Context_SignUpAndLogin";
import Dashboard from "../Dashboard/Dashboard";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import { MutatingDots } from "react-loader-spinner";
import { ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
const Login = () => {
  const fadeIn = cssTransition({
    enter: "animate__animated animate__fadeIn",
    exit: "animate__animated animate__fadeOut",
  });
  let {
    loginForm,
    loginPass,
    loginEmail,
    currentUser,
    signinWithGoogle,
    showErrorMessage,
    setErrorMessage,
    isLoading,
    sendPassVerificationLink,
  } = useContext(Store);
  let navigateTo = useNavigate();

  useEffect(() => {
    return () => {
      setErrorMessage("");
    };
  }, []);
  // ----------- On Successful Login Navigating to DashBoard----------
  useEffect(() => {
    if (Object.keys(currentUser).length != 0) {
      navigateTo(`/shutterShare/`);
    }
  }, [currentUser]);
 

 
  // -----------------------------------------------------------
  return (
    <div className={style.loginIn}>
      <div className={style.subContainer}>
        <div className={`${style.imageOnLeft} relative w-[50%]`}>
          <img src={mobileFrame} alt="" />
          <div className="absolute right-[9%] top-[4%] w-[40.5%]">
            <CCarousel
              // interval="1000"
              transition="crossfade"
              className="w-[100%]"
            >
              <CCarouselItem className="w-[100%]">
                <CImage
                  className="d-block w-100 "
                  src={screenshot1}
                  alt="slide 1"
                />
              </CCarouselItem>
              <CCarouselItem>
                <CImage
                  className="d-block w-100"
                  src={screenshot2}
                  alt="slide 2"
                />
              </CCarouselItem>
              <CCarouselItem>
                <CImage
                  className="d-block w-100"
                  src={screenshot3}
                  alt="slide 3"
                />
              </CCarouselItem>
              <CCarouselItem>
                <CImage
                  className="d-block w-100"
                  src={screenshot4}
                  alt="slide 3"
                />
              </CCarouselItem>
            </CCarousel>
          </div>
        </div>

        <div className={style.LoginForm}>
          <form className={style.form}>
            <h1>ShutterShare</h1>
            <div className={style.inputBox}>
              <input type="text" placeholder="Email" ref={loginEmail} />
              <input
                type="password"
                placeholder="Password"
                autoComplete="true"
                ref={loginPass}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  loginForm(loginEmail.current.value, loginPass.current.value);
                }}
              >
                Login In
              </button>
            </div>
            <div className={style.OR}>
              <div className={style.line}></div>
              <span>OR</span>
              <div className={style.line}></div>
            </div>

            <div className={style.LoginWithGoogle} onClick={signinWithGoogle}>
              <FaGoogle />
              <p className="cursor-pointer">Log in with Google</p>
            </div>
            <p
              className={`${style.forgetPass} cursor-pointer`}
              onClick={() => sendPassVerificationLink(loginEmail.current.value)}
            >
              Forgot password?
            </p>
            <p className="text-[14px] text-red-600">{showErrorMessage}</p>
          </form>

          <div className={style.DontHaveAcc}>
            <p>
              Don't have an account?<Link to={"/signup"}>Sign up</Link>
            </p>
          </div>

          <div className={style.playStore}>
            <p>Get the app.</p>
            <div className={style.googlePlay}>
              <img
                src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
                alt=""
              />
              <img
                src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer transition={fadeIn} />
    </div>
  );
};

export default Login;
