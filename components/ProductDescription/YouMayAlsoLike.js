import { Link, Rating, useMediaQuery } from '@mui/material';
import React from 'react';
import Image from "next/image";
import DiscountProductCard from '../Product/DiscountProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Loading from '../Shared/Loading/Loading';
import Skeleton from 'react-loading-skeleton';

const YouMayAlsoLike = ({ allDataLoading, product, products }) => {
    const dataP = products?.filter(pro => pro?.category?.category === product?.category?.category)


    const { code: currency, rate: currencyRate } = useSelector(
        (state) => state.currency
    );

    let productPrice;
    if (currencyRate) {
        productPrice = (product?.price * currencyRate).toFixed(2);
    }
    const discountPercentage =
        ((product?.oldPrice - product?.price) / product?.oldPrice) * 100;
    // const [token, setToken] = useState();
    // const [cartProduct, setCartProduct] = useState({});
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.auth?.user);
    const router = useRouter();
    // useEffect(() => {
    //   const token = localStorage.getItem("accessToken");
    //   setToken(token);
    // }, []);

    // const [addProductToCart, { data, isSuccess, isLoading }] =
    //   useAddToCartMutation();
    const handleAddToCart = (product) => {
        //   const alreadyAdded = !!user?.cart?.find(
        //     (item) => item?.product?._id === product?._id
        //   );
        //   console.log(alreadyAdded);
        //   if (user?.email) {
        //     if (alreadyAdded) {
        //       return toast.error("Product already added to cart!!!", {
        //         id: "addToCart",
        //       });
        //     }
        //     setCartProduct(product);
        //     addProductToCart({ token, userId: user?._id, product: product?._id });
        //   }
        //   if (!user?.email) {
        //     toast.error("Please, Login first !!!", { id: "addToCart" });
        //   }

        //   ----------------------------------------------------------

        const cartProducts = localStorage.getItem("cartProducts");
        if (cartProducts) {
            const cart = JSON.parse(localStorage.getItem("cartProducts"));
            const index = cart?.findIndex(
                (cartProduct) => cartProduct?.id === product?._id
            );
            if (index !== -1) {
                cart[index].quantity += 1;
                toast.success("Updated Quantity", { id: "addToCart" });
            } else {
                cart.push({ id: product?._id, quantity: 1 });
                toast.success("Added to cart", { id: "addToCart" });
            }
            localStorage.setItem("cartProducts", JSON.stringify(cart));
        }
        if (!cartProducts) {
            const cart = [{ id: product?._id, quantity: 1 }];
            localStorage.setItem("cartProducts", JSON.stringify(cart));
            toast.success("Added to cart", { id: "addToCart" });
        }

        dispatch(addToCart({ id: product?._id }));
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
                                                                    <span className="item-price">
                                                                        {(d?.price * currencyRate).toFixed(2)}
                                                                        <span className='ms-1'>{currency}</span>

                                                                    </span>
                                                                </div>
                                                                <div className="old-price">
                                                                    <del>
                                                                        {(d?.oldPrice * currencyRate).toFixed(2)} {currency}
                                                                    </del>
                                                                    <span className="ms-2"> - {(((d?.oldPrice - d?.price) / d?.oldPrice) * 100).toFixed(2)}%</span>
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
                                                                    <button
                                                                        className="cart-btn w-100 "
                                                                        onClick={() => handleAddToCart(d)}
                                                                    >
                                                                        Add to Cart
                                                                        <i className="far plus-ico fa-plus-square text-white"></i>
                                                                    </button>
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