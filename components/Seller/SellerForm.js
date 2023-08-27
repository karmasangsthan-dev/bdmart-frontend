import Link from 'next/link';
import React from 'react';

const SellerForm = ({seller}) => {
    // event handler for submit seller data 
    const handleSubmitSellerData = () => {

    }

    return (
        <form onSubmit={handleSubmitSellerData}>
            <div className="form-group">
                
                <div className="personal-content">
                    <div className="personal-input">
                        <label htmlFor="">First Name</label>
                        <div className="personal-relative">
                            <input name="firstName"
                                className="form-control"
                                type="text" placeholder="John" />
                        </div>
                    </div>
                    <div className="personal-input">
                        <label htmlFor="">Last Name</label>
                        <div className="personal-relative">
                            <input className="form-control" name="lastName" type="text" placeholder="Doe" />
                        </div>
                    </div>
                    <div className="personal-input">
                        <label htmlFor="">Email address</label>
                        <div className="personal-relative">
                            <input
                                readOnly
                                disabled
                                name="email"
                                type="text"
                                id="email"
                                className="form-control checkout-email-input"
                                value={seller?.email}
                            />
                        </div>
                    </div>
                    <div className="personal-input">
                        <label htmlFor="">Phone Number</label>
                        <div className="personal-relative">
                            <input name="phone" className="form-control" type="tel" placeholder="+062-6532956" />
                        </div>
                    </div>

                </div>
                
            </div>


            <div className="form-group">
                <div className="checkout-button-group">
                    <div className="personal-input">
                        <Link
                            className="checkout-button-link"
                            href="/"
                        >
                            <span style={{ width: '20px', height: '20px' }}>
                                <svg
                                    style={{ verticalAlign: 'unset' }}
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    viewBox="0 0 512 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={32}
                                        d="M112 160l-64 64 64 64"
                                    />
                                    <path
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={32}
                                        d="M64 224h294c58.76 0 106 49.33 106 108v20"
                                    />
                                </svg>
                            </span>
                            Reset Application
                        </Link>
                    </div>
                    <div className="personal-input">
                        <button
                            type="submit"
                            disabled=""
                            className="confirm-order-button d-flex align-items-center gap-2"
                        >
                            Send Application

                            <span style={{ width: '20px', height: '20px' }}>
                                <svg
                                    style={{ verticalAlign: 'unset' }}
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    viewBox="0 0 512 512"
                                    height="20px"
                                    width="20px"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={48}
                                        d="M268 112l144 144-144 144m124-144H100"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>

            </div>

        </form>
    );
};

export default SellerForm;