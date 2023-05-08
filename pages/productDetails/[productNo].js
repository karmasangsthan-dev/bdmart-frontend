import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Breadcrumbs, Link, Rating } from "@mui/material";
import { Form, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import Image from "next/image";
import {
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
} from "../../features/product/productApi";
import ProductDescription from "../../components/ProductDescription/ProductDescription";

const productNo = () => {
  const router = useRouter();
  const {
    query: { productNo },
  } = router;

  const { data: allData } = useGetAllProductsQuery();
  const { data } = useGetProductDetailsQuery(productNo);

  const [quantity, setQuantity] = useState(1);
  const product = data?.data || {};
  const products = allData?.data || [];

  function handleClick(event) {
    event.preventDefault();
  }

  const handleQunatityIncrement = (id) => {
    setQuantity(quantity + 1);
  };
  const handleQunatityDecrement = (id) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Layout>
      <div style={{ minHeight: "120vh" }} className="container">
        <div style={{marginTop:'-15px',marginBottom:'5px'}} role="presentation" onClick={handleClick}>
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
              onClick={() => router.push("/shop")}
              underline="hover"
              color="inherit"
              href="/shop"
            >
              Shop
            </Link>
            <Link
              underline="hover"
              color="text.primary"
              href="/"
              aria-current="page"
            >
              Product
            </Link>
          </Breadcrumbs>
        </div>
        <div className="d-flex ">
          <div className="col-md-6">
            <img src={product.thumbnail} alt="" />
          </div>
          <div className="col-md-6">
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
              <div class="">
                <div class="qty-container">
                  <button
                    onClick={() => handleQunatityDecrement(product?.id)}
                    class="qty-btn-minus btn-light"
                    type="button"
                  >
                    <i class="fa fa-minus"></i>
                  </button>
                  <input
                    type="text"
                    name="qty"
                    value={quantity}
                    class="input-qty"
                  />
                  <button
                    onClick={() => handleQunatityIncrement(product?.id)}
                    class="qty-btn-plus btn-light"
                    type="button"
                  >
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div id="cart-btn">
                <button
                  onClick={() => toast.success("Product added to Cart")}
                  style={{ minWidth: "214px " }}
                  className="cart-btn px-3 py-1"
                >
                  Add to Cart<i className="far plus-ico fa-plus-square text-white"></i>
                </button>
              </div>
            </div>
            <div>
              <h6 className="my-2">Category: {product?.category}</h6>
            </div>
            <div className="share mt-3">
              <div className="d-flex align-items-center">
                <h6>Share</h6>
                <div class="share-buttons">
                  <a
                    href="https://www.facebook.com/sharer/sharer.php?u=https://example.com"
                    target="_blank"
                  >
                    <i class="fab fa-facebook"></i>
                  </a>
                  <a
                    href="https://twitter.com/intent/tweet?url=https://example.com"
                    target="_blank"
                  >
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a
                    href="https://pinterest.com/pin/create/button/?url=https://example.com&media=https://example.com/image.jpg&description=Description%20here"
                    target="_blank"
                  >
                    <i class="fab fa-pinterest"></i>
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
                      ?.filter((d) => d.category === `${product?.category}`)
                      .map((d) => {
                        return (
                          <div key={d?._id} className="shop-single-product">
                            <figure className="product-media">
                              <span className="product-label label-top">
                                Top
                              </span>

                              <div
                                onClick={() =>
                                  router.push(`/productDetails/${d.id}`)
                                }
                                style={{ width: "217px", height: "217px" }}
                              >
                                <Image
                                  width={217}
                                  height={217}
                                  src={d?.thumbnail}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  toast.success("product added in cart");
                                }}
                                className="shop-add-to-cart-button"
                              >
                                Add to Cart
                                <i
                                  class="far plus-ico fa-plus-square"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </figure>
                            <div className="product-body">
                              <div className="product-cat">
                                <Link href="/shop/?category=fruit">
                                  {d?.category}
                                </Link>
                              </div>
                              <div className="product-title">
                                <p
                                  className="cursor-pointer"
                                  onClick={() =>
                                    router.push(`/productDetails/${d.id}`)
                                  }
                                >
                                  {d?.title}
                                </p>
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
                                <div className="ratings-texts">
                                  ( 2 Reviews )
                                </div>
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
