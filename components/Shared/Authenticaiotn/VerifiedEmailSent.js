import React from 'react';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

const VerifiedEmailSent = () => {
  return (
    <div
      className="text-center container py-5 rounded-1"
      style={{
        backgroundColor: 'white',
        maxHeight: '50vh',
      }}
    >
      <div className="my-5">
        <MdOutlineMarkEmailRead className="fs-1 text-success fw-bold" />
        <h4>Verify Your Account</h4>
        <h5>Please check your email inbox and spam box</h5>
      </div>
    </div>
  );
};

export default VerifiedEmailSent;
