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
  const loadMoreProduct = () => {

  }
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
                  console.log({ data: data?.data })
                  return (
                    <JustForYouProductCard product={product} key={product?._id} />
                  );
                })}

              </>
            </div>
          )}

          <button onClick={loadMoreProduct} className="d-flex mx-auto px-5 text-white py-2 border-0 rounded mt-3" style={{ backgroundColor: "rgb(253, 130, 23)", fontWeight: "500" }}>Load More...</button>
        </div>

      </div >
    </section>
  );
};

export default JustForYou;
