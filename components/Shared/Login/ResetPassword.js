import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";

const ResetPasswordForm = () => {
  const [isValid, setIsValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [select, setSelect] = useState();

  const handleForgetPassword = () => {
    if (email === "") {
      toast.error("Please enter your email address...!!");
    } else if (email && emailValid === false) {
      toast.error("Please enter valid email address...!!");
    } else {
      toast.success("Email send successful... Please check your email");
    }
  };

  return (
    <div className="container">
      <h4 className="py-3">Forgot your password?</h4>
      <div
        className="p-5"
        style={{ backgroundColor: "#fff", minHeight: "50vh" }}
      >
        <p className="w-50 fs-5 text-warning mx-auto">
          Enter your New password below to reset your password.
        </p>
        <div className="mt-3 w-50 mx-auto">
          <label htmlFor="name">Password:</label>
          <input
            onChange={(e) => setSelect(1)}
            className={` form-control w-100 px-3 py-2 mb-3 mt-2`}
            name="password"
            type="password"
            placeholder="**************"
          />
          <label htmlFor="name">Confirm Password:</label>
          <input
            onChange={(e) => setSelect(2)}
            className={` form-control w-100 px-3 py-2 mb-3 mt-2`}
            name="confirmPassword"
            type="password"
            placeholder="**************"
          />

          <div
            className="update-profile-button-container"
            style={{ justifyContent: "flex-start" }}
          >
            <button
              onClick={handleForgetPassword}
              className="update-profile-button "
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
