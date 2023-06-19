import React from "react";

export default function QuesAndAnswer({ question }) {
  return (
    <>
      <div className="product-question">
        <div className="product-qna ">
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
              {question?.qusBy?.fullName} - 1 second ago
            </div>
          </div>
        </div>
        {!question?.answers.length ? (
          <div className="product-qna ">
            <span style={{ width: "20px", height: "20px" }}></span>
            <div className="question-desc">No answer yet</div>
          </div>
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
                  <div className="qna-text">{answer?.ans}</div>
                  <div className="question-desc">{answer.ansBy}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
