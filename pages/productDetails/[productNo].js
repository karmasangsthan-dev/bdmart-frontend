import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Breadcrumbs, Link, Rating } from "@mui/material";
import { Form, Tab, Tabs } from "react-bootstrap";
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
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import Slider from "react-slick";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button style={{ width: '30px', height: '30px',top:'33%' }} className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button style={{ width: '30px', height: '30px',top:'33%'  }} className="prev">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  );
};

const productNo = () => {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    query: { productNo },
  } = router;

  const { data: allData } = useGetAllProductsQuery();
  const { data, isLoading } = useGetProductDetailsQuery(productNo);

  const [displayImage, setDisplayImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const product = data?.data || {};
  const products = allData?.data || [];

  function handleClick(event) {
    event.preventDefault();
  }

  const handleAddToCart = (product) => {
    //   const alreadyAdded = !!user?.cart?.find(
    //     (item) => item?.product?._id === product?._id
    //   );
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


  const buttonStyle = {
    backgroundColor: "rgb(179 48 61)",
    borderColor: 'rgb(179 48 61)',
    color: '#ffffff',
    padding: '0.375rem 0.75rem',
    fontSize: '1rem',
    minWidth: "214px ",
    height: '38px',
    borderRadius: '0.25rem',
    cursor: 'not-allowed',
    opacity: '0.65',

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
    return <Loading></Loading>
  }

  if (!data?.status) {
    return <NotFoundPage></NotFoundPage>
  }

  return (
    <Layout title={`${product?.title ? product?.title : ''} Bangladesh Mart`}>
      {
        data?.status && <div style={{ minHeight: "120vh", maxWidth: '1200px' }} className="container">
          <div style={{ marginTop: '-15px', marginBottom: '5px' }} role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                onClick={() => router.push("/")}
                color="inherit"
                underline="hover"
                href="/"
              >
                Home
              </Link>
              <Link
                style={{ cursor: 'default', textDecoration: 'none' }}
                color="inherit"

              >
                Details
              </Link>
              <Link
                style={{ cursor: 'default', textDecoration: 'none' }}
                color="inherit"
              >
                {product?.title}
              </Link>
            </Breadcrumbs>
          </div>
          <div className="d-flex flex-wrap mt-2 pt-3" style={{ borderTop: '1px solid #ddd' }}>
            <div className="col-md-4">
              <div className="product-thumbnail-image">
                <img style={{ width: '330px', height: '330px', border: '1px solid #ddd' }} className="img-fluid" src={displayImage || product.thumbnail} alt="" />
              </div>
              <div className="product-others-images ">
                <div style={{width:'280px'}}>
                  <Slider className="w-auto px-5" {...settings}>
                    {product?.images.map(img => <div style={{ width: '52px', height: '52px' }}><img onClick={() => setDisplayImage(img)} style={{ width: '52px', height: '50px', border: '1px solid #ddd', cursor: 'pointer' }} className="img-fluid me-3" src={img} alt="" /></div>)}
                  </Slider>
                </div>

              </div>
            </div>

            <div className="col-md-8 py-2 px-4">
              <h3>Name: {product?.title}</h3>
              <div className="d-flex justiy-content-center">
                <div className="ratings">
                  <Rating
                    name="read-only"
                    value={parseInt(product?.rating)}
                    readOnly
                  />
                </div>
                <div className="ratings-texts">( 2 Reviews )</div>
              </div>
              <div>
                <h5 className="my-2">Price: <span style={{ color: '#26d5fd' }} >${product?.price}</span></h5>
              </div>

              <p>{product?.description}</p>
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
                      onClick={() => handleQunatityDecrement(product?.id)}
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
                      onClick={() => handleQunatityIncrement(product?.id)}
                      className="qty-btn-plus btn-light"
                      type="button"
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div id="cart-btn">
                  {
                    product?.stock >= 1 ? <button
                      onClick={() => handleAddToCart(product)}
                      style={{ minWidth: "214px ", height: '38px' }}
                      className="cart-btn px-3 py-1"
                    >
                      Add to Cart<i className="far plus-ico fa-plus-square text-white"></i>
                    </button> : <button title="Out of Stock" type="button" className="btn" style={buttonStyle} disabled>
                      Out of Stock
                    </button>
                  }
                </div>
              </div>

              <div className="share mt-2">
                <div className="d-flex align-items-center">
                  <h6 className="mt-1">Share:</h6>
                  <div className="share-buttons ms-2">
                    <a
                      href="https://www.facebook.com/sharer/sharer.php?u=https://example.com"
                      target="_blank"
                    >
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a
                      href="https://twitter.com/intent/tweet?url=https://example.com"
                      target="_blank"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      href="https://pinterest.com/pin/create/button/?url=https://example.com&media=https://example.com/image.jpg&description=Description%20here"
                      target="_blank"
                    >
                      <i className="fab fa-pinterest"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDescription product={product}></ProductDescription>
          <h4 className="text-center my-4">You May Also Like</h4>

          <div className="shop page-content">
            <div className="container">
              <div className="row gap-4">
                <div className="col-lg-9">
                  <div className="products ">
                    <div className="shop-product-details ">
                      {products
                        ?.filter((d) => d.category === `${product?.category}`).slice(0, 5).map((d) => {
                          return (
                            <div
                              key={d?._id}
                              className="shop-single-product">
                              <figure className="product-media">
                                <span className="product-label label-top">Top</span>
                                <Link style={{ marginTop: "-21px" }} href="/shop">
                                  <div style={{ width: "217px", height: "217px" }}>
                                    <Image
                                      onClick={() => router.push(`/productDetails/${d._id}`)}
                                      width={217}
                                      height={217}
                                      src={d?.thumbnail}
                                      className=""
                                      alt=""
                                    />

                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        toast.success("product added in cart");
                                      }}
                                      className="shop-add-to-cart-button"
                                    >
                                      Add to Cart
                                      <i className="far plus-ico fa-plus-square" aria-hidden="true"></i>
                                    </button>
                                  </div>
                                </Link>
                              </figure>
                              <div className="product-body">
                                <div className="product-cat">
                                  <Link href="#">{d?.category}</Link>
                                </div>
                                <div onClick={() => router.push(`/productDetails/${d._id}`)} className="product-title">
                                  <Link href="/shop/?category=fruit">{d?.title}</Link>
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
                                    <Rating
                                      name="read-only"
                                      value={parseInt(d?.rating)}
                                      readOnly
                                    />
                                  </div>
                                  <div className="ratings-texts">( 2 Reviews )</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <Footer></Footer>
    </Layout>
  );
};

// export async function getServerSideProps(context) {
//     const productNo = context.query.productNo;
//     const res = await fetch(`https://dummyjson.com/products/${productNo}`);
//     const resProducts = await fetch(`https://dummyjson.com/products`);
//     const data = await res.json();
//     const dataProducts = await resProducts.json();
//     return {
//         props: {
//             data,
//             products: dataProducts,
//         }
//     };
// }

export default productNo;
