import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { useSelector } from "react-redux";
import { useMakeReplyMutation } from "../../features/review/reviewApi";

export default function Review({ review }) {
  const user = useSelector((state) => state?.auth?.user);
  const [reviewReply, setReviewReply] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(null);
  const [like, setLike] = useState(false);
  const [unlike, setUnlike] = useState(false);

  const [makeReply, { isSuccess, isLoading }] = useMakeReplyMutation();
  const formattedDate = (createdAt) => {
    const date = new Date(createdAt);
    const formatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return formatted;
  };

  const handleReply = () => {
    if (!reviewReply) {
      return toast.error("Please write something !!!");
    }
    const repliedBy = "Bangladesh Mart";
    const reviewId = review?._id;
    makeReply({ repliedBy, reply: reviewReply, reviewId });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Success");
    }
  }, [isSuccess]);

  return (
    <div className="review-card  px-3 py-2 mb-3 ">
      <Rating
        name="read-only"
        value={review?.ratings}
        readOnly
        className="fs-5"
      />

      <p>
        By{" "}
        <span className="fw-medium text-capitalize">
          {review?.reviewedBy?.fullName}
        </span>
        . <br />
        {formattedDate(review.createdAt)}{" "}
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
      <div className="review-like-container ms-1 mt-2 d-flex gap-5 align-items-center">
        <div className="d-flex align-items-center gap-2">
          {!like ? (
            <FaRegThumbsUp className="fs-5" onClick={() => setLike(!like)} />
          ) : (
            <FaThumbsUp
              className="fs-5 text-primary"
              onClick={() => setLike(!like)}
            />
          )}
          <span>(12)</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          {!unlike ? (
            <FaRegThumbsDown
              className="fs-5 mt-2"
              onClick={() => setUnlike(!unlike)}
            />
          ) : (
            <FaThumbsDown
              className="fs-5 text-primary mt-2"
              onClick={() => setUnlike(!unlike)}
            />
          )}
          <span>(12)</span>
        </div>
      </div>

      {user?.role === "admin" && (
        <div className="ms-5">
          <div className="review-replay-form my-2  ">
            <label
              for="message-text"
              class="col-form-label fw-medium "
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              Make a Reply
            </label>
            {showReplyInput && (
              <div className="d-flex gap-2">
                <textarea
                  onChange={(e) => setReviewReply(e.target.value)}
                  placeholder="Type here reply"
                  class="form-control border- "
                  id="message-text"
                />
                <button
                  onClick={handleReply}
                  className="btn btn-info text-white mt-2 py-2"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {review?.replies?.map((rep) => (
        <div
          className="seller-reply-wrapper  ms-5 mb-2"
          data-spm-anchor-id="a2a0e.pdp.ratings_reviews.i3.1b4cW6q4W6q46N"
        >
          <div className="item-content item-content--seller-reply">
            <div className="item-title">
              <img
                className="seller-reply-badge rounded-pill me-1"
                src="//laz-img-cdn.alicdn.com/tfs/TB1dNTKpqQoBKNjSZJnXXaw9VXa-24-24.png"
              />
              <span>
                Respond from{" "}
                <span className="text-warning fw-bold">{rep?.repliedBy}</span> -
                {formattedDate(rep.createdAt)}{" "}
              </span>
            </div>
            <div className="">{rep?.reply}</div>
          </div>
        </div>
      ))}
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
  );
}
