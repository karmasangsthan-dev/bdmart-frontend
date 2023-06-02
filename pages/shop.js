import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Button, Collapse, Container, Navbar, Nav } from "react-bootstrap";
import ShopProduct from "../components/Product/ShopProduct";
import ShopSideBar from "../components/Shop/ShopSideBar/ShopSideBar";
import {
  useGetAllProductsQuery,
  useGetProductsQuery,
} from "../features/product/productApi";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";
import ShopPagination from "../components/Shared/Pagination/ShopPagination";
import { en } from "../locales/en";
import { bn } from "../locales/bn";
import DiscountProductCard from "../components/Product/DiscountProductCard";
import { Rating } from "@mui/material";

const shop = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : bn;
  const [params, setParams] = useState();
  const categoryTextParams = router.query?.category;

  const user = useSelector((state) => state.auth.user);
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState();
  const [sort, setSort] = useState({
    perPage: 12,
    pageNumber: 1,
    priceSort: 0,
  });

  useEffect(() => {
    setParams(categoryTextParams);
  }, [router.query?.category]);

  const [filter, setFilter] = useState({
    category: [],
    size: "",
    brand: [],
    price: [],
  });

  const { data, isLoading } = useGetAllProductsQuery({
    perPage: page,
  });

  const {
    data: products,
    isSuccess,
    isLoading: loading,
    isError,
    error,
  } = useGetProductsQuery({ sort, filter });



  return (
    <Layout title="Shop - Bangladesh Mart">
      <div className="shop page-content">
        <div className="container">
          <div className="row ">
            <aside className="col-lg-2 order-lg-first">
              <ShopSideBar
                data={data}
                filter={filter}
                setFilter={setFilter}
                params={params}
                t={t}
              />
            </aside>
            <div className="col-lg-10 pl-lg-5">
              <div className="">
                <div className="widget w-100 widget-clean d-flex justify-content-between align-items-center">
                  <p className="fs-6">
                    {t.shopPage.allProducts.productsCountTitle}: {data?.total}
                  </p>
                  <div className="d-flex gap-4">
                    <div className="d-flex py-1">
                      <span>{t.shopPage.allProducts.perPageTitle}: </span>
                      <select
                        onChange={(e) =>
                          setSort({
                            ...sort,
                            perPage: Number(e.target.value),
                          })
                        }
                        className="ms-1 rounded px-2 border"
                      >
                        <option value={12}>12</option>
                        <option value={16}>16</option>
                        <option value={20}>20</option>
                      </select>
                    </div>
                    <div className="d-flex py-1">
                      <span>{t.shopPage.allProducts.sortBy.title} : </span>
                      <select
                        onChange={(e) =>
                          setSort({
                            ...sort,
                            priceSort: Number(e.target.value),
                          })
                        }
                        className="ms-1 border rounded px-2 "
                      >
                        <option value={0}>
                          {t.shopPage.allProducts.sortBy.option1}
                        </option>
                        <option value={-1}>
                          {t.shopPage.allProducts.sortBy.option2}
                        </option>
                        <option value={1}>
                          {t.shopPage.allProducts.sortBy.option3}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="products">
                  {loading ? (
                    <div className="all-products-container-shop">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((elem, i) => {
                        return (
                          <div
                            key={i}
                            className="border shadow "
                            style={{
                              width: "217px",
                              minHeight: "217px",
                              background: "#fff",
                              height: "100%",
                            }}
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
                    <div className="shop-products">
                      {products?.data?.map((product) => (
                        <div className="mb-1 w-100" key={product?._id}>
                          <div className="product-link bestselling-product-container  border p-3 rounded-3 shadow">
                            <div className="">
                              <img
                                onClick={() => router.push(`/productDetails/${product._id}`)}
                                className="border"
                                style={{ width: "100%", height: "139px" }}
                                src={product?.thumbnail}
                                alt=""
                              />
                            </div>
                            <p
                              onClick={() => router.push(`/productDetails/${product._id}`)}
                              style={{ minHeight: "42px", cursor: "pointer" }}
                              className="item-name mt-2 mb-0 text-capitalize"
                            >
                              {product?.title?.length > 30
                                ? `${product?.title?.slice(0, 30)} ...`
                                : product?.title}
                            </p>

                            <div className="d-flex justify-content-between align-items-center">
                              <span className="item-price">
                                $
                                {(
                                  product?.price -
                                  (product?.price * product?.discountPercentage) / 100
                                ).toFixed(2)}
                              </span>
                            </div>
                            <div className="old-price">
                              <del>{product.price} $</del>
                              <span className="ms-2"> - {product?.discountPercentage}%</span>
                            </div>
                            <div className="d-flex align-items-center">
                              <Rating
                                style={{ fontSize: "15px", marginLeft: "-3px" }}
                                name="read-only"
                                value={parseInt(product?.rating || 5)}
                                readOnly
                              />
                              <p className="mb-0 ms-1" style={{ fontSize: "13px" }}>
                                ({parseInt(product?.rating || 5)})
                              </p>
                            </div>
                            <div id="">
                              <button
                                className="cart-btn w-100 "
                                onClick={() => handleAddToCart(product)}
                              >
                                Add to Cart
                                <i className="far plus-ico fa-plus-square text-white"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* {loadedProducts === 0 && <p>No products found.</p>} */}
                    </div>
                  )}
                </div>
              </div>
              <div className="my-5">
                <ShopPagination
                  setSort={setSort}
                  sort={sort}
                  pageFound={products?.pageFound}
                  data
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default shop;
