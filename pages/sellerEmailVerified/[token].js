import React, { useEffect } from 'react';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/auth/authSlice';
import { getCookie } from '../../utils/getCookie';
import { useCreateSellerAccountMutation } from '../../features/auth/authApi';
import { toast } from 'react-hot-toast';

const SellerEmailVerified = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    query: { token },
  } = router;
  const [createSellerAccount, { data, isSuccess, isLoading, error, isError }] =
    useCreateSellerAccountMutation();

  useEffect(() => {
    const userDataCookie = getCookie('userData');
    if (userDataCookie !== null) {
      const userData = JSON.parse(userDataCookie);
      createSellerAccount({ userData, token });
    } else {
      console.log('userData cookie not found');
    }
  }, [token]);

  useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'sellerRegister' });
    }
    if (isSuccess) {
      toast.success('Success', { id: 'sellerRegister' });
      console.log(data);
    }
    if (isError) {
      toast.error('Error ', { id: 'sellerRegister' });
      console.log(error);
    }
  }, [isSuccess, isLoading, isError, error]);
  // setTimeout(() => {
  //   router.push('/');
  // }, 5000);

  return (
    <Layout title="Shop - Bangladesh Mart">
      <div
        className="text-center container py-5 rounded-1"
        style={{
          backgroundColor: 'white',
          maxHeight: '50vh',
        }}
      >
        <div className="my-5">
          <MdOutlineMarkEmailRead className="fs-1 text-success fw-bold" />
          <h4>Email verified Successful</h4>
          <h5>Welcome to Bangladesh Mart</h5>
          <button
            onClick={() => router.push('/')}
            className="px-2 py-1 border-0 rounded-2"
          >
            Go to home{' '}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SellerEmailVerified;
