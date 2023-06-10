import { Rating } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsTicket } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { useSelector } from "react-redux";

const ProductReviewSection = ({ product }) => {
  const user = useSelector((state) => state?.auth?.user);
  const [reviewReply,setReviewReply] = useState('');
  console.log(product?.reviews);
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
          <h5 className="fs-6 mt-2">Product Reviews : </h5>
        </div>
        <div className="all-reviews">
          {product?.reviews?.map((review) => (
            <div className="review-card border card px-3 py-2 mb-3 shadow">
              <Rating name="read-only" value={review?.ratings} readOnly />

              <p>
                By{" "}
                <span className="fw-medium text-capitalize">
                  {review?.reviewedBy?.fullName}
                </span>
                .{" "}
                <span className="text-success ">
                  <MdVerifiedUser className="text-success fs-5" />
                  Verified Purchase
                </span>
              </p>
              <p>{review?.review}</p>
              <div>
                {review?.images?.map((imgUrl) => (
                  <img
                    width="100"
                    height="100"
                    src={imgUrl}
                    alt="facebook-like--v1"
                    className="mx-2 mt-3 border"
                  />
                ))}
              </div>
              <div className="review-like-container">
                <img width="25" height="25" src="https://img.icons8.com/color/48/facebook-like--v1.png" alt="facebook-like--v1" /> <span>(12)</span>

              </div>
              {
                review?.replies && review?.replies?.map(reply => <div
                  className="seller-reply-wrapper"
                  data-spm-anchor-id="a2a0e.pdp.ratings_reviews.i3.1b4cW6q4W6q46N"
                >
                  <div className="item-content item-content--seller-reply">
                    <div className="item-title">
                      <img
                        className="seller-reply-badge"
                        src="//laz-img-cdn.alicdn.com/tfs/TB1dNTKpqQoBKNjSZJnXXaw9VXa-24-24.png"
                      />
                      <span>Respond from store - 4 weeks ago</span>
                    </div>
                    <div
                      className=""

                    >
                      {reply?.reply}
                    </div>
                    <div className="review-like-container">
                      <img width="25" height="25" src="https://img.icons8.com/color/48/facebook-like--v1.png" alt="facebook-like--v1" /> <span>(5)</span>

                    </div>

                  </div>
                </div>)
              }
              {
                review?.replies.length === 0 && user?.role === 'admin' ?
                  <div className="review-replay-form p-3 border mt-4">
                    <label for="message-text" class="col-form-label">Admin Reply :</label>
                    <textarea onChange={(e)=> setReviewReply(e.target.value)} placeholder="Type here reply" class="form-control" id="message-text"></textarea>
                    <button onClick={()=>{
                      toast.success(reviewReply)
                    }} className="btn btn-info text-white mt-2">Submit</button>
                  </div> : <></>
              }
              {/* {
                review?.replies.length === 0 && <div
                  className="seller-reply-wrapper"
                  data-spm-anchor-id="a2a0e.pdp.ratings_reviews.i3.1b4cW6q4W6q46N"
                >
                  <div className="item-content item-content--seller-reply">
                    <div className="item-title">
                      <img
                        className="seller-reply-badge"
                        src="//laz-img-cdn.alicdn.com/tfs/TB1dNTKpqQoBKNjSZJnXXaw9VXa-24-24.png"
                      />
                      <span>Respond from store - 4 weeks ago</span>
                    </div>
                    <div
                      className=""

                    >
                      মূল্যবান মতামতের জন্য অনেক অনেক ধন্যবাদ। 'Bangladesh Mart' এর পক্ষ থেকে আপনাক অভিনন্দন
                    </div>
                    <div className="review-like-container">
                      <img width="25" height="25" src="https://img.icons8.com/color/48/facebook-like--v1.png" alt="facebook-like--v1" /> <span>(5)</span>

                    </div>

                  </div>
                </div>
              } */}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewSection;
