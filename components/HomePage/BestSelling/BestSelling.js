import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Slider from "react-slick";

import Product from "../../Product/Product";
import { useGetAllProductsQuery } from "../../../features/product/productApi";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";
import { en } from "../../../locales/en";
import { bn } from "../../../locales/bn";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  );
};
const styles = {
  bestsellingTitle: {
    margin: "20px 0",
  },
  "@media (max-width: 700px)": {
    bestsellingTitle: {
      margin: "10px 0 15px 0",
    },
  },
};

const BestSelling = ({ t }) => {
  const { data, isLoading } = useGetAllProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="card-header">
        <h1
          style={styles.bestsellingTitle}
          className="text-center  bestselling-title"
        >
          {t.homePage.bestSelling.title}
        </h1>
      </div>
      {isLoading ? (
        <div>
          <Slider {...settings}>
            {[1, 2, 3, 4, 5].map((product, i) => {
              return (
                <div key={i} className="mb-1">
                  <div className="product-link bestselling-product-container  border px-3 py-2 m-3  rounded-3 shadow">
                    <div className="">
                      <Skeleton
                        style={{ width: "100%", height: "139px" }}
                      ></Skeleton>
                    </div>

                    <p className="item-name mt-2 mb-0">
                      <Skeleton></Skeleton>
                    </p>

                    <Skeleton
                      className="mt-0"
                      style={{ width: "50px" }}
                    ></Skeleton>

                    <div className="old-price">
                      <del style={{ display: "inline-block" }}>
                        <Skeleton
                          className="mt-0"
                          style={{ width: "50px" }}
                        ></Skeleton>
                      </del>
                      <span className="ms-2">
                        <Skeleton
                          className="mt-0"
                          style={{ width: "50px" }}
                        ></Skeleton>
                      </span>
                    </div>

                    <div className="d-flex align-items-center">
                      <Skeleton style={{ width: "80px" }}></Skeleton>
                      <p className="mb-0 ms-1" style={{ fontSize: "13px" }}>
                        <Skeleton style={{ width: "30px" }}></Skeleton>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <Slider className="mb- px-4 " {...settings}>
          {data?.data?.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default BestSelling;
