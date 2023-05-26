import { Collapse, Slider } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ShopSideBar = ({ data, filter, setFilter, params, t }) => {
  const router = useRouter();
  const [catOpen, setCatOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([]);
  let allBrands = [];
  let allCategory = [];

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
      router.replace("/shop");
    }
  };

  useEffect(() => {
    if (params !== "" && typeof params !== "undefined") {
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

  return (
    <div className="sticky-content">
      <aside className="sidebar sidebar-shop">
        <div>
          <div className="d-flex justify-content-between align-items-center border-bottom">
            <p className="fw-bold">{t.shopPage.sideNav.filterTitle}:</p>
            <p
              onClick={() =>
                setFilter({ category: [], size: "", brand: [], price: [] })
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
              onClick={() => setCatOpen(!catOpen)}
              aria-controls="example-collapse-text"
              aria-expanded={catOpen}
              className="d-flex justify-content-between align-items-center mt-3 "
            >
              <h5>{t.shopPage.sideNav.categoryTitle}</h5>
              <i className="fa fa-caret-down"></i>
            </div>
            <Collapse in={catOpen}>
              <div id="example-collapse-text">
                {allCategory?.map((cat) => (
                  <div key={cat} className="form-check">
                    <label className="form-check-label text-capitalize">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="small"
                        checked={
                          filter?.category?.includes(cat)
                            ? true
                            : cat === params
                            ? true
                            : false
                        }
                        value={cat}
                        onClick={handleCategoryName}
                        name="category"
                      />

                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>

          {/* <div
            style={{ borderBottom: "0.1rem solid #ebebeb" }}
            className="mb-3 pb-2"
          >
            <div
              onClick={() => setSizeOpen(!sizeOpen)}
              aria-controls="example-collapse-text"
              aria-expanded={sizeOpen}
              className="d-flex justify-content-between align-items-center"
            >
              <h5>Size</h5>
              <i className="fa fa-caret-down"></i>
            </div>
            <Collapse in={sizeOpen}>
              <div className="form-check">
                <label className="form-check-label text-capitalize">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="size"
                    value="small"
                    onClick={(e) =>
                      setFilter({ ...filter, size: e.target.value })
                    }
                    name="size"
                  />
                  Small
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label text-capitalize">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="size"
                    value="large"
                    onClick={(e) =>
                      setFilter({ ...filter, size: e.target.value })
                    }
                    name="size"
                  />
                  Large
                </label>
              </div>
            </Collapse>
          </div> */}
          {/* brand  */}
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

          <div
            style={{ borderBottom: "0.1rem solid #ebebeb" }}
            className="mb-3 pb-2"
          >
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
        </div>
      </aside>
    </div>
  );
};

export default ShopSideBar;
