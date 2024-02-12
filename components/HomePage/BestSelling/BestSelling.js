import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Slider from "react-slick";

import Product from "../../Product/Product";
import {
  useGetAllProductsQuery,
  useGetSectionBasedProductsQuery,
} from "../../../features/product/productApi";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";
import { en } from "../../../locales/en";
import { bn } from "../../../locales/bn";
import DiscountProductCard from "../../Product/DiscountProductCard";
import { GrPrevious } from "react-icons/gr";
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next"></button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev"></button>
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

const BestSelling = ({ t, data = [] }) => {
  const [isFound, setIsFound] = useState(0);
  const [isServerError, setIsServerError] = useState(false);
  const { data2, isLoading, isError, error } = useGetSectionBasedProductsQuery({
    section: "bestSelling",
  });

  useEffect(() => {
    if (error?.data?.status === 0) {
      setIsFound(0)
    }

    if (error?.status === 'FETCH_ERROR') {
      setIsServerError(1)
    }
  }, [isError, error])

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
          autoplay: true,
        },
      },
    ],
  };


  return (
    <section>
      <div className="px-2">
        <div className="">
          <div className="col-lg-12 col-md-12 col-sm-12 w">
            <div className="gal-head gal-head-best-selling">
              <h2 className="mb-0">{t.homePage.bestSelling.title}</h2>
            </div>
          </div>
        </div>

        
        {isLoading || isFound === 0 || isServerError === 1 ? (
          <div className="">
            <Slider {...settings}>
              {[1, 2, 3, 4, 5, 6].map((product, i) => {
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
          <div className="">
            <Slider className=" " {...settings}>
              {data?.data?.map((product, index) => {
                return <DiscountProductCard key={index} product={product} />;
              })}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSelling;
