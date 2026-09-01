import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../components/Container";
import { getAllSolutions } from "../api/solutionService";
import { User } from "lucide-react";
import parse from "html-react-parser";

function AllSolutions() {
  const [solutions, setSolutions] = useState([]);

  const { questionId } = useParams();

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await getAllSolutions(questionId);
        setSolutions(response.data);
      } catch (error) {
        console.error(
          error.response?.data || "Failed to fetch solutions"
        );
      }
    };

    if (questionId) {
      fetchSolutions();
    }
  }, [questionId]);

  return (
    <div className="w-full py-8 bg-white dark:bg-gray-800 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black uppercase text-gray-800 dark:text-white">
            Submitted Solutions
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-300">
            View solutions submitted by other users for this interview
            question.
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
                {/* Author */}
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

