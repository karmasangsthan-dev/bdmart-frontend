import React, { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../../features/product/productApi";
import { Rating } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";
import DiscountProductCard from "../../Product/DiscountProductCard";
import { useSelector } from "react-redux";
import JustForYouProductCard from "../../Product/JustForYouProductCard";

const JustForYou = ({ t }) => {
  const router = useRouter();
  const [page, setPage] = useState(6);
  const { data, isLoading, refetch } = useGetAllProductsQuery({
    perPage: page,
  });

  const { currency, currencyRate } = useSelector((state) => state.currency);

  // let productPrice;
  // if (currencyRate) {
  //   productPrice = (
  //     (product?.price - (product?.price * product?.discountPercentage) / 100) *
  //     currencyRate
  //   ).toFixed(2);
  // }

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
    <section>
      <div className="mb-5">
        <div className="">
          <div className="col-lg-12 col-md-12 col-sm-12 w">
            <div className="gal-head">
              <h2>{t.homePage.justForYou.title}</h2>
            </div>
          </div>
        </div>
        <div >

          {isLoading ? (
            <div className="mb-3 just-for-you-loading-container" >
              {Array(6)
                .fill()
                .map((p, i) => {
                  return (
                    <div
                      key={i}
                      className="border shadow rounded"
                      style={{
                        width: "auto",
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
            </div>
          ) : (
            <div className=" all-products-container ">
              <>
                {data?.data?.map((product) => {
                  return (
                    <JustForYouProductCard product={product} key={product?._id} />
                  );
                })}
                {loadedProducts === 0 && <p>No products found.</p>}
              </>
            </div>
          )}

        </div>
        <InfiniteScroll
          dataLength={loadedProducts}
          next={fetchMoreData}
          hasMore={!isLoading && hasMore}
          loader={<h4 className="text-center">Loading...</h4>}
          endMessage={
            data?.data && (
              <p className="mb-4" style={{ textAlign: "center" }}>
                <b>
                  To see more products click{" "}
                  <span onClick={() => router.push("/shop")}>here</span>
                </b>
              </p>
            )
          }
        ></InfiniteScroll>
      </div >
    </section>
  );
};

export default JustForYou;
