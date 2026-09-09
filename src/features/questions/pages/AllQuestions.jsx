import React, { useEffect, useState } from "react";
import Container from "../../../components/Container";
import QuestionCard from "../components/QuestionCard";
import { getAllQuestion } from "../api/questionService";
import { useSelector } from "react-redux";
import { Link, redirect } from "react-router-dom";

function AllQuestions() {
  const [questions, setQuestions] = useState([]);

  const userData = useSelector((state) => state.auth.userData);
  const isVerified = userData?.account_status === "active";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getAllQuestion();
        setQuestions(response.data);
      } catch (error) {
        console.error(error.response?.data || "Failed to fetch questions");
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="w-full py-8 bg-white dark:bg-gray-800">
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase text-gray-800 dark:text-white">
            Interview Questions
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Practice real interview questions and improve your preparation.
          </p>
        </div>

        <div className="flex flex-wrap">
          {questions.map((question) => (
            <div key={question.id} className="p-2 w-full sm:w-1/2 lg:w-1/3">
              <QuestionCard {...question} isVerified={isVerified} />
            </div>
          ))}
        </div>

        {/* Email verification message */}
        {!isVerified && (
          <div className="mt-8 flex items-center justify-center">
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-md
                    bg-slate-900 dark:bg-slate-700
                    text-white shadow-sm"
            >
              <span className="text-sm text-gray-200">
                Verify your email to view question details.
              </span>

              <Link
                to="/verification-email-sent"
                state={{
                  from: "verify-email",
                  user: userData,
                }}
                className="text-sm font-semibold text-white
                   underline underline-offset-4
                   hover:text-gray-300
                   transition-colors"
              >
                Verify now
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllQuestions;
