import React from 'react';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import PaymentSuccess from '../../../components/Payments/PaymentSuccess';

const paymentSuccessPage = () => {
    const router = useRouter();

    const TxIDFull = router.asPath.split('/')[3];
    const TxID = TxIDFull.split('TxID')[0];
    const handleOrderOpen = () => {
        router.push('/user/my-orders')
    }
    
    return (
        <Layout>
            <PaymentSuccess TxID={TxID}></PaymentSuccess>
        </Layout>
    );
};

export default paymentSuccessPage;