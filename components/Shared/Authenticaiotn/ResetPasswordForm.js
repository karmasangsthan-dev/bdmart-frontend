import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";
import { useResetPasswordMutation } from "../../../features/auth/authApi";
import { useRouter } from "next/router";

const ResetPasswordForm = ({ resetToken }) => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [forgetPassword, { data, isSuccess, isError, error, isLoading }] =
    useResetPasswordMutation();
  const handleForgetPassword = () => {
    if (!newPassword?.length || !confirmPassword?.length) {
      return toast.error("Please provide password and confirm password...!!");
    } else if (newPassword !== confirmPassword) {
      return toast.error("Password and confirm password is not matched...!!");
    } else if (newPassword?.length && newPassword === confirmPassword) {
      return forgetPassword({ newPassword, resetToken });
    }
  };
  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: "sendEmail" });
    }
    if (isSuccess) {
      toast.success("Password changed Successful", { id: "sendEmail" });
      router.push("/");
    }
    if (error) {
      toast.error(error?.message, { id: "sendEmail" });
    }
  }, [isSuccess, isError, error, isLoading]);

  return (
    <div className="container ">
      <div
        className="p-5"
        style={{ backgroundColor: "whitesmoke", minHeight: "50vh" }}
      >
        <p className="w-50 fs-5 text-warning mx-auto">
          Enter your New password below to reset your password.
        </p>
        <div className="mt-3 w-50 mx-auto">
          <label htmlFor="name">Password:</label>
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            className={` form-control w-100 px-3 py-2 mb-3 mt-2`}
            name="password"
            type="password"
            placeholder="**************"
          />
          <label htmlFor="name">Confirm Password:</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
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
