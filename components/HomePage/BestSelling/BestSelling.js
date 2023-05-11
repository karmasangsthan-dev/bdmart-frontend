import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Slider from "react-slick";

import Product from "../../Product/Product";
import { useGetAllProductsQuery } from "../../../features/product/productApi";

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
    margin: '20px 0',
  },
  '@media (max-width: 700px)': {
    bestsellingTitle: {
      margin: '10px 0 15px 0',
    },
  },
};

const BestSelling = () => {
  const { data, isLoading } = useGetAllProductsQuery();
  console.log(data, 'data from best')
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
        <h1 style={styles.bestsellingTitle} className="text-center  bestselling-title">Bestselling items on Rollback</h1>
      </div>
      {
        isLoading ? (
          <div className="">
            <div className="d-flex justify-content-center ">
              <div className="spinner1"></div>
            </div>
          </div>
        ) : (
          <Slider className="mb- px-4 " {...settings}>
            {data?.data?.map((item, index) => (
              <Product key={index} item={item} />
            ))}
          </Slider>
        )
      }
      



    </div>
  );
};

export default BestSelling;



