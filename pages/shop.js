import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Rating, Slider } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { Button, Collapse } from 'react-bootstrap';
import ShopProduct from '../components/Product/ShopProduct';

export async function getServerSideProps(context) {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    return {
        props: {
            data
        }
    };
}

const shop = ({ data }) => {
    

    return (
        <Layout>
            <div>
                <div className="shop page-content">
                    <div className="container">
                        <div className="row gap-4">

                            <div className="col-lg-9">
                                <div className="widget widget-clean justify-content-between">
                                    <span>Showing 4 of 4 Products</span>
                                    <div>
                                        <span>Sort by:</span>

                                    </div>
                                </div>
                                <div className="products">
                                    <div className="shop-products">
                                        {
                                            data?.products?.map((d) => {
                                                return (
                                                    <div key={d?.id} className='shop-single-product'>
                                                        <figure className='product-media'>
                                                            <span className="product-label label-top">Top</span>
                                                            <Link style={{ marginTop: '-21px' }} href='/shop'>
                                                                <div style={{ width: '217px', height: '217px' }}>
                                                                    <Image
                                                                        width={217}
                                                                        height={217}
                                                                        src={d?.thumbnail}
                                                                        className=""
                                                                        alt=""

                                                                    />

                                                                    <button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        toast.success('product added in cart');

                                                                    }} className='shop-add-to-cart-button'>Add to Cart<i class="far plus-ico fa-plus-square" aria-hidden="true"></i></button>



                                                                </div>
                                                            </Link>
                                                        </figure>
                                                        <div className="product-body">
                                                            <div className="product-cat">
                                                                <Link href="/shop/?category=fruit">
                                                                    {d?.category}
                                                                </Link>
                                                            </div>
                                                            <div className="product-title">
                                                                <Link href="/shop/?category=fruit">
                                                                    {d?.title}
                                                                </Link>
                                                            </div>
                                                            <div className="product-price d-flex gap-2 justify-content-center">
                                                                <div className="new-price">
                                                                    <p>${d?.price}</p>
                                                                </div>
                                                                <div className="shop-old-price">
                                                                    <p>$45</p>
                                                                </div>
                                                            </div>
                                                            <div className="ratings-container mb-3">
                                                                <div className="ratings">
                                                                    <Rating name="read-only" value={parseInt(d?.rating)} readOnly />
                                                                </div>
                                                                <div className="ratings-texts">
                                                                    ( 2 Reviews )
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            </div>
                            <ShopProduct data={data}></ShopProduct>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default shop;
