import React from 'react';
import Layout from '../../components/Layout';
import { useGetSectionBasedProductsQuery } from '../../features/product/productApi';
import { Rating } from '@mui/material';
import Image from 'next/image';
import SellerLayoutDashboard from '../../components/Seller/SellerLayoutDashboard';

const MyProducts = () => {
    const { data, isLoading } = useGetSectionBasedProductsQuery({
        section: "bestSelling",
    });
    return (
        <Layout title='My Products | Seller Account | Bangladesh Mart'>
            <SellerLayoutDashboard >
                <h2 className='dash-content-heading'>My Products</h2>

                <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
                    {
                        data?.data.map((product) => {
                            return <div className="mb-3 mobile-product-card" key={product?._id}>
                                <div className="product-link bestselling-product-container product-card-shop border p-3 rounded shadow">
                                    <div className="">
                                        <Image
                                            layout="responsive"
                                            width={100}
                                            height={100}
                                            objectFit="contain"
                                            alt="Picture of the author"
                                            src={product?.thumbnail}
                                        />
                                    </div>
                                    <p
                                        onClick={() => router.push(`/productDetails/${product._id}`)}
                                        style={{ minHeight: '42px', cursor: 'pointer' }}
                                        className="item-name mt-2 mb-0 text-capitalize"
                                    >
                                        {product?.title?.length > 30
                                            ? `${product?.title?.slice(0, 30)} ...`
                                            : product?.title}
                                    </p>

                                    {/* <div className="d-flex justify-content-between align-items-center">
                                        <span className="item-price">
                                            $10
                                        </span>
                                    </div>
                                    <div className="old-price">
                                        <del>
                                            20
                                        </del>
                                        <span className="ms-2"> - 50%</span>
                                    </div> */}
                                    <div className="d-flex align-items-center">
                                        <Rating
                                            style={{ fontSize: '15px', marginLeft: '-3px' }}
                                            name="read-only"
                                            value={3}
                                            readOnly
                                        />
                                        <p className="mb-0 ms-1" style={{ fontSize: '13px' }}>
                                            (10)
                                        </p>
                                    </div>
                                    <div>
                                        <span className='item-price'>Stock : 20</span>
                                    </div>
                                    <div id="">
                                        <button
                                            className="cart-btn w-100 "
                                        >
                                            Show Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </SellerLayoutDashboard>
        </Layout>
    );
};

export default MyProducts;