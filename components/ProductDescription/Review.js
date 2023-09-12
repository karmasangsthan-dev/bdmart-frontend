import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Popper,
  Rating,
} from "@mui/material";
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
import {
  useLikeOnReviewMutation,
  useMakeReplyMutation,
  useUnLikeReviewMutation,
} from "../../features/review/reviewApi";
import { MoreVert } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function Review({ review }) {
  const user = useSelector((state) => state?.auth?.user);
  const seller = useSelector((state) => state?.auth?.seller);
  const [reviewReply, setReviewReply] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(null);
  const [like, setLike] = useState(false);
  const [unlike, setUnlike] = useState(false);
  const router = useRouter();

  const [makeReply, { isSuccess, isLoading }] = useMakeReplyMutation();

  const [likeOnReview, { isSuccess: success, isError: isErr }] =
    useLikeOnReviewMutation();
  const [unLikeReview] = useUnLikeReviewMutation();
  useLikeOnReviewMutation();

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

  const handleLike = () => {
    setLike(!like);
    likeOnReview({ reviewId: review?._id, email: user?.email });
  };
  const handleUnlike = () => {
    setLike(!like);
    unLikeReview({ reviewId: review?._id, email: user?.email });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success");
    }
  }, [isSuccess]);
  const handleNavigateInSignInPage = () => {
    if (!seller?.email) {
      router.push({
        pathname: "/signin",
        query: { redirect: router.asPath },
      })
    }
    else {
      toast.error('You are a seller, you cannot like any review')
    }
  }

  return (
    <div className="review-card  px-3 py-2 mb-3 ">
      <div className="rating-time-container">
        <Rating
          name="read-only"
          value={review?.ratings}
          readOnly
          className="fs-5"
        />
        <span className="verified-purchage">
          {formattedDate(review.createdAt)}
        </span>
      </div>

      <p style={{ color: "gray" }} className="verified-purchage my-2">
        by <span className="">{review?.reviewedBy?.fullName}</span>
        <span className="text-success verified-purchage">
          <MdVerifiedUser className="text-success fs-6 ms-2 me-1" />
          Verified Purchase
        </span>
      </p>
      <p className="qna-text-review my-2">{review?.review}</p>
      <div>
        {review?.images?.map((imgUrl, index) => (
          <img
            key={index}
            width="90"
            height="90"
            src={imgUrl}
            alt="facebook-like--v1"
            className="me-2 border"
          />
        ))}
      </div>
      <div className="review-like-container ms-1 mt-2 d-flex gap-5 align-items-center">
        <div className="d-flex align-items-center gap-2">
          {user?.email ? (
            <span>
              {review.likes.likedBy.find((email) => email === user.email) ? (
                <FaThumbsUp
                  className="fs-6 text-primary review-like-btn"
                  onClick={handleUnlike}
                />
              ) : (
                <FaRegThumbsUp className="fs-6 review-like-btn" onClick={handleLike} />
              )}
            </span>
          ) : (
            <FaRegThumbsUp

              className="fs-6 review-like-btn"
              onClick={() => handleNavigateInSignInPage()}
            />
          )}
          <span className="verified-purchage">
            ({review?.likes?.totalLikes || 0})
          </span>
        </div>
      </div>

      {user?.role === "admin" && (
        <div className="ms-5">
          <div className="review-replay-form my-2  ">
            <label
              htmlFor="message-text"
              className="col-form-label fw-medium "
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              Make a Reply
            </label>
            {showReplyInput && (
              <div className="d-flex gap-2">
                <textarea
                  onChange={(e) => setReviewReply(e.target.value)}
                  placeholder="Type here reply"
                  className="form-control border- "
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

      {review?.replies?.map((rep, index) => (
        <div
          key={index}
          className="seller-reply-wrapper  ms-5 mb-3 "
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
      <div className="pb-3" style={{ position: "relative" }}>
        <p className="review-three-dots">
          <IconButton
            aria-label="more"
            aria-controls="dots-menu"
            aria-haspopup="true"
          >
            <MoreVert />
          </IconButton>
        </p>
      </div>
    </div>
  );
}
