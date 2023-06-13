import { Rating } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

import { MdVerifiedUser } from "react-icons/md";
import { useSelector } from "react-redux";
import Review from "./Review";

const ProductReviewSection = ({ product }) => {
  return (
    <div className="review-section-container  my-5 pb-5 product-description-container">
      <h5 className="review-container-title">
        Ratings & Reviews of {product?.title}
      </h5>
      <div className="review-statics  px-4">
        <div className="col-md-6 d-flex justify-content-between">
          <div>
            <h1>
              {product?.rating?.toFixed(1)}
              <span style={{ fontSize: "30px", color: "#9e9e9e" }}>/5</span>
            </h1>
            <Rating
              style={{ fontSize: "33px" }}
              name="read-only"
              value={parseInt(product?.rating)}
              readOnly
            />
            <p>677 Ratings </p>
          </div>
          <div>
            <div className="d-flex">
              <Rating name="read-only" value={5} readOnly />
              <p className="ms-2"> (65)</p>
            </div>
            <div className="d-flex">
              <Rating name="read-only" value={4} readOnly />
              <p className="ms-2"> (5)</p>
            </div>
            <div className="d-flex">
              <Rating name="read-only" value={3} readOnly />
              <p className="ms-2"> (6)</p>
            </div>
            <div className="d-flex">
              <Rating name="read-only" value={2} readOnly />
              <p className="ms-2"> (2)</p>
            </div>
            <div className="d-flex">
              <Rating name="read-only" value={1} readOnly />
              <p className="ms-2"> (10)</p>
            </div>
          </div>
        </div>
      </div>
      <div className="product-reviews px-4">
        <div
          style={{
            borderTop: "1px solid #eff0f5",
            borderBottom: "1px solid #eff0f5",
          }}
        >
          {product?.reviews.length > 0 && <h5 className="fs-6 mt-2">Product Reviews : </h5>}
        </div>
        <div className="all-reviews">
          {product?.reviews?.map((review) => (
            <Review review={review} key={review?._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewSection;
