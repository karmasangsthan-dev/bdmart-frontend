import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useMakeAnswerMutation } from "../../features/questionAndAnswer/questionAndAnswerApi";

export default function QuesAndAnswer({ question, user }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyAnswer, setReplyAnswer] = useState("");
  const [makeAnswer, { isSuccess, isError, error }] = useMakeAnswerMutation();

  function getTimeAgo(timestamp) {
    const dbTimestamp = new Date(timestamp);
    const currentTimestamp = new Date();
    const timeDiff = currentTimestamp - dbTimestamp;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    const labels = ["years", "months", "days", "hours", "minutes", "seconds"];
    const timeAgoValues = [years, months, days, hours, minutes, seconds];

    const index = timeAgoValues.findIndex((value) => value > 0);

    let timeAgoString;
    if (index === -1) {
      timeAgoString = "just now";
    } else if (index === 3 && days === 1) {
      timeAgoString = "yesterday";
    } else {
      timeAgoString = `${timeAgoValues[index]} ${labels[index]} ago`;
    }

    return timeAgoString;
  }
  function getAnsweredWithin(createdTimestamp, updatedTimestamp) {
    const createdDate = new Date(createdTimestamp);
    const updatedDate = new Date(updatedTimestamp);
    const timeDiff = updatedDate - createdDate;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0) {
      return `Answered within ${months} month${months !== 1 ? "s" : ""}`;
    } else if (days > 0) {
      return `Answered within ${days} day${days !== 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `Answered within ${hours} hour${hours !== 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      return `Answered within ${minutes} minute${minutes !== 1 ? "s" : ""}`;
    } else {
      return `Answered within ${seconds} second${seconds !== 1 ? "s" : ""}`;
    }
  }

  const handleAnswerSubmit = async () => {
    const myQuestionData = {
      ans: replyAnswer,
      ansBy: "Bangladesh Mart",
      questionId: question?._id,
    };
    if (!replyAnswer) {
      toast.error("Please add a reply at first...!!");
    } else {
      makeAnswer(myQuestionData);
    }
  };

  return (
    <>
      <div className="product-question">
        <div className="product-qna-admin-reply ">
          <span>
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios-filled/50/FA5252/circled-q.png"
              alt="circled-q"
            />
          </span>
          <div>
            <div className="qna-text">{question?.qus}</div>
            <div className="question-desc">
              {question?.qusBy?.fullName} - {getTimeAgo(question?.createdAt)}
            </div>
          </div>
        </div>
        {!question?.answers.length ? (
          <>
            <div className="product-qna-admin-reply ">
              <span style={{ width: "20px", height: "20px" }}></span>
              <div className="question-desc">No answer yet</div>
            </div>
            <div>
              {user?.role === "admin" && question?.answers.length == 0 && (
                <div>
                  <div className="d-flex justify-content-end">
                    <label
                      htmlFor="message-text"
                      className="question-admin-reply-button "
                      onClick={() => setShowReplyInput(!showReplyInput)}
                    >
                      {showReplyInput ? "Close Answer" : "Make a Answer"}
                    </label>
                  </div>
                  {showReplyInput && (
                    <div className="question-post-container">
                      <input
                        className="answer-admin-input"
                        id="answer-input"
                        type="text"
                        placeholder="Enter your answer"
                        onChange={(e) => setReplyAnswer(e.target.value)}
                      />
                      <button onClick={handleAnswerSubmit} className="">
                        Submit Answer
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div>
            {question?.answers?.map((answer) => (
              <div className="product-qna ">
                <span>
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/ios-filled/50/40C057/xbox-a.png"
                    alt="xbox-a"
                  />
                </span>

                <div>
                  <div className="qna-text-reply">{answer?.ans}</div>
                  <div className="question-desc">
                    {answer.ansBy} -{" "}
                    {getAnsweredWithin(
                      question?.createdAt,
                      question?.updatedAt
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
