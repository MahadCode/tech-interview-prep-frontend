import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";

function QuestionCard({
  id,
  title,
  company_full,
  job_role_full,
  difficulty_level,
  tag_full,
  author,
  isVerified,
}) {
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isVerified) {
      setIsLocked((prev) => !prev);
      return;
    }

    navigate(`/questions/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative m-auto cursor-pointer w-60 md:w-80"
    >
      {/* Card */}
      <div
        className={`overflow-hidden rounded-lg shadow-lg bg-white
          border border-gray-200 hover:shadow-xl duration-200
          ${isLocked ? "blur-sm" : ""}`}
      >
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
              <span className="font-semibold">Roles:</span>{" "}
              {job_role_full.map((role) => role.name).join(", ")}
            </p>
          )}

          {/* Tags */}
          {tag_full && tag_full.length > 0 && (
            <div className="flex flex-wrap items-center mt-4 gap-2">
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

          {/* Author */}
          <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
            {author?.avatar ? (
              <img
                src={author.avatar}
                alt={author?.username || "Author"}
                className="w-8 h-8 rounded-full object-cover mr-2 border border-gray-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                <User size={16} className="text-gray-500" />
              </div>
            )}

            <span className="text-sm text-gray-700 font-medium">
              {author?.username || "Anonymous User"}
            </span>
          </div>
        </div>
      </div>

      {/* Lock overlay */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/30">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Lock size={28} className="text-gray-600" />
            </div>

            <span className="mt-2 text-sm font-semibold text-gray-700">
              Verify email to view
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
