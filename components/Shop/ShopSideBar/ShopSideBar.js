import { Collapse, Rating, Slider } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetSingleSubCategoryQuery,
  useGetSubCategoryQuery,
} from "../../../features/product/productApi";
import toast from "react-hot-toast";

const ShopSideBar = ({ data, filter, setFilter, t }) => {
  const router = useRouter();

  const [catOpen, setCatOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(true);
  const [selectedRating, setSelectedRating] = useState(null);
  const [priceOpen, setPriceOpen] = useState(true);
  const [childCategoryOpen, setChildCategoryOpen] = useState(false);
  const {
    data: mainCategoryData,
    isLoading,
    isError,
    error,
  } = useGetCategoriesQuery();
  const [priceRange, setPriceRange] = useState([]);
  let allBrands = [];
  let allCategory = [];
  const { pathname, query } = router;
  const { category, subCategory, childCategory, rating } = router.query;

  const { data: subCategoryData, isLoading: subCategoryLoading } =
    useGetSubCategoryQuery(category);

  useEffect(() => {
    setPriceRange([
      data?.lowestPriceProduct.price,
      data?.highestPriceProduct.price,
    ]);
  }, [data?.lowestPriceProduct, data?.highestPriceProduct]);
  data?.allResult?.map((product) => {
    const brandExists = allBrands.find((brand) => brand === product.brand);
    if (!brandExists) {
      allBrands.push(product.brand);
    }
  });
  data?.allResult?.map((product) => {
    const brandExists = allCategory.find(
      (brand) => brand === product?.category?.category
    );
    if (!brandExists) {
      allCategory.push(product?.category?.category);
    }
  });

  const handleBrandFilter = (e) => {
    if (!filter.brand.includes(e.target.value)) {
      setFilter({
        ...filter,
        brand: [...filter.brand, e.target.value],
      });
    }
    if (filter.brand.includes(e.target.value)) {
      setFilter({
        ...filter,
        brand: [...filter.brand.filter((name) => name !== e.target.value)],
      });
    }
  };

  const handlePriceChange = (event, newValue) => {
    setFilter({ ...filter, price: newValue });
    setPriceRange(newValue);

    if (typeof onChange === "function") {
      onChange(newValue);
    }
  };

  const handleSetSubCategory = (subC) => {
    setChildCategoryOpen(
      childCategoryOpen === subC?.subCategoryTitle ? "" : subC?.subCategoryTitle
    );
    setFilter({
      ...filter,
      subCategory: subC?.subCategoryTitle,
      childCategory: "",
    });
    router.push(
      `/shop?category=${category}&subCategory=${subC?.subCategoryTitle}`
    );
  };

  const handleSetChildCategory = (childCategoryData) => {
    setFilter({
      ...filter,
      childCategory: childCategoryData?.childCategoryTitle,
    });
    router.push(
      `/shop?category=${category}&subCategory=${subCategory}&childCategory=${childCategoryData?.childCategoryTitle}`
    );
  };
  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      category: category ? category : "",
      subCategory: subCategory ? subCategory : "",
      childCategory: childCategory ? childCategory : "",
      ratings: selectedRating ? selectedRating?.toString() : "",
    }));
  }, [category, subCategory, childCategory, selectedRating]);
  useEffect(() => {
    const handleResize = () => {
      const deviceWidth = window.innerWidth;
      if (deviceWidth <= 768) {
        setCatOpen(false);
        setBrandOpen(false);
        setPriceOpen(false);
      } else {
        setCatOpen(true);
        setBrandOpen(false);
        setPriceOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const childCategories = subCategoryData?.data?.subCategories?.find(
    (a) => a?.subCategoryTitle === subCategory
  )?.childCategories;

  return (
    <div className="sticky-content">
      <aside className="sidebar sidebar-shop">
        <div>
          <div className="d-flex justify-content-between align-items-center border-bottom">
            <p className="fw-bold">{t.shopPage.sideNav.filterTitle}:</p>
            <p
              onClick={() =>
                setFilter({
                  category: "",
                  size: "",
                  brand: [],
                  price: [],
                  rating: "",
                })
              }
              className="text-danger px-2 rounded fw-bold"
              style={{ cursor: "pointer" }}
              href="#"
            >
              {t.shopPage.sideNav.clearTitle}
            </p>
          </div>
          <div
            style={{ borderBottom: "0.1rem solid #ebebeb" }}
            className="shop-categories mb-3 pb-2"
          >
            <div
              className="d-flex justify-content-between align-items-center mt-3 shop-main-category-title"
              onClick={() => router.push("/shop")}
            >
              <h5>{t.shopPage.sideNav.categoryTitle}</h5>
              <i className="fa fa-caret-down"></i>
            </div>
            <Collapse in={true}>
              <div id="example-collapse-text">
                {/* sub category coll  */}
                {category && (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push(`/shop?category=${category}`)}
                    aria-controls="example-collapse-text"
                    aria-expanded={catOpen}
                    className="shop-sidebar-category"
                  >
                    <h6 style={{ color: "rgb(5 150 105/1)" }}>{category} </h6>
                    {catOpen && <i className="fa fa-caret-down"></i>}
                  </div>
                )}
                {!category &&
                  mainCategoryData?.data?.map((singleCate) => (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        router.push(`/shop?category=${singleCate?.category}`)
                      }
                      className="shop-sidebar-category"
                    >
                      <h6 style={{ color: "rgb(5 150 105/1)" }}>
                        {singleCate?.category}
                      </h6>
                      {catOpen && <i className="fa-solid fa-caret-right"></i>}
                    </div>
                  ))}
                <Collapse in={true}>
                  {category && !subCategory && (
                    <div id="example-collapse-text">
                      {subCategoryData?.data?.subCategories?.map(
                        (subC, index) => (
                          <div key={index}>
                            <div className="d-flex align-items-center justify-content-between">
                              <p
                                onClick={() => handleSetSubCategory(subC)}
                                className="shop-sub-category-item w-100 me-2"
                                key={index}
                              >
                                {subC?.subCategoryTitle}
                              </p>

                              {childCategoryOpen === subC?.subCategoryTitle ? (
                                <i className="fa fa-caret-down"></i>
                              ) : (
                                <i className="fa-solid fa-caret-right"></i>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* category end here */}

                  {subCategory && (
                    <div
                      className="d-flex align-items-center justify-content-between"
                      id="example-collapse-text"
                    >
                      <p
                        onClick={() =>
                          router.push(
                            `/shop?category=${category}&subCategory=${subCategory}`
                          )
                        }
                        className="ms-2 w-100 me-2 shop-sub-category-item sidebar-content-active"
                      >
                        {subCategory}
                      </p>
                      <i className="fa fa-caret-down"></i>
                    </div>
                  )}

                  <div className="d-flex  flex-column">
                    {!childCategory &&
                      childCategories?.map((childCategoryData) => {
                        return (
                          <p
                            onClick={() =>
                              handleSetChildCategory(childCategoryData)
                            }
                            className="ms-4 w-100 me-3 shop-sub-category-item sidebar-content-active"
                          >
                            {childCategoryData?.childCategoryTitle}
                          </p>
                        );
                      })}
                    {childCategory && (
                      <p
                        onClick={() =>
                          router.push(
                            `/shop?category=${category}&subCategory=${subCategory}&childCategory=${childCategory}`
                          )
                        }
                        className="ms-4 w-100 me-3 shop-sub-category-item sidebar-content-active"
                      >
                        {childCategory}
                      </p>
                    )}
                  </div>
                </Collapse>
              </div>
            </Collapse>
          </div>
          {/* {subCategoryData?.map((subC, index) => <p className="shop-sub-category-item" key={index}>{subC?.title}</p>)} */}

          <div
            style={{ borderBottom: "0.1rem solid #ebebeb" }}
            className="mb-3 pb-2"
          >
            <div
              onClick={() => setBrandOpen(!brandOpen)}
              aria-controls="example-collapse-text"
              aria-expanded={brandOpen}
              className="d-flex justify-content-between align-items-center"
            >
              <h5>{t.shopPage.sideNav.brandTitle}</h5>
              <i className="fa fa-caret-down"></i>
            </div>
            <Collapse in={brandOpen}>
              <div id="example-collapse-text">
                {allBrands?.map((b) => (
                  <div key={b} className="form-check">
                    <label className="form-check-label text-capitalize">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="small"
                        value={b}
                        checked={filter?.brand?.includes(b) ? true : false}
                        onClick={handleBrandFilter}
                        name="brand"
                      />

                      {b}
                    </label>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
          {/* price range  */}

          <div style={{ borderBottom: "0.1rem solid #ebebeb" }} className=" ">
            <div
              onClick={() => setPriceOpen(!priceOpen)}
              aria-controls="example-collapse-text"
              aria-expanded={priceOpen}
              className="d-flex justify-content-between align-items-center"
            >
              <h5>{t.shopPage.sideNav.priceTitle}</h5>
              <i className="fa fa-caret-down"></i>
            </div>
            <Collapse in={priceOpen}>
              <div className="price-range-slider">
                <div className="">
                  <p className="text-center">
                    {" "}
                    $
                    {filter.price.length
                      ? filter.price[0]
                      : data?.lowestPriceProduct?.price}{" "}
                    - $
                    {filter.price.length
                      ? filter.price[1]
                      : data?.highestPriceProduct?.price}
                  </p>
                </div>

                <Slider
                  size="small"
                  value={[
                    ...(filter.price.length
                      ? filter.price
                      : [
                          data?.lowestPriceProduct?.price,
                          data?.highestPriceProduct?.price,
                        ]),
                  ]}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={data?.lowestPriceProduct?.price}
                  max={data?.highestPriceProduct?.price}
                  color="primary"
                />
              </div>
            </Collapse>
          </div>

          {/* rating start from here  */}

          <div style={{ marginTop: "7px" }} className=" ">
            <div
              onClick={() => setRatingOpen(!ratingOpen)}
              className="d-flex justify-content-between align-items-center"
            >
              <h5>{t.shopPage.sideNav.ratingTitle}</h5>
              <i className="fa fa-caret-down"></i>
            </div>
            <Collapse in={ratingOpen}>
              <div className="shop-sidebar-ratings">
                <div
                  className={`rating-div ${
                    rating === "5" ? `selected-rating-div` : ""
                  }`}
                  onClick={() => {
                    setSelectedRating(5);

                    const rating = 5;
                    const updatedQuery = { ...query, rating };
                    router.replace({
                      pathname,
                      query: updatedQuery,
                    });
                  }}
                >
                  <Rating name="read-only" value={5} readOnly />
                </div>
                <div
                  className={`rating-div mt-1 ${
                    rating === "4" ? `selected-rating-div` : ""
                  }`}
                  onClick={() => {
                    setSelectedRating(4);

                    const rating = 4;
                    const updatedQuery = { ...query, rating };
                    router.push({
                      pathname,
                      query: updatedQuery,
                    });
                  }}
                >
                  <Rating name="read-only" value={4} readOnly />
                  <p className="ms-2">and Up</p>
                </div>
                <div
                  className={`rating-div mt-1 ${
                    rating === "3" ? `selected-rating-div` : ""
                  }`}
                  onClick={() => {
                    setSelectedRating(3);
                    const rating = 3;
                    const updatedQuery = { ...query, rating };
                    router.push({
                      pathname,
                      query: updatedQuery,
                    });
                  }}
                >
                  <Rating name="read-only" value={3} readOnly />
                  <p className="ms-2">and Up</p>
                </div>
                <div
                  className={`rating-div mt-1 ${
                    rating === "2" ? `selected-rating-div` : ""
                  }`}
                  onClick={() => {
                    setSelectedRating(2);
                    const rating = 2;
                    const updatedQuery = { ...query, rating };
                    router.push({
                      pathname,
                      query: updatedQuery,
                    });
                  }}
                >
                  <Rating name="read-only" value={2} readOnly />
                  <p className="ms-2">and Up</p>
                </div>
                <div
                  className={`rating-div mt-1 ${
                    rating === "1" ? `selected-rating-div` : ""
                  }`}
                  onClick={() => {
                    setSelectedRating(1);
                    const rating = 1;
                    const updatedQuery = { ...query, rating };
                    router.push({
                      pathname,
                      query: updatedQuery,
                    });
                  }}
                >
                  <Rating name="read-only" value={1} readOnly />
                  <p className="ms-2">and Up</p>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ShopSideBar;
