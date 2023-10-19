import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PaymentSuccess = ({ TxID }) => {
    const [token, setToken] = useState(null)
    const user = useSelector((state) => state?.auth?.user);
    const [paymentErrorUi, setPaymentErrorUi] = useState(false)
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isLoaing, setIsLoading] = useState(false);
    const url = `http://localhost:8080/api/v1/payment/check-payment?transactionId=${TxID}&token=${token}`
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setToken(token)
    }, [])
    useEffect(() => {
        setIsLoading(true)
        if (TxID !== '[trixId]' && token) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log({ paymentErrorUi, paymentSuccess, status: data?.payment, url });
                    if (data?.payment === true) {
                        setPaymentSuccess(true);
                        setPaymentErrorUi(false)
                    }
                    if (data?.payment === false) {
                        setPaymentErrorUi(true)
                        setPaymentSuccess(false);
                    }

                    setIsLoading(false);
                    console.log({ paymentErrorUi, paymentSuccess, status: data?.payment, url });
                })
                .catch(error => {
                    console.error(error);
                    setIsLoading(false)
                });
        }
    }, [TxID])

    const handleNavigateHomepage = () => {
        router.push(`/`)
    }
    const handleShowInvoice = () => {
        router.push(`/`)
    }


    return (
        <>
            {isLoaing ?
                <div className='payment-success-container'>
                    <div className='payment-content'>
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div> :
                <div className="payment-success-container">
                    {paymentSuccess === true && paymentErrorUi === false && <div className="payment-content">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                            alt="success"
                        />
                        <div className='details'>
                            <h1>Payment received</h1>
                            <p className='name'>Hi Md Altaf Hossen,</p>
                            <p className='status'>Your transaction was successful !!</p>
                            <p>Order Id : #056784</p>
                            <h6>Transaction Id: {TxID}</h6>
                        </div>
                        <div>
                            <button onClick={handleShowInvoice}>Show Order Details</button>
                        </div>
                    </div>}
                    {paymentErrorUi === true && paymentSuccess === false && <div className="payment-content">
                        <img
                            src="https://img.icons8.com/3d-fluency/100/close-window.png"
                            alt="error"
                        />
                        <div className='details'>
                            <h1 className='text-danger'>Sorry. You cannot see this !!</h1>
                            <p></p>
                        </div>
                        <div>
                            <button onClick={handleNavigateHomepage}>Back To Home</button>
                        </div>
                    </div>}
                </div>}
        </>
    );
};

export default PaymentSuccess;