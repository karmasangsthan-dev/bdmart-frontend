import React from 'react';
import Layout from '../../../components/Layout';
import PaymentFailed from '../../../components/Payments/PaymentFailed';
import { useRouter } from 'next/router';

const failedPayment = () => {
    const router = useRouter();

    const TxIDFull = router.asPath.split('/')[3];
    const TxID = TxIDFull.split('TxID')[1];
    const handleOrderOpen = () => {
        router.push('/user/my-orders')
    }
    return (
        <Layout>
            <PaymentFailed TxID={TxID}></PaymentFailed>
        </Layout>
    );
};

export default failedPayment;