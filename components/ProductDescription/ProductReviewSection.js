import { Pagination, Rating } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

import { MdVerifiedUser } from "react-icons/md";
import { useSelector } from "react-redux";
import Review from "./Review";

const ProductReviewSection = ({ product }) => {


  const { reviews } = product;
  const totalReviews = reviews.length;
  const ratingsCount = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach(review => {
    const rating = review.ratings;
    if (rating >= 1 && rating <= 5) {
      ratingsCount[rating] += 1;
    }
  });

  const ratingsSum = reviews.reduce((sum, review) => sum + review.ratings, 0);
  const averageRating = totalReviews ? ratingsSum / totalReviews : 0;

console.log(ratingsSum,'product rev')

  return (
    <div className="review-section-container  my-5  product-description-container">
      <h5 className="review-container-title">
        Ratings & Reviews of {product?.title}
      </h5>
      <div className="review-statics  px-4">
        <div className="col-md-6 all-ratings-count">
          <div>
            <h1>
              {averageRating ? averageRating?.toFixed(0) : '0'}
              <span style={{ fontSize: "25px", color: "#9e9e9e" }}>/5</span>
            </h1>
            <Rating
              style={{ fontSize: "33px" }}
              name="read-only"
              value={parseInt(averageRating ? averageRating : '5')}
              readOnly
            />
            <p>{totalReviews} Ratings </p>
          </div>
          <div>
            <div className="d-flex">
              <Rating name="read-only" value={5} readOnly />
              <p className="ms-2"> ({ratingsCount[5]})</p>
            </div>
            <div className="d-flex">
              <Rating name="read-only" value={4} readOnly />
              <p className="ms-2"> ({ratingsCount[4]})</p>
            </div>
            <div className="d-flex">
              <Rating name="read-only" value={3} readOnly />
              <p className="ms-2"> ({ratingsCount[3]})</p>
            </div>
            <div className="d-flex">
              <Rating name="read-only" value={2} readOnly />
              <p className="ms-2"> ({ratingsCount[2]})</p>
            </div>
            <div className="d-flex">
              <Rating name="read-only" value={1} readOnly />
              <p className="ms-2"> ({ratingsCount[1]})</p>
            </div>
          </div>
        </div>
      </div>
      <div className="product-reviews px-4">
        <div
          style={{


          }}
        >
          {product?.reviews.length > 0 && <h5 className="fs-6 mt-2">Product Reviews : ({product?.reviews.length}) </h5>}
        </div>

      </div>
      <div className="all-reviews">
        {product?.reviews?.slice(0, 5).reverse().map((review) => (
          <Review review={review} key={review?._id} />
        ))}
      </div>
      <div className='questions-pagination review-pagination py-4'>
        <Pagination count={100} siblingCount={0}  boundaryCount={2} variant="outlined" color="primary" shape="rounded" />
      </div>
    </div>
  );
};

export default ProductReviewSection;
