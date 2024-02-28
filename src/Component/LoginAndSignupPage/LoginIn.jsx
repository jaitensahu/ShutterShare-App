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
const Login = () => {
  let {
    loginForm,
    loginPass,
    loginEmail,
    currentUser,
    signinWithGoogle,
    showErrorMessage,
    setErrorMessage,
    isLoading,
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
  console.log(currentUser);

  // if (isLoading) {
  //  return ;
  // }
  console.log(isLoading);
  // -----------------------------------------------------------
  return (
    <div className={style.loginIn}>
      {isLoading ? (
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: "10000",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 1000px 500px #00000087",
            backgroundColor: "#00000087",
            border: "none",
          }}
          // wrapperClass="loder"
          // className={style.loder}
        />
      ) : null}
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
              <input type="password" placeholder="Password" ref={loginPass} />
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
            <p className={`${style.forgetPass} cursor-pointer`} onClick={()=>navigateTo("/reset-password")}>
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
    </div>
  );
};

export default Login;
