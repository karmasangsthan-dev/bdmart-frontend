import { Slider } from "@mui/material";
import React, { useState } from "react";

const ShopSideBar = () => {
  const [value, setValue] = useState([0, 150]);
  const handleOnChange = (event, newValue) => {
    setValue(newValue);
    if (typeof onChange === "function") {
      onChange(newValue);
    }
  };
  return (
    <aside className="">
      <div className="d-flex justify-content-between">
        <label htmlFor="filter">Filter:</label>
        <p className="bg-danger px-2 rounded text-white">Clear</p>
      </div>
      <div
        style={{ borderBottom: "0.1rem solid #ebebeb" }}
        className="shop-categories mb-3 pb-2"
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5>Category</h5>
          <i className="fa fa-caret-down"></i>
        </div>
        {/* {category?.map((cat) => (
                  <li>{cat}</li>
                ))} */}
      </div>
      <div
        style={{ borderBottom: "0.1rem solid #ebebeb" }}
        className="mb-3 pb-2"
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5>Size</h5>
          <i className="fa fa-caret-down"></i>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="extra-small"
          />
          <label className="form-check-label" for="extra-small">
            Extra Small
          </label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="small" />
          <label className="form-check-label" for="small">
            Small
          </label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="medium" />
          <label className="form-check-label" for="medium">
            Medium
          </label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="large" />
          <label className="form-check-label" for="large">
            Large
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="extra-large"
          />
          <label className="form-check-label" for="extra-large">
            Extra Large
          </label>
        </div>
      </div>
      {/* brand  */}
      <div
        style={{ borderBottom: "0.1rem solid #ebebeb" }}
        className="mb-3 pb-2"
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5>Brand</h5>
          <i className="fa fa-caret-down"></i>
        </div>
        {/* {brands?.map((b) => {
                  return (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="next-brand"
                      />
                      <label
                        className="form-check-label"
                        for="next-brand"
                      >
                        {b}
                      </label>
                    </div>
                  );
                })} */}
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
            <div className="d-flex justify-content-between">
              <h6>{/* Price Range: ${value[0]} - ${value[1]} */}</h6>
              <span>filter</span>
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
    </aside>
  );
};

export default ShopSideBar;
