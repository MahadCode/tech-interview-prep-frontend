import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

function QuestionCard({
  id,
  title,
  company_full,
  job_role_full,
  difficulty_level,
  tag_full,
  author,
}) {
  return (
    <Link to={`/questions/${id}`} className="block m-auto">
      <div className="overflow-hidden rounded-lg shadow-lg cursor-pointer w-60 md:w-80 bg-white border border-gray-200 hover:shadow-xl duration-200">
        <div className="p-5">
          {/* Difficulty */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 text-xs font-semibold uppercase rounded-full bg-pink-100 text-pink-600">
              {difficulty_level}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 mb-3">{title}</h2>

          {/* Company */}
          {company_full && company_full.length > 0 && (
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Companies:</span>{" "}
              {company_full.map((c) => c.name).join(", ")}
            </p>
          )}

          {/* Job Role */}
          {job_role_full && job_role_full.length > 0 && (
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Role:</span> {job_role_full.name}
            </p>
          )}

          {/* Tag */}
          {tag_full && tag_full.length > 0 && (
            <div className="flex flex-wrap items-center mt-4 gap-2 justify-start">
              {tag_full.map((t) => (
                <span
                  key={t.id}
                  className="text-xs py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl"
                >
                  #{t.name}
                </span>
              ))}
            </div>
          )}

          {/* Author / Profile */}
          <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
            {author?.avatar ? (
              <img
                src={author.avatar}
                alt={author?.username || "Author"}
                className="w-8 h-8 rounded-full object-cover mr-2 border border-gray-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 border border-gray-200">
                <User size={16} className="text-gray-500" />
              </div>
            )}
            <span className="text-sm text-gray-700 font-medium">
              {author?.username || "Anonymous User"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default QuestionCard;
