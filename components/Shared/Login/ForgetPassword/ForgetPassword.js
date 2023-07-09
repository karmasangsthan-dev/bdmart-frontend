import React, { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-hot-toast';

const ForgetPassword = () => {
    const [isValid, setIsValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [email, setEmail] = useState('');
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const handleCaptchaChange = (value) => {
        setIsValid(true);
    }

    useEffect(() => {
        const data = emailRegex.test(email);
        setEmailValid(data);
    }, [email])

    const handleForgetPassword = () => {
        if (email === '') {
            toast.error("Please enter your email address...!!")
        }
        else if (email && emailValid === false) {
            toast.error("Please enter valid email address...!!")
        }
        else {
            toast.success("Email send successful... Please check your email")
        }

    }


    return (
        <div className='container' >
            <h4 className='py-3'>Forgot your password?
            </h4>
            <div className='p-5' style={{ backgroundColor: '#fff', minHeight: '50vh' }}>
                <p>Enter your email address below and we’ll send you a link to reset your password
                </p>
                <div className='mt-3'>
                    <label htmlhtmlFor="name">Your Email:</label>
                    <input
                        style={{ border: emailValid ? '1px solid #dee2e6' : email && '1px solid red' }}
                        onChange={(e) => setEmail(e.target.value)}
                        className={` form-control w-100 px-3 py-2 mb-3 mt-2`}
                        name="email"
                        type="text"
                        placeholder='Enter your email adreess'
                    />
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_KAPTCHA_SITE_KEY}
                        onChange={handleCaptchaChange}
                    />,
                    <div className='update-profile-button-container' style={{ justifyContent: 'flex-start' }}>

                        {
                            isValid ? <button onClick={handleForgetPassword} className='update-profile-button' type='submit'>Send Link</button> : <button className='disable-profile-button' type='submit'>Send Link</button>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;