import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { User, ChevronDown, ChevronUp } from "lucide-react";
import {
  getQuestion,
  deleteQuestion,
  getQuestionVotes,
  voteQuestion,
} from "../api/questionService";
import CommentSection from "../../comments/components/CommentSection";
import { getAllSolutions } from "../../discussion/api/solutionService";

export default function QuestionPage() {
  const [question, setQuestion] = useState(null);
  const [solutions, setSolutions] = useState([]);

  const { questionId } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor =
    question && userData ? question.author?.id === userData.id : false;

  const [votes, setVotes] = useState({
    upvotes: 0,
    downvotes: 0,
    score: 0,
  });

  const loadVotes = async () => {
    try {
      const response = await getQuestionVotes(questionId);
      setVotes(response.data);
    } catch (error) {
      console.error("Failed to load votes", error.response?.data);
    }
  };

  useEffect(() => {
    if (!questionId) {
      navigate("/");
      return;
    }

    const fetchQuestion = async () => {
      try {
        const response = await getQuestion(questionId);

        if (response.data) {
          setQuestion(response.data);
          loadVotes();
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error(error.response?.data || "Failed to load question");
        navigate("/");
      }
    };

    const fetchSolutions = async () => {
      try {
        const response = await getAllSolutions(questionId);

        setSolutions(response.data.slice(0, 3));
      } catch (error) {
        console.error(error.response?.data || "Failed to load solutions");
      }
    };

    fetchQuestion();
    fetchSolutions();
  }, [questionId, navigate]);

  const handleDeleteQuestion = async () => {
    try {
      await deleteQuestion(questionId);
      navigate("/all-questions");
    } catch (error) {
      console.error(error.response?.data || "Failed to delete question");
    }
  };

  const handleVote = async (voteType) => {
    try {
      await voteQuestion(questionId, { vote_type: voteType });
      await loadVotes();
    } catch (error) {
      console.error(error.response?.data || "Failed to vote");
    }
  };

  return question ? (
    <div className="py-8 bg-white dark:bg-gray-900 min-h-screen duration-200">
      <Container>
        {/* Title Bar */}
        <div className="w-full border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-normal text-gray-800 dark:text-white wrap-break-word pr-4">
              {question.title}
            </h1>

            {isAuthor && (
              <div className="shrink-0 flex items-center gap-2">
                <Link
                  to={`/questions/${question.id}/edit`}
                  className="px-3 py-1.5 rounded-md
                 text-sm font-medium
                 text-gray-600 dark:text-gray-300
                 border border-gray-300 dark:border-gray-600
                 hover:bg-gray-100 dark:hover:bg-gray-800
                 transition-colors duration-200"
                >
                  Edit
                </Link>

                <button
                  onClick={handleDeleteQuestion}
                  className="px-3 py-1.5 rounded-md
                 text-sm font-medium
                 text-gray-500 dark:text-gray-400
                 hover:text-red-600 dark:hover:text-red-400
                 hover:bg-red-50 dark:hover:bg-red-900/20
                 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Meta row like SO's "Asked ... Viewed ..." */}
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
            {question.difficulty_level && (
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300">
                {question.difficulty_level}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex gap-4">
          <div className="w-16 shrink-0 flex flex-col items-center gap-2">
            {/* Upvote Button */}
            <button
              onClick={() => handleVote("upvote")}
              className="p-2 rounded-full text-gray-500 hover:text-orange-500 hover:bg-orange-50 dark:text-gray-400 dark:hover:text-orange-400 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Upvote"
            >
              <ChevronUp size={32} strokeWidth={2} />
            </button>

            {/* Score */}
            <span className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              {votes.score}
            </span>

            {/* Downvote Button */}
            <button
              onClick={() => handleVote("downvote")}
              className="p-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Downvote"
            >
              <ChevronDown size={32} strokeWidth={2} />
            </button>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Description */}
            <div className="browser-css text-gray-800 dark:text-gray-100">
              {parse(question.description || "")}
            </div>

            {/* Company / Role / Tag */}
            <div className="flex flex-wrap gap-2 mt-6">
              {question.company_full?.map((c) => (
                <span
                  key={c.id}
                  className="px-2.5 py-1 text-xs rounded bg-purple-50 text-purple-700 border border-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
                >
                  🏢 {c.name}
                </span>
              ))}

              {question.job_role_full && (
                <span className="px-2.5 py-1 text-xs rounded bg-green-50 text-green-700 border border-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">
                  💼 {question.job_role_full.name}
                </span>
              )}

              {question.tag_full?.map((t) => (
                <span
                  key={t.id}
                  className="px-2.5 py-1 text-xs rounded bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                >
                  #{t.name}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {/* Submit Solution */}
              <Link
                to={`/questions/${question.id}/submit-solution`}
                className="inline-flex items-center px-4 py-2 rounded-md
               bg-gray-900 text-white text-sm font-medium
               hover:bg-gray-700
               dark:bg-gray-100 dark:text-gray-900
               dark:hover:bg-gray-300
               transition-colors duration-200"
              >
                Submit Your Solution
              </Link>

              {/* View All Solutions */}
              <Link
                to={`/questions/${question.id}/solutions`}
                className="inline-flex items-center px-4 py-2 rounded-md
               border border-gray-300 dark:border-gray-600
               text-gray-700 dark:text-gray-200
               text-sm font-medium
               hover:bg-gray-100 dark:hover:bg-gray-800
               transition-colors duration-200"
              >
                View All Solutions
              </Link>

              {/* Report */}
              <Link
                to={`/questions/${question.id}/report`}
                className="inline-flex items-center px-4 py-2 rounded-md
               text-sm font-medium
               text-gray-500 dark:text-gray-400
               hover:text-red-600 dark:hover:text-red-400
               hover:bg-red-50 dark:hover:bg-red-900/20
               transition-colors duration-200"
              >
                Report
              </Link>
            </div>

            {/* Author card - bottom right, SO style */}
            <div className="flex justify-end mt-6">
              <div className="bg-blue-50 dark:bg-gray-800 rounded-md p-3 flex items-center gap-3">
                {question.author?.avatar ? (
                  <img
                    src={question.author.avatar}
                    alt={question.author?.username || "Author"}
                    className="w-8 h-8 rounded object-cover border border-gray-200 dark:border-gray-600"
                  />
                ) : (
                  <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center border border-gray-200 dark:border-gray-600">
                    <User
                      size={16}
                      className="text-gray-500 dark:text-gray-300"
                    />
                  </div>
                )}
                <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                  {question.author?.username || "Anonymous"}
                </span>
              </div>
            </div>

            {solutions.length > 0 && (
              <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                  Solutions
                </h2>

                <div className="space-y-8">
                  {solutions.map((solution) => (
                    <div
                      key={solution.id}
                      className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                    >
                      {/* Solution Author */}
                      <div className="flex justify-start mb-5">
                        <div className="max-w-full bg-blue-50 dark:bg-gray-900 rounded-md p-3 flex items-center gap-3">
                          {solution.author?.avatar ? (
                            <img
                              src={solution.author.avatar}
                              alt={solution.author?.username || "Author"}
                              className="w-8 h-8 rounded object-cover border border-gray-200 dark:border-gray-600 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center border border-gray-200 dark:border-gray-600 flex-shrink-0">
                              <User
                                size={16}
                                className="text-gray-500 dark:text-gray-300"
                              />
                            </div>
                          )}

                          <span className="text-sm text-blue-700 dark:text-blue-300 font-medium break-words">
                            {solution.author?.username || "Anonymous"}
                          </span>
                        </div>
                      </div>

                      {/* Solution Content */}
                      <div className="browser-css text-gray-800 dark:text-gray-100 break-words overflow-hidden">
                        {parse(solution.content || "")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Solutions Link */}
                <div className="mt-6">
                  <Link
                    to={`/questions/${question.id}/solutions`}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    See all solutions →
                  </Link>
                </div>
              </div>
            )}

            <CommentSection questionId={question.id} />
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
