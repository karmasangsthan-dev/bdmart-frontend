import Image from "next/image";
import { useRouter } from "next/router";
import { en } from "../../../locales/en";
import { bn } from "../../../locales/bn";
import { useGetCategoriesQuery } from "../../../features/product/productApi";
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

const ShopDepartments = ({ t }) => {
  const router = useRouter();
  const { data } = useGetCategoriesQuery();

  

  return (
    <div className="gallery-show ">
      <div className="">
        <div className="col-lg-12 col-md-12 col-sm-12 w">
          <div className="gal-head">
            <h2>{t.homePage.shopDepartments.title}</h2>
          </div>
        </div>
      </div>

      <div className=" justify-content-center px-5 ">
        <div className="all-shop-department">
          {data?.data?.map((gal, index) => (
            <div key={index} className="">
              <div
                onClick={() => router.push(`/shop?category=${gal?.category}`)}
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
