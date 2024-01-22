import React from "react";
import style from "./SignUp.module.css";
const SignUp = () => {
  return (
    <div className={style.formContainer}>
      <div action="" className={style.signUpForm}>
        <h1>ShutterShare</h1>
        <div className={style.signUp}>
          <p>Sign up to see photos and videos from your friends.</p>
          <button>Log in with Google</button>
        </div>
        <div className={style.OR}>
          <div className={style.line}></div>
          <span>OR</span>
          <div className={style.line}></div>
        </div>

        <form className="loginForm">
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Full Name" />

          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />

          <button>Sign up</button>
        </form>

        <div className={style.haveAcc}>
          <p>
            Have an account?<a href={"ada"}>Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
