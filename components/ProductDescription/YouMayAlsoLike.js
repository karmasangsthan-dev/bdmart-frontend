import { Link, Rating, useMediaQuery } from '@mui/material';
import React from 'react';
import Image from "next/image";
import DiscountProductCard from '../Product/DiscountProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Loading from '../Shared/Loading/Loading';
import Skeleton from 'react-loading-skeleton';
import { getProductPriceRangeDetails, getProductPriceRangeForCard, getShopPageProductDiscountLowestHighestPrice } from '../../helperHooks/getProductPriceRange';
import toast from 'react-hot-toast';
import { addToCart } from '../../features/cart/cartSlice';
import { useHandleAddToCart } from '../../helperHooks/handleAddToCart';
import { getProductOldPriceRange } from '../../helperHooks/getProductOldPriceRange';

const YouMayAlsoLike = ({ allDataLoading, product, products }) => {
    const newDatap = products?.filter(pro => pro?.category?.category === product?.category?.category);

    const dataP = newDatap.filter(allPro => allPro._id !== product?._id)

    const { code: currency, rate: currencyRate } = useSelector(
        (state) => state.currency
    );

    let productPrice;
    if (currencyRate) {
        productPrice = (product?.price * currencyRate).toFixed(2);
    }

    const dispatch = useDispatch();
    const router = useRouter();

    const productAddToCart = (product) => {


        useHandleAddToCart({
            product,
            selectedSize: product?.variants[0]?.size,
            variantId: product?.variants[0]._id,
            quantity: 1,
            dispatch,
        });
    };
    const isLargeDevice = useMediaQuery('(min-width: 992px)');

    const productsLimit = isLargeDevice ? 5 : 6;





    return (
        <div className='pb-5'>
            <h4 className="text-center my-4">You May Also Like</h4>

            <div className="shop page-content">
                <div className="">
                    <div className="row gap-4">
                        <div className="col-lg-12">
                            <div className="products ">
                                {
                                    allDataLoading ? (
                                        <div className="you-may-also-like-loading-container">
                                            {[1, 2, 3, 4, 5].map((elem, i) => {
                                                return (
                                                    <div
                                                        key={i}
                                                        className="border shadow rounded loading-card-content"

                                                    >
                                                        <Skeleton
                                                            className="d-flex mx-auto mt-2"
                                                            style={{
                                                                width: "92%",
                                                                minHeight: "188px",
                                                                maxHeight: "189px",
                                                            }}
                                                        />
                                                        <div className="product-details-card p-2">
                                                            <div
                                                                style={{ marginTop: "-14px" }}
                                                                className="product-title "
                                                            >
                                                                <span>
                                                                    <Skeleton />
                                                                </span>
                                                            </div>
                                                            <div className="product-price">
                                                                <p className="mb-0 ">
                                                                    <Skeleton style={{ width: "50px" }} />
                                                                </p>
                                                            </div>
                                                            <div className="old-price">
                                                                <del style={{ display: "inline-block" }}>
                                                                    <Skeleton style={{ width: "50px" }} />
                                                                </del>
                                                                <span className="ms-1">
                                                                    <Skeleton style={{ width: "30px" }} />
                                                                </span>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <Skeleton style={{ width: "80px" }} />
                                                                <Skeleton
                                                                    className="ms-1"
                                                                    style={{ width: "30px" }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="shop-product-details ">
                                            {dataP?.slice(0, productsLimit)
                                                .map((d, index) => {



                                                    const { highestPrice, lowestPrice } = getProductPriceRangeDetails(d);



                                                    const { highestOldPrice, lowestOldPrice } = getProductOldPriceRange(
                                                        d
                                                    );
                                                    console.log({ highestPrice, lowestPrice });
                                                    return (
                                                        <div className="mb-3 " key={index}>
                                                            <div className="product-link bestselling-product-container  border p-3 rounded shadow bg-white">
                                                                <div className="">
                                                                    <img
                                                                        onClick={() => router.push(`/productDetails/${d._id}`)}
                                                                        className=""
                                                                        style={{ width: "100%", height: "100%" }}
                                                                        src={d?.thumbnail}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <p
                                                                    onClick={() => router.push(`/productDetails/${d._id}`)}
                                                                    style={{ minHeight: "42px", cursor: "pointer" }}
                                                                    className="item-name mt-2 mb-0 text-capitalize"
                                                                >
                                                                    {d?.title?.length > 30
                                                                        ? `${d?.title?.slice(0, 30)} ...`
                                                                        : d?.title}
                                                                </p>

                                                                <div className="d-flex justify-content-between align-items-center">

                                                                    {d?.variants.length === 1 ? <span className="item-price">
                                                                        <>
                                                                            {(highestPrice * currencyRate).toFixed(2)}
                                                                            <span className='ms-1'>{currency}</span>
                                                                        </>
                                                                    </span> : <span className="item-price">
                                                                        {(lowestPrice * currencyRate).toFixed(2)}

                                                                        <>
                                                                            {' - '}
                                                                            {(highestPrice * currencyRate).toFixed(2)}
                                                                            <span className='ms-1'>{currency}</span>
                                                                        </>
                                                                    </span>}
                                                                </div>
                                                                <div className="old-price">
                                                                    <del>
                                                                        {(lowestOldPrice * currencyRate).toFixed(2)}
                                                                    </del> {' '}
                                                                    {d?.variants?.length !== 1 && (
                                                                        <>
                                                                            <span>{' - '}</span>
                                                                            <del>
                                                                                {(highestOldPrice * currencyRate).toFixed(2)}
                                                                            </del>{' '}
                                                                            {currency}</>
                                                                    )}
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <Rating
                                                                        style={{ fontSize: "15px", marginLeft: "-3px" }}
                                                                        name="read-only"
                                                                        value={parseInt(d?.rating || 5)}
                                                                        readOnly
                                                                    />
                                                                    <p className="mb-0 ms-1" style={{ fontSize: "13px" }}>
                                                                        ({parseInt(d?.rating || 5)})
                                                                    </p>
                                                                </div>
                                                                <div id="">
                                                                    {d?.variants?.length > 1 ? (
                                                                        <button
                                                                            onClick={() => router.push(`/productDetails/${product?._id}`)}
                                                                            className="cart-btn-see-options w-100 "
                                                                        >
                                                                            Select options
                                                                            <i className="far plus-ico fa-plus-square text-white"></i>
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            className="cart-btn w-100 "
                                                                            onClick={() => productAddToCart(product)}
                                                                        >
                                                                            Add to Cart
                                                                            <i className="fa-solid plus-ico fa-cart-shopping text-white"></i>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                    );
                                                })}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YouMayAlsoLike;