import React, { useContext } from "react";
import mobileFrame from "../../assets/home-phones.png";
import insta from "../../assets/WBLlWbPOKZ9.png";
import style from "./LoginIn.module.css";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import ContextStore, { Store } from "../Datastore/Context_SignUpAndLogin";
import Dashboard from "../Dashboard/Dashboard";
const Login = () => {
  let {loginForm, loginPass,loginEmail,userObj} = useContext(Store);
  let navigateTo = useNavigate();
  let param = useParams();
    console.log(param);


  return (
    Object.keys(userObj).length==0?
      <div className={style.loginIn}>
        <div className={style.subContainer}>
          <div className={style.imageOnLeft}>
            <img src={mobileFrame} alt="" />
          </div>

          <div className={style.LoginForm}>
            <form className={style.form}>
              <h1>ShutterShare</h1>
              <div className={style.inputBox}>
                <input type="text" placeholder="Email" ref={loginEmail}/>
                <input type="text" placeholder="Password" ref={loginPass} />
                <button onClick={(e)=>{
                  e.preventDefault();
                  loginForm(loginEmail.current.value, loginPass.current.value)}}>Login In</button>
              </div>
              <div className={style.OR}>
                <div className={style.line}></div>
                <span>OR</span>
                <div className={style.line}></div>
              </div>

              <div className={style.LoginWithGoogle}>
                <FaGoogle />
                <p>Log in with Google</p>
              </div>
              <p className={style.forgetPass}>Forgot password?</p>
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
      </div> :<Dashboard />
  );
};

export default Login;
