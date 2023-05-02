import Image from "next/image";

const gallery = [
  {
    name: "Carrot",
    imageSrc: `/images/gal-1.jpg`,
  },
  {
    name: "Carrot",
    imageSrc: `/images/gal-7.jpg`,
  },

  {
    name: "Carrot",
    imageSrc: `/images/gal-1.jpg`,
  },
  {
    name: "Carrot",
    imageSrc: `/images/gal-7.jpg`,
  },

  {
    name: "Carrot",
    imageSrc: `/images/gal-1.jpg`,
  },
  {
    name: "Carrot",
    imageSrc: `/images/gal-7.jpg`,
  },

  {
    name: "Carrot",
    imageSrc: `/images/gal-1.jpg`,
  },
  {
    name: "Carrot",
    imageSrc: `/images/gal-7.jpg`,
  },

  {
    name: "Carrot",
    imageSrc: `/images/gal-1.jpg`,
  },
  {
    name: "Carrot",
    imageSrc: `/images/gal-7.jpg`,
  },

  {
    name: "Carrot",
    imageSrc: `/images/gal-1.jpg`,
  },
  {
    name: "Carrot",
    imageSrc: `/images/gal-7.jpg`,
  },

  {
    name: "Carrot",
    imageSrc: `/images/gal-1.jpg`,
  },
  {
    name: "Carrot",
    imageSrc: `/images/gal-7.jpg`,
  },

  {
    name: "Carrot",
    imageSrc: `/images/gal-1.jpg`,
  },
  {
    name: "Carrot",
    imageSrc: `/images/gal-7.jpg`,
  },

  {
    name: "Carrot",
    imageSrc: `/images/gal-1.jpg`,
  },
  {
    name: "Carrot",
    imageSrc: `/images/gal-7.jpg`,
  },
];

const ShopDepartments = () => {
  return (
    <div className="gallery-show ">
      <div className="">
        <div className="col-lg-12 col-md-12 col-sm-12 w">
          <div className="gal-head">
            <h2>Shop Departments</h2>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center px-5">
        <div className="  row mx-auto">
          {gallery.map((gal,index) => (
            <div key={index} className="col-lg-2   col-xl-2 col-sm-6 col-6 gap-4">
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
