import { Rating } from "@mui/material";
import React from "react";
import { BsTicket } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";

const ProductReviewSection = ({ product }) => {
  console.log(product?.reviews);
  return (
    <div className="review-section-container  my-5  product-description-container">
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
          <h5 className="fs-6 mt-2">Product Reviews : </h5>
        </div>
        <div className="all-reviews">
          {product?.reviews?.map((review) => (
            <div className="review-card border card px-3 py-2 mb-3">
              <Rating name="read-only" value={review?.ratings} readOnly />

              <p>
                By{" "}
                <span className="fw-medium text-capitalize">
                  {review?.reviewedBy.fullName}
                </span>
                .{" "}
                <span className="text-success ">
                  <MdVerifiedUser className="text-success fs-5" />
                  Verified Purchase
                </span>
              </p>
              <p>{review?.review}</p>
              <div>
                {review?.images.map((imgUrl) => (
                  <img
                    width="100"
                    height="100"
                    src={imgUrl}
                    alt="facebook-like--v1"
                    className="mx-2 mt-3 border"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewSection;
