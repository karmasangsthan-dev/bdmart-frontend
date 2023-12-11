import { Pagination, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useCreateQuestionMutation } from "../../features/questionAndAnswer/questionAndAnswerApi";
import QuesAndAnswer from "./QuesAndAnswer";

const ProductQuestionAnswer = ({ product }) => {
  const token = localStorage.getItem("accessToken");
  const user = useSelector((state) => state?.auth?.user);
  const [question, setQuestion] = useState("");
  const router = useRouter();
  const [createQus, { isSuccess, isError, error }] =
    useCreateQuestionMutation();
  const handleCreateQuestion = () => {
    const elem = document.getElementById("question-input");

    const myQuestionData = {
      qus: question,
      qusBy: {
        fullName: user?.fullName,
        email: user?.email,
      },
      productId: product?._id,
      token: token,
    };

    if (!question) {
      toast.error("Please write your question at first...!!");
    } else {
      createQus({ token, ...myQuestionData });
      elem.value = "";
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", { id: "createQus" });
    }
  }, [isSuccess]);
  return (
    <div className="product-description-container product-question-container ">
      <h6 className="heading">
        Question About This Product ({product?.questionsAndAnswers?.length})
      </h6>

      <div className="product-questions-header">
        {!user?.email ? (
          <p className="question-login">
            <span
              onClick={() =>
                router.push({
                  pathname: "/signin",
                  query: { redirect: router.asPath },
                })
              }
              className="question-answer-login-btn"
            >
              Login
            </span>{" "}
            or{" "}
            <span
              onClick={() =>
                router.push({
                  pathname: "/signup",
                  query: { redirect: router.asPath },
                })
              }
              className="question-answer-login-btn"
            >
              Register
            </span>{" "}
            to ask questions to seller.
          </p>
        ) : (
          <div>
            <div className="question-post-container">
              <input
                id="question-input"
                onChange={(e) => setQuestion(e.target.value)}
                type="text"
                placeholder="Ask seller a question"
              />
              <button onClick={handleCreateQuestion}>Ask Question</button>
            </div>

            {user?.email &&
              product?.questionsAndAnswers?.filter(
                (qus) => qus.qusBy.email === user.email
              ).length > 0 && (
                <div>
                  <p>
                    My Questions (
                    {
                      product?.questionsAndAnswers.filter(
                        (qus) => qus.qusBy.email === user.email
                      ).length
                    }
                    )
                  </p>
                  <div className="">
                    {product?.questionsAndAnswers
                      .filter((qus) => qus.qusBy.email === user.email)
                      .slice(-3)
                      .reverse()
                      .map((question, index) => (
                        <QuesAndAnswer
                          user={user}
                          question={question}
                          key={index}
                          index={index}
                        />
                      ))}
                  </div>
                </div>
              )}
          </div>
        )}
        <p>
          Other questions answered by Bangladesh Mart (
          {
            product?.questionsAndAnswers?.filter(
              (qus) => qus.qusBy.email !== user?.email
            ).length
          }
          )
        </p>
      </div>

      <div className="all-qna product-questions">
        {product?.questionsAndAnswers
          ?.filter((qus) => qus.qusBy.email !== user?.email)
          .slice()
          .reverse()
          .map((question, index) => {
            return (
              <QuesAndAnswer user={user} question={question} key={index} />
            );
          })}
      </div>
      {product?.questionsAndAnswers?.length > 0 && (
        <div className="questions-pagination ">
          <Pagination
            count={product?.questionsAndAnswers?.length || 5 / 5}
            variant="outlined"
            color="primary"
            shape="rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ProductQuestionAnswer;
