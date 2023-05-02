import { Collapse, Slider } from "@mui/material";
import React, { useState } from "react";

const ShopSideBar = ({ data }) => {
  const filter = {};
  let allBrands = [];
  let allCategory = [];
  const [catOpen, setCatOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [value, setValue] = useState([0, 150]);
  const brands = data?.products?.map((product) => {
    const brandExists = allBrands.find((brand) => brand === product.brand);
    if (!brandExists) {
      allBrands.push(product.brand);
    }
  });

  const category = data?.products?.map((product) => {
    const brandExists = allCategory.find((brand) => brand === product.category);
    if (!brandExists) {
      allCategory.push(product.category);
    }
  });
  const handleOnChange = (event, newValue) => {
    setValue(newValue);
    if (typeof onChange === "function") {
      onChange(newValue);
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
                  <div className="form-check">
                    <label className="form-check-label text-capitalize">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="small"
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
              <div id="example-collapse-text">
                <div className="form-check">
                  <label className="form-check-label" for="extra-small">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="extra-small"
                    />
                    Extra Small
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" for="extra-small">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="extra-small"
                    />
                    Extra Small
                  </label>
                </div>
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
                {allBrands?.map((b, i) => {
                  return (
                    <div key={i} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="next-brand"
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
            <div className="d-flex justify-content-between align-items-center">
              <h5>Price</h5>
              <i className="fa fa-caret-down"></i>
            </div>
            <div>
              <div className="price-range-slider">
                <div className="">
                  <p className="text-center">
                    {" "}
                    ${value[0]} - ${value[1]}
                  </p>
                </div>
                <Slider
                  value={value}
                  onChange={handleOnChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={150}
                  color="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ShopSideBar;
