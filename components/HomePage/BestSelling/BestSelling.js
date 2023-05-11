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

const BestSelling = () => {
  const { data } = useGetAllProductsQuery();

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
        <h1 className="text-center mb-4">Bestselling items on Rollback</h1>
      </div>
      <Slider className="mb-3 px-4 d-sm-none d-lg-block" {...settings}>
        {data?.data?.map((item, index) => (
          <Product key={index} item={item} />
        ))}
      </Slider>

      <Slider className="d-lg-none d-sm-block mobile-slider" {...settings}>
        {data?.data?.map((item, index) => (
          <div key={item?._id} style={{ padding: "0 20px" }} className=''>
            <div style={{ "background": "#fff", "padding": "20px", "position": "relative", "borderRadius": "8px", "boxShadow": "rgb(3 0 71 / 9%) 0px 1px 3px", "margin": "10px" }} className=' mtop'>
              <div className='img'>
                {
                  item?.quantity > 0 ? <span className='discount'>10 % Off</span> : <span style={{ "position": "absolute", "top": "0", "left": "0", "background": "#e94560", "padding": "3px 10px", "fontSize": "12px", "borderRadius": "50px", "color": "#fff", "margin": "10px" }} className=''>Out of Stock</span>
                }
                {/* <span className='available'>{item.discount}% Off</span> */}
                <img width='100%' height='232px' src={item?.thumbnail} alt='' />

              </div>
              <div className='product-details'>
                <h3 onClick={() => navigate(`/product-details/${item._id}`)} className="product-name mt-1">{item.title}</h3>
                <div className='rate'>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                </div>
                <div className='price '>
                  <h4 className="mb-0 mt-2">${item.price}.00 </h4>
                  {/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
                  
                </div>
              </div>
            </div>
          </div>
        ))}

      </Slider>

    </div>
  );
};

export default BestSelling;



