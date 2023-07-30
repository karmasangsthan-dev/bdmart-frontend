import { Collapse, Slider } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useGetSubCategoryQuery } from '../../../features/product/productApi';

const ShopSideBar = ({ data, filter, setFilter, params, t }) => {
  const router = useRouter();
  const [catOpen, setCatOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([]);
  let allBrands = [];
  let allCategory = [];
  // /shop?category=Electronics&subCategory=Mobile%20Phones%20and%20Tablets

  const { category, subCategory, childCategory } = router.query;
  const { data: subCategoryData, isLoading: subCategoryLoading } =
    useGetSubCategoryQuery(category);
  console.log(subCategoryData);
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

    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  };
  const handleCategoryName = (e) => {
    if (!filter.category.includes(e.target.value)) {
      setFilter({
        ...filter,
        category: [...filter.category, e.target.value],
      });
    }

    if (filter.category.includes(e.target.value)) {
      setFilter({
        ...filter,
        category: [
          ...filter.category.filter((name) => name !== e.target.value),
        ],
      });
      router.replace('/shop');
    }
  };

  useEffect(() => {
    if (params !== '' && typeof params !== 'undefined') {
      if (!filter.category.includes(params)) {
        setFilter({
          ...filter,
          category: [...filter.category, params],
        });
      } else {
        setFilter({
          ...filter,
          category: filter.category.filter((name) => name !== params),
        });
      }
    }
  }, [params]);

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
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="sticky-content">
      <aside className="sidebar sidebar-shop">
        <div>
          <div className="d-flex justify-content-between align-items-center border-bottom">
            <p className="fw-bold">{t.shopPage.sideNav.filterTitle}:</p>
            <p
              onClick={() =>
                setFilter({ category: [], size: '', brand: [], price: [] })
              }
              className="text-danger px-2 rounded fw-bold"
              style={{ cursor: 'pointer' }}
              href="#"
            >
              {t.shopPage.sideNav.clearTitle}
            </p>
          </div>
          <div
            style={{ borderBottom: '0.1rem solid #ebebeb' }}
            className="shop-categories mb-3 pb-2"
          >
            <div
              aria-controls="example-collapse-text"
              aria-expanded={catOpen}
              className="d-flex justify-content-between align-items-center mt-3 "
            >
              <h5>{t.shopPage.sideNav.categoryTitle}</h5>
              <i className="fa fa-caret-down"></i>
            </div>
            <Collapse in={true}>
              <div id="example-collapse-text">
                {/* sub category coll  */}
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/shop?category=${category}`)}
                  aria-controls="example-collapse-text"
                  aria-expanded={catOpen}
                  className="shop-sidebar-category"
                >
                  <h6 style={{ color: 'rgb(5 150 105/1)' }}>{category} </h6>
                  {catOpen && <i className="fa fa-caret-down"></i>}
                </div>
                <Collapse in={true}>
                  {!subCategory && (
                    <div id="example-collapse-text">
                      {subCategoryData?.data?.subCategories.map(
                        (subC, index) => (
                          <>
                            <div className="d-flex align-items-center justify-content-between">
                              <p
                                // onClick={() =>
                                //   router.push(
                                //     `/shop?category=${category}&subCategory=${subC?.title}`
                                //   )
                                // }
                                className="shop-sub-category-item w-100 me-2"
                                key={index}
                              >
                                {subC?.subCategoryTitle}
                              </p>

                              <i class="fa-solid fa-caret-right"></i>
                            </div>
                            <div className="ms-3  ">
                              {subC?.childCategories?.map((child) => (
                                <p
                                  className=" my-1 p-1"
                                  style={{ background: 'whitesmoke' }}
                                >
                                  {child?.childCategoryTitle}
                                </p>
                              ))}
                            </div>
                          </>
                        )
                      )}
                    </div>
                  )}
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

                  {childCategory && (
                    <div
                      className="d-flex align-items-center justify-content-between"
                      id="example-collapse-text"
                    >
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
                    </div>
                  )}
                </Collapse>
              </div>
            </Collapse>
          </div>
          {/* {subCategoryData?.map((subC, index) => <p className="shop-sub-category-item" key={index}>{subC?.title}</p>)} */}

          <div
            style={{ borderBottom: '0.1rem solid #ebebeb' }}
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

          <div style={{ borderBottom: '0.1rem solid #ebebeb' }} className=" ">
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
                    {' '}
                    $
                    {filter.price.length
                      ? filter.price[0]
                      : data?.lowestPriceProduct?.price}{' '}
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
        </div>
      </aside>
    </div>
  );
};

export default ShopSideBar;
