import React, { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../../features/product/productApi";
import { Rating } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";
import DiscountProductCard from "../../Product/DiscountProductCard";

const JustForYou = ({ t }) => {
  const router = useRouter();
  const [page, setPage] = useState(6);
  const { data, isLoading, refetch } = useGetAllProductsQuery({
    perPage: page,
  });

  const fetchMoreData = () => {
    setPage(page + 6);
  };

  const totalProducts = data?.total || 0;
  const loadedProducts = data?.data?.length || 0;
  const hasMore = loadedProducts < totalProducts;

  useEffect(() => {
    if (loadedProducts >= totalProducts) {
      // Fetch more data when all products are loaded initially
      fetchMoreData();
    }
  }, [totalProducts]);

  return (
    <div>
      <div className="">
        <div className="col-lg-12 col-md-12 col-sm-12 w">
          <div className="gal-head">
            <h2>{t.homePage.justForYou.title}</h2>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: "1240px" }} className="mx-auto ">
        <div className=" all-products-container ">
          {isLoading ? (
            <>
              {Array(6)
                .fill()
                .map((p, i) => {
                  return (
                    <div
                      key={i}
                      className="border shadow "
                      style={{
                        width: "189px",
                        minHeight: "189px",
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
            </>
          ) : (
            <>
              {data?.data?.map((product) => {
                return (
                  <div className="mb-1 w-100" key={product?._id}>
                    <div className="product-link bestselling-product-container  border p-3 rounded-3 shadow just-for-you-product">
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

                );
              })}
              {loadedProducts === 0 && <p>No products found.</p>}
            </>
          )}
        </div>
      </div>
      <InfiniteScroll
        dataLength={loadedProducts}
        next={fetchMoreData}
        hasMore={!isLoading && hasMore}
        loader={<h4 className="text-center">Loading...</h4>}
        endMessage={
          data?.data && (
            <p style={{ textAlign: "center" }}>
              <b>
                To see more products click{" "}
                <span onClick={() => router.push("/shop")}>here</span>
              </b>
            </p>
          )
        }
      ></InfiniteScroll>
    </div>
  );
};

export default JustForYou;
