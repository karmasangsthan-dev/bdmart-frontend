import Image from "next/image";
import { useRouter } from "next/router";
import { en } from "../../../locales/en";
import { bn } from "../../../locales/bn";
import { useGetCategoriesQuery } from "../../../features/product/productApi";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
// import { useGetCategoriesQuery } from "../../../features/product/productApi";

const gallery = [
  {
    name: "Carrot",
    imageSrc: `/images/gal-1.jpg`,
  },
  {
    name: "Toys",
    imageSrc: `/images/gal-2.jpg`,
  },

  {
    name: "Gift",
    imageSrc: `/images/gal-3.jfif`,
  },
  {
    name: "Furniture",
    imageSrc: `/images/gal-4.jpg`,
  },

  {
    name: "Personal Care",
    imageSrc: `/images/gal-5.jpg`,
  },
  {
    name: "Pets",
    imageSrc: `/images/gal-6.jfif`,
  },

  {
    name: "Rat",
    imageSrc: `/images/gal-7.jpg`,
  },
  {
    name: "Women",
    imageSrc: `/images/gal-8.jpg`,
  },

  {
    name: "Man",
    imageSrc: `/images/gal-9.jfif`,
  },
  {
    name: "Clothes",
    imageSrc: `/images/gal-10.jfif`,
  },
  {
    name: "Carrot",
    imageSrc: `/images/gal-1.jpg`,
  },
  {
    name: "Toys",
    imageSrc: `/images/gal-2.jpg`,
  },

  {
    name: "Gift",
    imageSrc: `/images/gal-3.jfif`,
  },
  {
    name: "Furniture",
    imageSrc: `/images/gal-4.jpg`,
  },

  {
    name: "Personal Care",
    imageSrc: `/images/gal-5.jpg`,
  },
  {
    name: "Pets",
    imageSrc: `/images/gal-6.jfif`,
  },

  {
    name: "Rat",
    imageSrc: `/images/gal-7.jpg`,
  },
  {
    name: "Women",
    imageSrc: `/images/gal-8.jpg`,
  },
];

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
      </button>
    </div>
  );
};


const ShopDepartments = ({ t,data }) => {
  const router = useRouter();
  const [isFound, setIsFound] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // const { data, isLoading , isError, error } = useGetCategoriesQuery();

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
    <div className="gallery-show ">
      <div className="">
        <div className="col-lg-12 col-md-12 col-sm-12 w">
          <div className="gal-head">
            <h2>{t.homePage.shopDepartments.title}</h2>
          </div>
        </div>
      </div>

      {
        isLoading && <div>
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
      }

      <div className=" justify-content-center px-2 ">
        <div className="all-shop-department">
          {data?.data?.map((gal, index) => (
            <div onClick={() => router.push(`/shop?category=${gal?.category}`)} key={index} className="">
              <div
                className="gallery-img d-flex justify-content-center"
              >
                {/* <Image
                  layout="responsive"
                  width={500}
                  height={500}
                  src={gal?.thumbnail}
                  className="shop-department-image "
                  loading="lazy"
                  alt=""
                /> */}
                <img
                  src={gal.thumbnail}
                  alt=""
                  className="shop-department-image "
                />
              </div>
              <div className="gallery-title">
                <p className="text-center">{gal?.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopDepartments;
