import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../components/Container";
import { getAllSolutions, deleteSolution } from "../api/solutionService";
import { User } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function AllSolutions() {
  const [solutions, setSolutions] = useState([]);
  const { questionId } = useParams();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await getAllSolutions(questionId);
        setSolutions(response.data);
      } catch (error) {
        console.error(error.response?.data || "Failed to fetch solutions");
      }
    };

    if (questionId) {
      fetchSolutions();
    }
  }, [questionId]);

  const handleDelete = async (solutionId) => {
    try {
      await deleteSolution(solutionId);

      setSolutions((prevSolutions) =>
        prevSolutions.filter((solution) => solution.id !== solutionId),
      );
    } catch (error) {
      console.error(error.response?.data || "Failed to delete solution");
    }
  };

  return (
    <div className="w-full py-8 bg-white dark:bg-gray-800 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black uppercase text-gray-800 dark:text-white">
            Submitted Solutions
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-300">
            View solutions submitted by other users for this interview question.
          </p>
        </div>

        {/* Solutions */}
        <div className="space-y-8">
          {solutions.length > 0 ? (
            solutions.map((solution) => (
              <div
                key={solution.id}
                className="w-full border-b border-gray-200 dark:border-gray-700 pb-8"
              >
                <div className="flex items-center justify-between mb-5">
                  {/* Author */}
                  <div className="max-w-full bg-blue-50 dark:bg-gray-900 rounded-md p-3 flex items-center gap-3">
                    {solution.author?.avatar ? (
                      <img
                        src={solution.author.avatar}
                        alt={solution.author?.username || "Author"}
                        className="w-8 h-8 rounded object-cover border border-gray-200 dark:border-gray-600 shrink-0"
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

                  {/* Edit / Delete */}
                  {solution.author?.id === userData?.id && (
                    <div className="shrink-0 flex items-center gap-2">
                      <Link
                        to={`/questions/${questionId}/solutions/${solution.id}/edit`}
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
                        onClick={() => handleDelete(solution.id)}
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

                {/* Solution Content */}
                <div className="browser-css text-gray-800 dark:text-gray-100 break-words overflow-hidden">
                  {parse(solution.content || "")}
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-gray-500 dark:text-gray-400">
              No solutions have been submitted yet.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllSolutions;
