import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FaGooglePlusG } from 'react-icons/fa';
import auth from '../../../firebase.init';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../../../features/auth/authSlice';
import { toast } from 'react-hot-toast';
import { useSocialLoginMutation } from '../../../features/auth/authApi';

export default function GoogleLogin() {
  const router = useRouter();
  const { query } = router;
  const { redirect } = query;
  const dispatch = useDispatch();
  const [signInWithGoogle, user, loading, errorGoogle] =
    useSignInWithGoogle(auth);
  const [socialLogin, { isLoading, isSuccess, isError, error }] =
    useSocialLoginMutation();
  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };
  useEffect(() => {
    if (user) {
      const email = user?.user?.email;
      const fullName = user?.user?.displayName;
      const providerId = 'firebase';
      const profilePicture = user?.user?.photoURL;
      socialLogin({ email, fullName, providerId, profilePicture });
    }
  }, [user]);
  useEffect(() => {
    if (isLoading) toast.loading('Loading...', { id: 'socialLogin' });
    if (isError) toast.error(error?.data?.error, { id: 'socialLogin' });
    if (isSuccess) toast.success('Success', { id: 'socialLogin' });
  }, [isLoading, isError, error, isSuccess]);
  return (
    <button
      onClick={handleGoogleSignIn}
      style={{ backgroundColor: '#d34836' }}
      className="btn w-100 px-2 py-2  text-white google-login-btn"
    >
      <FaGooglePlusG className="h4 mb-0" /> Google
    </button>
  );
}
