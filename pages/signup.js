import Link from "next/link";

import { FaFacebookF } from "react-icons/fa";
import Header from "../components/Shared/Header/Header";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../features/auth/authApi";
import { fetchUser } from "../features/auth/authSlice";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import GoogleLogin from "../components/Shared/SocialLogin/GoogleLogin";

const signup = () => {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const [signup, { data, isSuccess, isError, error }] = useSignupMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [deviceHeight, setDeviceHeight] = useState(0);
  const { query } = router;
  const { redirect } = query;

  const handleSignup = () => {
    const fullName = name;
    if (name.length < 1 && email.length < 1 && password.length < 1) {
      toast.error("Please fill up sign up form at first...!!")
    }
    if ((name && password && !email)) {
      toast.error("Please enter your email address")
    }
    if ((!name && password && !email)) {
      toast.error("Please enter your name and email")
    }
    if (!name && !password && email) {
      toast.error("Please Enter your name and password")
    }
    if (name && !password && !email) {
      toast.error("Please Enter your email address and password")
    }
    if (!name && password && email) {
      toast.error("Please Enter your name ")
    }
    if (!name && password && email) {
      toast.error("Please Enter your name")
    }
    if (email && name && !password) {
      toast.error("Please enter your password")
    }
    if (email && name && password) {
      signup({ fullName, email, password });
    }

  };

  useEffect(() => {
    // if (user?.email) {
    //   router.push("/");
    // }
    if (isSuccess) {
      localStorage.setItem("accessToken", data?.token);
      toast.success("Signup success..", { id: "signup" });
      dispatch(fetchUser(data?.token));
      router.push(redirect);
    }
    if (isError) {
      toast.error(error?.data?.error, { id: "signup" });
    }
  }, [isSuccess, isError, error, dispatch, data?.token, user]);

  useEffect(() => {
    setDeviceHeight(window.innerHeight)
  }, []);

  return (
    <div style={{minHeight: deviceHeight < 650 ? "120vh" : 'auto'}} className="">
      <Header></Header>
      <div className="d-sm-none d-lg-block" style={{ backgroundColor: "#fff !important", minHeight: "120vh" }}>
        <div className="mx-auto" style={{ width: "60%" }}>
          <div className=" d-flex justify-content-between">
            <h4>Welcome to BD Mart! Please Register.</h4>
            <span>
              Already a member? <Link href="/signin">Sign In here</Link>.
            </span>
          </div>
          <div>

            <div
              style={{ backgroundColor: "#eff0f5" }}
              className="form-container  d-flex"
            >
              <div className="left w-50 p-4">
                <div>
                  <label htmlhtmlFor="email">Enter Your Name*</label> <br />
                  <input
                    name="fullName"
                    style={{
                      backgroundColor: "#eff0f5",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setName(e.target.value)}
                    className="w-100 px-2 py-1"
                    type="text"
                    placeholder="Please Enter your Name"
                  />
                </div>

                <div className="mt-3">
                  <label htmlhtmlFor="email">Enter your Email*</label> <br />
                  <input
                    name="email"
                    style={{
                      backgroundColor: "#eff0f5",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-100 px-2 py-1"
                    type="text"
                    placeholder="Please Enter your Phone Number or Email"
                  />
                </div>
                <div className="mt-3">
                  <label htmlhtmlFor="email">Password*</label>
                  <br />
                  <input
                    name="password"
                    style={{
                      backgroundColor: "#eff0f5",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-100 px-2 py-1"
                    type={showPass ? "text" : "password"}
                    placeholder="Please Enter your Password"
                  />
                  {showPass ? (
                    <AiFillEye
                      onClick={() => setShowPass(!showPass)}
                      className="fs-5 signup-password-show-button"
                    />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={() => setShowPass(!showPass)}
                      className="fs-5 signup-password-show-button"
                    />
                  )}
                </div>
              </div>

              <div className="right w-50 mb-4 p-4">
                <button
                  onClick={handleSignup}
                  style={{ backgroundColor: "#faa72c" }}
                  className="btn w-100 px-2 py-2 mt-3 text-white"
                >
                  Sign Up
                </button>
                <p>or sign in with</p>
                <GoogleLogin />
                <button
                  style={{ backgroundColor: "#3b5998" }}
                  className="btn w-100 px-2 py-2 mt-3 text-white"
                >
                  <FaFacebookF></FaFacebookF> Facebook
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* mobile start from here  */}

      <div className="d-sm-block d-lg-none">
        <div className="mobile-login-container" >
          <div className="mobile-contact-header">
            <h4 className="">
              Welcome to <span className="mark">BD Mart!</span><br className="login-br-sm" /> Please Sign Up.
            </h4>
            {/* <span>
              New member? <Link href="/signup"> Register here.</Link>
            </span> */}
          </div>
          <div className="mobile-login-content">
            <div>
              <label htmlhtmlFor="email">Enter your Name*</label> <br />
              <input
                onChange={(e) => setName(e.target.value)}
                className="input-email"
                type="text"
                placeholder="Please Enter your Name"
              />
            </div>
            <div className="mt-2">
              <label htmlhtmlFor="email">Phone Number or Email*</label> <br />
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-email"
                type="text"
                placeholder="Please Enter your Email"
              />
            </div>
            <div className="mt-2">
              <label htmlhtmlFor="email">Password*</label>
              <br />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="input-password"
                type={showPass ? "text" : "password"}
                placeholder="Please Enter your Password"
              />
              <div className="icon-container">
                {showPass ? (
                  <AiFillEye

                    onClick={() => setShowPass(!showPass)}
                    className="fs-5 mobile-signup-password-show-button"
                  />
                ) : (
                  <AiFillEyeInvisible
                    onClick={() => setShowPass(!showPass)}
                    className="fs-5 mobile-signup-password-show-button"
                  />
                )}
              </div>
            </div>
            <div className="">
              <button
                className="mobile-sign-in-btn "
                onClick={handleSignup}
              >
                SignUp
              </button>
              <p className="mobile-signin-divider">or sign up with</p>
              <GoogleLogin />
              <button
                style={{ backgroundColor: "#3b5998" }}
                className="btn mobile-facebook-signin-btn"
              >
                <FaFacebookF></FaFacebookF> Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default signup;