import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { User } from "lucide-react";
import { getQuestion, deleteQuestion } from "../api/questionService";
import CommentSection from "../../comments/components/CommentSection";

export default function QuestionPage() {
  const [question, setQuestion] = useState(null);

  const { questionId } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor =
    question && userData ? question.author?.id === userData.id : false;

  useEffect(() => {
    if (questionId) {
      getQuestion(questionId)
        .then((response) => {
          if (response.data) {
            setQuestion(response.data);
          } else {
            navigate("/");
          }
        })
        .catch(() => {
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [questionId, navigate]);

  const handleDeleteQuestion = async () => {
    try {
      await deleteQuestion(questionId);
      navigate("/all-questions");
    } catch (error) {
      console.error(error.response?.data || "Failed to delete question");
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
              <div className="shrink-0 flex gap-2">
                <Link to={`/questions/${question.id}/edit`}>
                  <Button bgColor="bg-green-500">Edit</Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={handleDeleteQuestion}>
                  Delete
                </Button>
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

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={`/questions/${question.id}/submit-solution`}>
                <Button>Submit Your Solution</Button>
              </Link>

              <Link to={`/questions/${question.id}/solutions`}>
                <Button bgColor="bg-green-500">View All Solutions</Button>
              </Link>
              
              <Link to={`/questions/${question.id}/report`}>
                <Button bgColor="bg-red-500">Report</Button>
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

            <CommentSection questionId={question.id} />
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
