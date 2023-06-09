import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Breadcrumbs, Link, Rating } from "@mui/material";
import { Breadcrumb, Form, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import Image from "next/image";
import {
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
} from "../../features/product/productApi";
import ProductDescription from "../../components/ProductDescription/ProductDescription";
import Footer from "../../components/Shared/Footer/Footer";
import NotFoundPage from "../404";
import Loading from "../../components/Shared/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import Slider from "react-slick";
import ProductReviewSection from "../../components/ProductDescription/ProductReviewSection";
import ShareProduct from "../../components/ProductDescription/ShareProduct";
import DeleveryAndService from "../../components/ProductDescription/DeleveryAndService";
import MobileShareProduct from "../../components/ProductDescription/MobileShareProduct";
import YouMayAlsoLike from "../../components/ProductDescription/YouMayAlsoLike";
import ProductQuestionAnswer from "../../components/ProductDescription/ProductQuestionAnswer";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button
        style={{ width: "30px", height: "30px", top: "33%" }}
        className="next"
      ></button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button
        style={{ width: "30px", height: "30px", top: "33%" }}
        className="prev"
      ></button>
    </div>
  );
};

const productNo = () => {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    query: { productNo = "648106e4461f21c48500d099" },
  } = router;

  const { data: allData, isLoading: allDataLoading } = useGetAllProductsQuery();
  const { data, isLoading } = useGetProductDetailsQuery(productNo);
  const { code: currency, rate: currencyRate } = useSelector(
    (state) => state.currency
  );
  const [displayImage, setDisplayImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const product = data?.data || {};
  const products = allData?.data || [];

  function handleClick(event) {
    event.preventDefault();
  }

  let productPrice;
  if (currencyRate) {
    productPrice = (product?.price * currencyRate).toFixed(2);
  }
  const discountPercentage =
    ((product?.oldPrice - product?.price) / product?.oldPrice) * 100;
  const handleAddToCart = (product) => {

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
  const scrollToReviews = () => {
    const productReviewSection = document.getElementById(
      "productReviewSection"
    );
    const offset = 157;

    const targetScrollTop = productReviewSection.offsetTop - offset;

    window.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });
  };

  const buttonStyle = {
    backgroundColor: "rgb(179 48 61)",
    borderColor: "rgb(179 48 61)",
    color: "#ffffff",
    padding: "0.375rem 0.75rem",
    fontSize: "1rem",
    minWidth: "214px ",
    height: "38px",
    borderRadius: "0.25rem",
    cursor: "not-allowed",
    opacity: "0.65",
  };
  const handleQunatityIncrement = (id) => {
    setQuantity(quantity + 1);
  };
  const handleQunatityDecrement = (id) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!data?.status) {
    return <NotFoundPage></NotFoundPage>;
  }

  return (
    <Layout title={`${product?.title ? product?.title : ""} Bangladesh Mart`}>
      <main className="mainnnnn" style={{background: '#eff0f5'}}>
        {data?.status && (
          <div
            style={{ minHeight: "120vh", maxWidth: "1200px" }}
            className="container "
          >
            <div
            
              style={{ marginTop: "-15px", marginBottom: "5px" }}
              role="presentation"
              onClick={handleClick}
            >

              <Breadcrumb className="breadcrumb-container">
                <Breadcrumb.Item onClick={() => router.push('/')}>Home</Breadcrumb.Item>
                <Breadcrumb.Item href="">
                  Description
                </Breadcrumb.Item>
                <Breadcrumb.Item className="d-lg-block d-sm-none" >{product?.title}</Breadcrumb.Item>
                <Breadcrumb.Item className="d-lg-none d-sm-block">{product?.title?.length < 20 ? product?.title : `${product?.title?.slice(0, 20)}...`}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div
              className="d-flex flex-wrap mt-2 pt-3 bg-white margin-mobile-10px-x"
              style={{ border: "1px solid #ddd" }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }} className="col-lg-4 col-md-5 col-sm-12 ">
                <div className="product-thumbnail-image">
                  <img
                    className="w-100 h-100"
                    src={displayImage || product?.thumbnail}
                    alt=""
                  />
                </div>
                <div className="product-others-images d-flex justify-content-center">
                  <div style={{ width: "280px" }}>
                    <Slider className=" w-auto px-5" {...settings}>
                      {product?.images.map((img, index) => (
                        <div key={index} className="images-slider" style={{ width: "52px", height: "52px" }}>
                          <img
                            onClick={() => setDisplayImage(img)}
                            style={{
                              width: "52px",
                              height: "50px",
                              border: "1px solid #ddd",
                              cursor: "pointer",
                            }}
                            className="img-fluid me-3"
                            src={img}
                            alt=""
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 col-md-5 col-sm-12 product-details-information">
                <h3>Name: {product?.title}</h3>
                <div className="d-flex justiy-content-center">
                  <div className="ratings">
                    <Rating
                      name="read-only"
                      value={parseInt(product?.rating)}
                      readOnly
                    />
                  </div>
                  <div onClick={scrollToReviews} className="">( <span className="ratings-texts">{product?.reviews.length} Reviews</span> )</div>
                </div>
                <div>
                  <h4 className="my-2">
                    Price:{" "}
                    <span style={{ color: "#f85606" }}>
                      {productPrice} {currency}
                    </span>{" "}
                  </h4>
                  <div className="old-price">
                    <del>
                      {(product?.oldPrice * currencyRate).toFixed(2)} {currency}
                    </del>
                    <span className="ms-2">
                      {" "}
                      - {discountPercentage?.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2 mt-2">
                  <h6 style={{ minWidth: "50px" }}>Color:</h6>
                  <div>
                    {["#FF0000", "#49B2DB", "#3560D9"].map((color, index) => (
                      <p
                        key={index}
                        style={{ backgroundColor: color }}
                        className="product-select-color "
                      ></p>
                    ))}
                  </div>
                </div>

                {product?.color && <p>{product?.color}</p>}
                <div className="d-flex align-items-center gap-2">
                  <h6 style={{ minWidth: "50px" }}>Size:</h6>
                  <Form.Select
                    className="product-description-size"
                    style={{ minWidth: "156px", maxWidth: "156px" }}
                    aria-label="Default select example"
                  >
                    <option>Select Size</option>
                    <option value="XL">XL</option>
                    <option value="L">L</option>
                    <option value="M">M</option>
                    <option value="S">S</option>
                  </Form.Select>
                </div>

                <div className="product-quantity d-flex align-items-center gap-2 mt-2">
                  <h6 style={{ minWidth: "50px" }}>Qty:</h6>
                  <div className="">
                    <div className="qty-container">
                      <button
                        onClick={() => handleQunatityDecrement(product)}
                        className="qty-btn-minus btn-light"
                        type="button"
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                      <input
                        type="text"
                        name="qty"
                        value={quantity}
                        className="input-qty"
                      />
                      <button
                        onClick={() => handleQunatityIncrement(product)}
                        className="qty-btn-plus btn-light"
                        type="button"
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-2 d-lg-block d-sm-none">
                  <div id="cart-btn d-flex align-items-center justify-content-center ">
                    {product?.stock >= 1 ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        style={{ minWidth: "214px ", height: "38px" }}
                        className="cart-btn px-3 py-1"
                      >
                        Add to Cart
                        <i className="far plus-ico fa-plus-square text-white"></i>
                      </button>
                    ) : (
                      <button
                        title="Out of Stock"
                        type="button"
                        className="btn"
                        style={buttonStyle}
                        disabled
                      >
                        Out of Stock
                      </button>

                    )}
                    <button

                      style={{ height: "38px" }}
                      className="desktop-buy-now-button"
                    >
                      Buy Now
                      <i className="far plus-ico fa-plus-square text-white"></i>
                    </button>
                  </div>
                </div>
                {/* mobile add to cart button  */}
                <div className="mt-2 d-lg-none d-sm-block">
                  <div className="cart-btn-mobile ">
                    {product?.stock >= 1 ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="mobile-add-to-cart-button"
                      >
                        Add to Cart
                        <i className="far plus-ico fa-plus-square text-white"></i>
                      </button>
                    ) : (
                      <button
                        title="Out of Stock"
                        type="button"
                        className="btn"
                        style={buttonStyle}
                        disabled
                      >
                        Out of Stock
                      </button>
                    )}
                    <button
                      style={{ height: "38px" }}
                      className="mobile-buy-now-button"
                    >
                      Buy Now
                      <i className="far plus-ico fa-plus-square text-white"></i>
                    </button>

                  </div>
                </div>
                <ShareProduct></ShareProduct>
              </div>
              <div className="col-md-3 delevery-service-container">
                <DeleveryAndService></DeleveryAndService>


              </div>
              <MobileShareProduct></MobileShareProduct>
            </div>
            <div id="">
              <ProductDescription product={product} />

            </div>
            <div id="productReviewSection">
              <ProductReviewSection product={product} />
            </div>
            <ProductQuestionAnswer product={product}></ProductQuestionAnswer>
            <YouMayAlsoLike allDataLoading={allDataLoading} product={product} products={products}></YouMayAlsoLike>
          </div>
        )}
      </main>
      <Footer></Footer>
    </Layout>
  );
};

export default productNo;
