import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../../components/Layout';
import { useGetSingleOrderByIdQuery } from '../../../features/product/productApi';
import Loading from '../../../components/Shared/Loading/Loading';

const Order = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        query: { order },
    } = router;

    const { data, isLoading: orderLoading } = useGetSingleOrderByIdQuery(order);


    return (
        <Layout title='Order'>
            {
                orderLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className='order-container'>
                        <h4 className='text-center'>This page right now under development ...!!</h4>
                    </div>
                )
            }
        </Layout>
    );
};

export default Order;