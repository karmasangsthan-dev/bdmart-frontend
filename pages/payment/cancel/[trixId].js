import React from 'react';
import PaymentCancel from '../../../components/Payments/PaymentCancel';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';

const index = () => {
    const router = useRouter();

    const TxIDFull = router.asPath.split('/')[3];
    const TxID = TxIDFull.split('TxID')[1];
    const handleOrderOpen = () => {
        router.push('/user/my-orders')
    }
    return (
        <Layout>
            <PaymentCancel></PaymentCancel>
        </Layout>
    );
};

export default index;