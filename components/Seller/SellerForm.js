import Link from 'next/link';
import React from 'react';
import { useInactiveSellerDetailsSubmitMutation } from '../../features/auth/authApi';

const SellerForm = ({ seller }) => {
    const [
        inactiveSellerDetailsSubmit,
        {
            data,
            isLoading,
            isSuccess,
            isError,
            error,
        },
    ] = useInactiveSellerDetailsSubmitMutation();


    // event handler for submit seller data 
    const handleSubmitSellerData = (e) => {
        e.preventDefault();

        const formData = {
            fullName: e.target.firstName.value + " " + e.target.lastName.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
        };

        console.log('Form data:', formData);

        inactiveSellerDetailsSubmit(formData)
    };


    return (
        <form onSubmit={handleSubmitSellerData}>
            <div className="form-group">
                <h5 className='mb-3'>Personal Information :</h5>
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
                    <div className="personal-input">
                        <label htmlFor="address">Your Address</label>
                        <div className="personal-relative">
                            <input id='address' name="address" className="form-control" type="address" placeholder="+123 your address here " />
                        </div>
                    </div>
                    <div className="personal-input">
                        <label htmlFor="country">Country</label>
                        <div className="personal-relative">
                            <input id='country' name="country" className="form-control" type="text" placeholder="Enter your country" />
                        </div>
                    </div>


                </div>
                <h5 className='mt-5'>Business Information :</h5>
                <div className="personal-content mt-3">
                    <div className="personal-input">
                        <label htmlFor="business-desk">Business Type</label>
                        <div className="personal-relative">
                            <input id='business-type' name="businessType" className="form-control" type="text" placeholder="eg:electronics" />
                        </div>
                    </div>
                    <div className="personal-input">
                        <label htmlFor="business-member">Business Member</label>
                        <div className="personal-relative">
                            <input id='business-member' name="businessMember" className="form-control" type="text" placeholder="How many member in your company" />
                        </div>
                    </div>
                </div>

                <div className="personal-content mt-3" style={{ gridTemplateColumns: "repeat(1, minmax(0, 1fr))" }}>
                    <div className="personal-input">
                        <label htmlFor="business-desk">Business Description</label>
                        <div className="personal-relative">
                            <textarea id='business-desk' name="businessDesc" className="form-control" type="text" placeholder="Tell me about your business" />
                        </div>
                    </div>

                </div>
                <h5 className='mt-5'>Legal Documents :</h5>
                <div className="personal-content mt-3">
                    <div className="personal-input">
                        <label>Your NID Photo</label>
                        <div className="personal-relative">
                            <input type="file" className='form-control' placeholder='Enter your NID photo'/>
                        </div>
                    </div>
                    <div className="personal-input">
                        <label>Company Trade License</label>
                        <div className="personal-relative">
                            <input type="file" className='form-control' placeholder='Enter your NID photo'/>
                        </div>
                    </div>
                    <div className="personal-input">
                        <label>Your Driving License</label>
                        <div className="personal-relative">
                            <input type="file" className='form-control' placeholder='Enter your NID photo'/>
                        </div>
                    </div>
                    <div className="personal-input">
                        <label>Your Passport</label>
                        <div className="personal-relative">
                            <input type="file" className='form-control' placeholder='Enter your NID photo'/>
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

        </form >
    );
};

export default SellerForm;