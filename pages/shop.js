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

const shop = () => {
  const router = useRouter();
  const [params, setParams] = useState();
  const categoryTextParams = router.query?.category;

  const user = useSelector((state) => state.auth.user);
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(4);
  const [sort, setSort] = useState({
    perPage: 4,
    pageNumber: 1,
    priceSort: 0,
  });

  const fetchMoreData = () => {
    setPage(page + 4);
    setSort({
      perPage: sort.perPage + 4,
      pageNumber: 1,
      priceSort: 0,
    })
  };

  useEffect(() => {
    setParams(categoryTextParams);
  }, [router.query?.category]);

  const [filter, setFilter] = useState({
    category: [],
    size: "",
    brand: [],
    price: [],
  });

  const { data, isLoading } = useGetAllProductsQuery({ perPage: page });

  const {
    data: products,
    isSuccess,
    isLoading: loading,
    isError,
    error,
  } = useGetProductsQuery({ sort, filter });

  const totalProducts = data?.total || 0;
  const loadedProducts = data?.data?.length || 0;
  const hasMore = loadedProducts < totalProducts;

  console.log(sort, 'sort')
  console.log(page, 'per page');
  console.log({ data, products });
  useEffect(() => {
    if (
      sort.perPage !== 4 ||
      sort.priceSort ||
      sort.pageNumber !== 1 ||
      filter.category.length ||
      filter.brand.length ||
      filter.price.length
    ) {
      setAllProducts(products);
    } else if (
      sort.perPage === 4 ||
      !sort.priceSort ||
      sort.pageNumber === 1 ||
      !filter.category.length ||
      !filter.brand.length ||
      !filter.price.length
    ) {
      setAllProducts(data);
    }
  }, [
    products,
    data,
    sort.pageNumber,
    sort.perPage,
    sort.priceSort,
    filter.category,
    filter.brand,
    filter.price,
  ]);

  useEffect(() => {
    if (loadedProducts >= totalProducts) {
      // Fetch more data when all products are loaded initially
      fetchMoreData();
    }
  }, [totalProducts]);

  useEffect(() => {
    // Reset page and loaded products when category params change
    setPage(8);
    setAllProducts([]);
  }, [params]);
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
              />
            </aside>
            <div className="col-lg-10 pl-lg-5">
              <div className="">
                <div className="widget w-100 widget-clean d-flex justify-content-between align-items-center">
                  <p className="fs-6">Total Products: {data?.total}</p>
                  <div className="d-flex gap-4">
                    {/* <div className="d-flex py-1">
                      <span>Per page : </span>
                      <select
                        onChange={(e) =>
                          setSort({
                            ...sort,
                            perPage: Number(e.target.value),
                          })
                        }
                        className="ms-1 rounded px-2 border"
                      >
                        <option value={15}>15</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                      </select>
                    </div> */}
                    <div className="d-flex py-1">
                      <span>Sort by : </span>
                      <select
                        onChange={(e) =>
                          setSort({
                            ...sort,
                            priceSort: Number(e.target.value),
                          })
                        }
                        className="ms-1 border rounded px-2 "
                      >
                        <option value={0}>Default</option>
                        <option value={-1}>High to low</option>
                        <option value={1}>Low to High</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="products">
                  {isLoading || loading ? (
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
                      {allProducts?.data?.map((product) => (
                        <ShopProduct product={product} key={product?._id} />
                      ))}
                      {loadedProducts === 0 && <p>No products found.</p>}
                    </div>
                  )}
                </div>
              </div>
              <InfiniteScroll
                dataLength={loadedProducts}
                next={fetchMoreData}
                hasMore={!isLoading && hasMore}
                loader={
                  <div className="all-products-container-shop mt-3">
                    {[1, 2, 3, 4].map((elem, i) => {
                      return (
                        <div
                          key={i}
                          className="border shadow shop-single-product"
                          style={{
                            width: "216px",
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
                }
                endMessage={
                  data?.data && (
                    <p style={{ textAlign: "center" }}>
                      <b>End</b>
                    </p>
                  )
                }
              ></InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default shop;