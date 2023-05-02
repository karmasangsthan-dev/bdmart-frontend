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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const fullName = event.target.fullName.value;
    const password = event.target.password.value;
    signup({ fullName, email, password });
  };

  useEffect(() => {
    // if (user?.email) {
    //   router.push("/");
    // }
    if (isSuccess) {
      localStorage.setItem("accessToken", data?.token);
      toast.success("Signup success..", { id: "signup" });
      dispatch(fetchUser(data?.token));
      router.push("/");
    }
    if (isError) {
      toast.error(error?.data?.error, { id: "signup" });
    }
  }, [isSuccess, isError, error, dispatch, data?.token, user]);

  return (
    <div className="">
      <Header></Header>
      <div style={{ backgroundColor: "#fff !important", minHeight: "100vh" }}>
        <div className="mx-auto" style={{ width: "60%" }}>
          <div className=" d-flex justify-content-between">
            <h4>Welcome to BD Mart! Please Register.</h4>
            <span>
              Already a member? <Link href="/signin">Sign In here</Link>.
            </span>
          </div>
          <div>
            <form onSubmit={handleFormSubmit}>
              <div
                style={{ backgroundColor: "#eff0f5" }}
                className="form-container  d-flex"
              >
                <div className="left w-50 p-4">
                  <div>
                    <label htmlFor="email">Enter Your Name*</label> <br />
                    <input
                      name="fullName"
                      style={{
                        backgroundColor: "#eff0f5",
                        borderRadius: "5px",
                      }}
                      required
                      className="w-100 px-2 py-1"
                      type="text"
                      placeholder="Please Enter your Name"
                    />
                  </div>

                  <div className="mt-3">
                    <label htmlFor="email">Phone Number or Email*</label> <br />
                    <input
                      name="email"
                      style={{
                        backgroundColor: "#eff0f5",
                        borderRadius: "5px",
                      }}
                      required
                      className="w-100 px-2 py-1"
                      type="text"
                      placeholder="Please Enter your Phone Number or Email"
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="email">Password*</label>
                    <br />
                    <input
                      name="password"
                      style={{
                        backgroundColor: "#eff0f5",
                        borderRadius: "5px",
                      }}
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default signup;