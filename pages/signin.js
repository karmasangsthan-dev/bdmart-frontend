import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { FaGooglePlusG, FaFacebookF } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Header from "../components/Shared/Header/Header";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import {
  useLoginMutation,
  useSocialLoginMutation,
} from "../features/auth/authApi";
import { setUser } from "../features/auth/authSlice";
import auth from "../firebase.init";
import GoogleLogin from "../components/Shared/SocialLogin/GoogleLogin";

const signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const { query } = router;
  const { redirect } = query;
  const dispatch = useDispatch();
  const [login, { data, isSuccess, isLoading, isError, error }] =
    useLoginMutation();

  const handleSignIn = () => {
    // event.preventDefault();

    login({ email, password });
  };
  console.log({query,redirect})

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: "login" });
    }
    if (isSuccess) {
      localStorage.setItem("accessToken", data.token);
      toast.success("Success", { id: "login" });
      router.push(redirect);
      dispatch(setUser(data?.data));
    }
    if (isError) {
      toast.error(error?.data?.error, { id: "login" });
    }
  }, [isSuccess, data, dispatch, isError, error, isLoading]);
  return (
    <div className="">
      <Header></Header>
      <div style={{ backgroundColor: "#fff !important" }}>
        <div className="mx-auto" style={{ width: "60% " }}>
          <div className=" d-flex justify-content-between">
            <h4 style={{ color: "#424242" }}>
              Welcome to BD Mart! Please login.
            </h4>
            <span>
              New member? <Link href="/signup"> Register here.</Link>
            </span>
          </div>
          <div>
            <div
              style={{ backgroundColor: "#eff0f5" }}
              className="form-container  d-flex"
            >
              <div className="left w-50 p-4">
                <div>
                  <label htmlhtmlFor="email">Phone Number or Email*</label> <br />
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      backgroundColor: "#eff0f5",
                      borderRadius: "5px",
                    }}
                    required
                    className="w-100 px-2 py-1"
                    type="text"
                    placeholder="Please Enter your Email"
                  />
                </div>

                <div className="mt-3">
                  <label htmlhtmlFor="email">Password*</label>
                  <br />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
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
                  onClick={handleSignIn}
                >
                  Signin
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
    </div>
  );
};
export default signin;
