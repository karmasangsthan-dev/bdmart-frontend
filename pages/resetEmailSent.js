import React from 'react';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
const ResetEmailSent = () => {
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
        <h4>Email Sent Successful</h4>
        <h5>Please check your email inbox and spam box</h5>
        <a
          href="https://mail.google.com/mail/u/0/#all"
          className="bg-primary fw-semibold bg-opacity-10 px-3 py-2 mt-4 text-decoration-none rounded-2"
        >
          Go for Email
        </a>
      </div>
    </div>
  );
};

export default ResetEmailSent;
