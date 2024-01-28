import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import Dashboard from "../Dashboard/Dashboard";
import style from "./SignUp.module.css";


const SignUp = () => {
  let navigateTo=useNavigate();
  let {handleInputRef,signUpEmail, signUpName, signUpUserName, signUpPass, signinWithGoogle, currentUser } = useContext(Store);

  // -----------If User SignUp Navigating to DashBoard ------------------- 
  useEffect(()=>{
    if(Object.keys(currentUser).length>0){
      navigateTo('/shutterShare/:Dashboard')
    }
  })
// ---------------------------------------------------------
  return (
    <div className={style.formContainer}>
      <div action="" className={style.signUpForm}>
        <h1>ShutterShare</h1>
        <div className={style.signUp}>
          <p>Sign up to see photos and videos from your friends.</p>
          <button onClick={signinWithGoogle}>Log in with Google</button>
        </div>
        <div className={style.OR}>
          <div className={style.line}></div>
          <span>OR</span>
          <div className={style.line}></div>
        </div>

        <form className={style.loginForm}>
          <input type="text" placeholder="Email" ref={signUpEmail} />
          <input type="text" placeholder="Full Name" ref={signUpName} />

          <input type="text" placeholder="Username" ref={signUpUserName} />
          <input type="text" placeholder="Password" ref={signUpPass} />
          <p>
            By signing up, you agree to our Terms , Privacy Policy and Cookies
            Policy .
          </p>
          <button 
            
            onClick={(event) =>{
             event.preventDefault()
              let response=handleInputRef(
                signUpEmail.current.value,
                signUpName.current.value,
                signUpUserName.current.value,
                signUpPass.current.value
              );
              //------------------ When user Successfully SignUp Function returns True and Navigate user to Login window-------------------------- 
             response? navigateTo('/login'):alert("Insteade of alret show some error message")
            }
            }
          >
            Sign up
          </button>
        </form>
      </div>
      <div className={style.haveAcc}>
        <p>
          Have an account?<Link to={"/login"}>Log in</Link>
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
  );
};

export default SignUp;
