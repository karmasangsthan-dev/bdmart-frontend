import React from "react";
import { useGetAllProductsQuery } from "../../../features/product/productApi";
import Slider from "react-slick";
import { Rating } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";
import DiscountProductCard from "../../Product/DiscountProductCard";

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

const Discount = ({ t }) => {
  const router = useRouter();
  const { data, isLoading } = useGetAllProductsQuery();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
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
      <section className="">
        <div style={{ maxWidth: "1260px" }} className="mx-auto ">
          <div className="">
            <div className="col-lg-12 col-md-12 col-sm-12 w">
              <div className="gal-head">
                <h2>{t.homePage.discount.title}</h2>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div>
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
            <div>
              <Slider className="px-4" {...settings}>
                {data?.data?.map((product) => (
                  <DiscountProductCard product={product} key={product?._id} />
                ))}
              </Slider>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Discount;
