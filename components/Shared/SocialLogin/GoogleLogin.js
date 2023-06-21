import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FaGooglePlusG } from "react-icons/fa";
import auth from "../../../firebase.init";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../../features/auth/authSlice";
import { toast } from "react-hot-toast";

export default function GoogleLogin() {
  const router = useRouter();
  const { query } = router;
  const { redirect } = query;
  const dispatch = useDispatch();
  const [signInWithGoogle, user, loading, errorGoogle] =
    useSignInWithGoogle(auth);
  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };
  useEffect(() => {
    if (user) {
      const email = user?.user?.email;
      const fullName = user?.user?.displayName;
      const providerId = "firebase";
      const profilePicture = user?.user?.photoURL;
      dispatch(googleLogin({ email, fullName, providerId, profilePicture }));
      toast.success('Login successfully...!!')
      router.push(redirect || '/');
    }
  }, [user]);

  return (
    <button
      onClick={handleGoogleSignIn}
      style={{ backgroundColor: "#d34836" }}
      className="btn w-100 px-2 py-2  text-white google-login-btn"
    >
      <FaGooglePlusG className="h4 mb-0" /> Google
    </button>
  );
}
