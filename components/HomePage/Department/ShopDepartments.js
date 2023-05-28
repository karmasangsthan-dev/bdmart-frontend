import Image from "next/image";
import { useRouter } from "next/router";
import { en } from "../../../locales/en";
import { bn } from "../../../locales/bn";

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
  return (
    <div className="gallery-show ">
      <div className="">
        <div className="col-lg-12 col-md-12 col-sm-12 w">
          <div className="gal-head">
            <h2>{t.homePage.shopDepartments.title}</h2>
          </div>
        </div>
      </div>

      <div className="d-sm-none d-lg-block justify-content-center px-5 ">
        <div className="row mx-auto">
          {gallery.map((gal, index) => (
            <div
              key={index}
              className="col-lg-2 col-xl-2 col-sm-6 col-6 gap-4 "
            >
              <div
                onClick={() => router.push(`/shop?category=${gal?.name}`)}
                className="gallery-img d-flex justify-content-center"
              >
                <Image
                  layout="responsive"
                  width={1000}
                  height={1000}
                  src={gal.imageSrc}
                  className=" "
                  loading="lazy"
                  alt=""
                />
                {/* <img src={gal.imageSrc} alt="" /> */}
              </div>
              <div className="gallery-title">
                <p className="text-center">{gal.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* for mobile device  */}
      <div className="d-sm-block d-lg-none justify-content-center px-5 ">
        <div className="row mx-auto">
          {gallery.map((gal, index) => (
            <div
              key={index}
              className="col-lg-2 col-xl-2 col-sm-6 col-6 gap-4 "
            >
              <div className="gallery-img d-flex justify-content-center">
                <Image
                  layout="responsive"
                  width={1000}
                  height={1000}
                  src={gal.imageSrc}
                  className=" "
                  loading="lazy"
                  alt=""
                />
                {/* <img src={gal.imageSrc} alt="" /> */}
              </div>
              <div className="gallery-title">
                <p className="text-center">{gal.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopDepartments;
