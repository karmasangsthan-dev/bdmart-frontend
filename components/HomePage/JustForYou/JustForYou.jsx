import React from 'react';
import { useGetAllProductsQuery } from '../../../features/product/productApi';
import { Rating } from '@mui/material';
import Skeleton from 'react-loading-skeleton';

const JustForYou = () => {
    const { data, isLoading } = useGetAllProductsQuery();

    return (
        <div>
            <div className="">
                <div className="col-lg-12 col-md-12 col-sm-12 w">
                    <div className="gal-head">
                        <h2>Just For You</h2>
                    </div>
                </div>
            </div>
            <div style={{ maxWidth: '1240px' }} className='mx-auto '>
                <div className='all-products-container'>
                    {
                        isLoading ? (
                            < >
                                {
                                    Array(6).fill().map((p, i) => {
                                        return (
                                            <div key={i} className='border shadow ' style={{
                                                width: "189px", minHeight: "189px", background: "#fff", height: "100%"
                                            }}>
                                                <Skeleton className='d-flex mx-auto mt-2' style={{ width: '92%', minHeight: '188px', maxHeight: "189px" }} />
                                                <div className="product-details-card p-2">
                                                    <div style={{ marginTop: '-14px' }} className="product-title ">
                                                        <span><Skeleton></Skeleton></span>
                                                    </div>
                                                    <div className="product-price">
                                                        <p className='mb-0 '><Skeleton style={{ width: '50px' }}></Skeleton></p>
                                                    </div>
                                                    <div className="old-price">
                                                        <del style={{ display: 'inline-block' }}><Skeleton style={{ width: '50px' }}></Skeleton></del><span  className='ms-1'><Skeleton style={{ width: '30px' }}></Skeleton></span>
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <Skeleton style={{ width: '80px' }}></Skeleton>
                                                        <Skeleton className='ms-1' style={{ width: '30px' }}></Skeleton>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                                
                            </>
                        ) : (
                            data?.data?.map((product) => {
                                return (
                                    <div className='border shadow ' style={{
                                        width: "189px", minHeight: "189px", background: "#fff", height: "100%"
                                    }}>
                                        <div>
                                            <img style={{ minHeight: '189px', maxHeight: '189px' }} className='w-100 h-100' src={product?.thumbnail} alt="" />
                                        </div>
                                        <div className="product-details-card p-2">
                                            <div className="product-title">
                                                <span>{product?.title?.length > 37 ? `${product?.title.slice(0, 40)} ...` : product?.title}</span>
                                            </div>
                                            <div className="product-price">
                                                <p className='mb-0 '>${product?.price}</p>
                                            </div>
                                            <div className="old-price">
                                                <del>30.00$</del><span className='ms-2'>-{product?.discountPercentage}%</span>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <Rating
                                                    style={{ fontSize: '15px', marginLeft: '-3px' }}
                                                    name="read-only"
                                                    value={product?.rating}
                                                    readOnly
                                                />
                                                <p className='mb-0 ms-1' style={{ fontSize: '13px' }}>(30)</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div >
    );
};

export default JustForYou;