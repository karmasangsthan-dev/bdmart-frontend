import { Collapse, Slider } from "@mui/material";
import React, { useState } from "react";

const ShopSideBar = ({ data, filter, setFilter }) => {
  const [catOpen, setCatOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([
    data?.lowestPriceProduct?.price,
    data?.highestPriceProduct?.price,
  ]);
  let allBrands = [];
  let allCategory = [];

  data?.data?.map((product) => {
    const brandExists = allBrands.find((brand) => brand === product.brand);
    if (!brandExists) {
      allBrands.push(product.brand);
    }
  });
  data?.data?.map((product) => {
    const brandExists = allCategory.find((brand) => brand === product.category);
    if (!brandExists) {
      allCategory.push(product.category);
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
  // console.log(data?.highestPriceProduct);

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
    }
  };
  return (
    <div className="sticky-content">
      <aside className="sidebar sidebar-shop">
        <div>
          <div className="widget  widget-clean">
            <label htmlFor="filter">Filter:</label>
            <a className="sidebar-filter-clear" href="#">
              Clean All
            </a>
          </div>
          <div
            style={{ borderBottom: "0.1rem solid #ebebeb" }}
            className="shop-categories mb-3 pb-2"
          >
            <div
              onClick={() => setCatOpen(!catOpen)}
              aria-controls="example-collapse-text"
              aria-expanded={catOpen}
              className="d-flex justify-content-between align-items-center"
            >
              <h5>Category</h5>
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

          <div
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
          </div>
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
              <h5>Brand</h5>
              <i className="fa fa-caret-down"></i>
            </div>
            <Collapse in={brandOpen}>
              <div id="example-collapse-text">
                {allBrands?.map((b) => {
                  return (
                    <div key={b} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="next-brand"
                        value={b}
                        onChange={handleBrandFilter}
                        name={b}
                      />
                      <label className="form-check-label" for="next-brand">
                        {b}
                      </label>
                    </div>
                  );
                })}
              </div>
            </Collapse>
          </div>
          {/* price range  */}

          <div
            style={{ borderBottom: "0.1rem solid #ebebeb" }}
            className="mb-3 pb-2s"
          >
            <div
              onClick={() => setPriceOpen(!priceOpen)}
              aria-controls="example-collapse-text"
              aria-expanded={priceOpen}
              className="d-flex justify-content-between align-items-center"
            >
              <h5>Price</h5>
              <i className="fa fa-caret-down"></i>
            </div>
            <Collapse in={priceOpen}>
              <div className="price-range-slider">
                <div className="">
                  <p className="text-center">
                    {" "}
                    ${priceRange[0]} - ${priceRange[1]}
                  </p>
                </div>

                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={data?.lowestPriceProduct?.price || 0}
                  max={data?.highestPriceProduct?.price || 0}
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