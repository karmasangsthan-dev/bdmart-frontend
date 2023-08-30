import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useInactiveSellerDetailsSubmitMutation } from '../../features/auth/authApi';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const SellerForm = () => {
    const seller = useSelector((state) => state.auth.seller);
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();
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

    const toggleApplication = () => {
        setShowForm(!showForm);
    }

    // event handler for submit seller data 
    const handleSubmitSellerData = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const formData = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email,
            phone: e.target.phone.value,
            address: e.target.address.value,
            country: e.target.country.value,
            companyName: e.target.companyName.value,
            businessType: e.target.businessType.value,
            businessMember: e.target.businessMember.value,
            businessDesc: e.target.businessDesc.value,
        };


        inactiveSellerDetailsSubmit({ email, formData })
    };

    useEffect(() => {
        if (isLoading) {
            toast.loading('Loading...', { id: 'inactiveSellerDetailsSubmit' });
        }
        if (isSuccess) {
            toast.success('Success', { id: 'inactiveSellerDetailsSubmit' });
            setShowForm(false);
        }
        if (isError) {
            toast.error(error?.data?.error, { id: 'inactiveSellerDetailsSubmit' });
        }
    }, [isSuccess,isError, error, isLoading]);



    return (
        <div className="dashbord-content-preview">
            <div className="dash-overflow-hidden">
                <div className='d-flex justify-content-center'>
                    {seller?.verification?.status === 'default' &&
                        <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/high-priority.png" alt="high-priority" />
                    }
                    {seller?.verification?.status === 'pending' &&
                        <img width="50" height="50" src="https://img.icons8.com/color/48/speech-bubble-with-dots.png" alt="high-priority" />
                    }
                </div>

                {seller?.verification?.status === 'default' && <p className='text-danger text-center mt-2'>Your account was not verified !! Please fill up all details about you and your company.</p>}
                {seller?.verification?.status === 'pending' && <p className='text-success text-center mt-2 mb-4'>Your seller application has been successfully submitted. <br /> We will review your application shortly <br /> and please wait for the confirmation email. It will take maximum 48 hours ... </p>}

                {
                    seller?.verification?.status === 'pending' && <div>
                        <button onClick={toggleApplication} className='see-your-application-btn'>{showForm ? 'Hide' : 'Show'} your application</button>
                    </div>
                }

                
                {
                    showForm || seller?.verification?.status === 'default' ? <div>
                        <div className="checkout-container " style={{ paddingLeft: '0.5rem', paddingRight: '0.5rems' }}>
                            <div className="d-flex checkout-full-content">
                                <div style={{ width: '100%' }} className="checkout-left-side">
                                    <div className="left-content">
                                        <form onSubmit={handleSubmitSellerData}>
                                            <div className="form-group">
                                                <h5 className='mb-3'>Personal Information :</h5>
                                                <div className="personal-content">

                                                    <div className="personal-input">
                                                        <label htmlFor="">First Name</label>
                                                        <div className="personal-relative">
                                                            <input name="firstName"
                                                                className="form-control"
                                                                type="text" placeholder="John" defaultValue={seller?.verification?.submittedData?.firstName} disabled={seller?.verification?.status !== 'default'} />
                                                        </div>
                                                    </div>
                                                    <div className="personal-input">
                                                        <label htmlFor="">Last Name</label>
                                                        <div className="personal-relative">
                                                            <input className="form-control" name="lastName" type="text" placeholder="Doe" defaultValue={seller?.verification?.submittedData?.lastName} disabled={seller?.verification?.status !== 'default'} />
                                                        </div>
                                                    </div>
                                                    <div className="personal-input">
                                                        <label htmlFor="email">Email address</label>
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
                                                        <label htmlFor="phone">Phone Number</label>
                                                        <div className="personal-relative">
                                                            <input id='phone' name="phone" className="form-control" type="tel" placeholder="+062-6532956" disabled={seller?.verification?.status !== 'default'} defaultValue={seller?.verification?.submittedData?.phone} />
                                                        </div>
                                                    </div>
                                                    <div className="personal-input">
                                                        <label htmlFor="address">Your Address</label>
                                                        <div className="personal-relative">
                                                            <input id='address' name="address" className="form-control" type="address" placeholder="+123 your address here " defaultValue={seller?.verification?.submittedData?.address} disabled={seller?.verification?.status !== 'default'} />
                                                        </div>
                                                    </div>
                                                    <div className="personal-input">
                                                        <label htmlFor="country">Country</label>
                                                        <div className="personal-relative">
                                                            <input id='country' name="country" className="form-control" type="text" placeholder="Enter your country" disabled={seller?.verification?.status !== 'default'} defaultValue={seller?.verification?.submittedData?.country} />
                                                        </div>
                                                    </div>


                                                </div>
                                                <h5 className='mt-5'>Business Information :</h5>
                                                <div className="personal-content mt-3">
                                                    <div className="personal-input">
                                                        <label htmlFor="company-name">Company Name</label>
                                                        <div className="personal-relative">
                                                            <input id='company-name' name="companyName" className="form-control" type="text" placeholder="Your company name here" disabled={seller?.verification?.status !== 'default'} defaultValue={seller?.verification?.submittedData?.companyName} />
                                                        </div>
                                                    </div>
                                                    <div className="personal-input">
                                                        <label htmlFor="business-type">Business Type</label>
                                                        <div className="personal-relative">
                                                            <input id='business-type' name="businessType" className="form-control" type="text" placeholder="eg : electronics" disabled={seller?.verification?.status !== 'default'} defaultValue={seller?.verification?.submittedData?.businessType} />
                                                        </div>
                                                    </div>
                                                    <div className="personal-input">
                                                        <label htmlFor="business-member">Business Member</label>
                                                        <div className="personal-relative">
                                                            <input id='business-member' name="businessMember" className="form-control" type="text" placeholder="How many member in your company" disabled={seller?.verification?.status !== 'default'} defaultValue={seller?.verification?.submittedData?.businessMember} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="personal-content mt-3" style={{ gridTemplateColumns: "repeat(1, minmax(0, 1fr))" }}>
                                                    <div className="personal-input">
                                                        <label htmlFor="business-desk">Business Description</label>
                                                        <div className="personal-relative">
                                                            <textarea id='business-desk' name="businessDesc" className="form-control" type="text" placeholder="Tell me about your business" disabled={seller?.verification?.status !== 'default'} defaultValue={seller?.verification?.submittedData?.businessDescription} />
                                                        </div>
                                                    </div>

                                                </div>
                                                <h5 className='mt-5'>Legal Documents :</h5>
                                                <div className="personal-content mt-3">
                                                    <div className="personal-input">
                                                        <label>Your NID Photo</label>
                                                        <div className="personal-relative">
                                                            <input type="file" className='form-control' placeholder='Enter your NID photo' />
                                                        </div>
                                                    </div>
                                                    <div className="personal-input">
                                                        <label>Company Trade License</label>
                                                        <div className="personal-relative">
                                                            <input type="file" className='form-control' placeholder='Enter your NID photo' />
                                                        </div>
                                                    </div>
                                                    <div className="personal-input">
                                                        <label>Your Driving License</label>
                                                        <div className="personal-relative">
                                                            <input type="file" className='form-control' placeholder='Enter your NID photo' />
                                                        </div>
                                                    </div>
                                                    <div className="personal-input">
                                                        <label>Your Passport</label>
                                                        <div className="personal-relative">
                                                            <input type="file" className='form-control' placeholder='Enter your NID photo' />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>


                                            <div className="form-group">
                                                <div className="checkout-button-group">
                                                    <div className="personal-input">
                                                        {seller?.verification?.status !== 'pending' ? <Link
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
                                                        </Link> : <p
                                                            className="checkout-button-link"
                                                            onClick={() => toast.error('Please contact our support team for cancel application...!!')}
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
                                                            Cancel Application
                                                        </p>}
                                                    </div>
                                                    <div className="personal-input">
                                                        {
                                                            seller?.verification?.status === 'default' && <button
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
                                                        }
                                                        {
                                                            seller?.verification?.status === 'pending' && <button
                                                                type="submit"
                                                                disabled
                                                                className="seller-under-review-btn d-flex align-items-center gap-2"
                                                            >
                                                                Application under review

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
                                                        }
                                                    </div>
                                                </div>

                                            </div>

                                        </form >
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> :<></>
                }
            </div>
        </div>
    );
};

export default SellerForm;