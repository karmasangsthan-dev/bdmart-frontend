import React from 'react';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

const emailVerifiedSuccess = () => {
  const router = useRouter();
  setTimeout(() => {
    router.push('/');
  }, 5000);
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
          <button onClick className="px-2 py-1 border-0 rounded-2">
            Go to home{' '}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default emailVerifiedSuccess;
