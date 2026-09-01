import React, { useState } from "react";
import { User } from "lucide-react";
import ReplyForm from "./ReplyForm";
import { useSelector } from "react-redux";
import { deleteComment } from "../api/commentService";

export default function CommentItem({ comment, onReplyAdded, onDeleteComment, level = 0 }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

   const userData = useSelector((state) => state.auth.userData);

  const isAuthor =
    comment && userData ? comment.author?.id === userData.id : false;

  const handleDelete = async(commentId) => {
      try {
        const response = await deleteComment(commentId);

        if (response?.status == 200 ) {
          onDeleteComment(commentId);
        }
      } catch (error) {
        console.error(error.response?.data || "Failed to delete comment");
      }
    }

  const handleReplyAdded = (reply) => {
    onReplyAdded(comment.id, reply);
    setShowReplyForm(false);
  };

  return (
    <div
      className={`
        py-3
        ${
          level > 0
            ? "ml-4 sm:ml-8 border-l border-gray-200 dark:border-gray-700 pl-3 sm:pl-4"
            : ""
        }
      `}
    >
      {/* Comment */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        {comment.author?.avatar ? (
          <img
            src={comment.author.avatar}
            alt={comment.author?.username || "Author"}
            className="
              w-7 h-7
              rounded
              object-cover
              border border-gray-200
              dark:border-gray-600
              shrink-0
            "
          />
        ) : (
          <div
            className="
              w-7 h-7
              rounded
              bg-gray-200 dark:bg-gray-700
              flex items-center justify-center
              border border-gray-200 dark:border-gray-600
              shrink-0
            "
          >
            <User size={14} className="text-gray-500 dark:text-gray-300" />
          </div>
        )}

        {/* Comment Content */}
        <div className="min-w-0 flex-1">
          <div className="text-sm text-gray-700 dark:text-gray-200 wrap-break-word whitespace-pre-wrap">
            {comment.content}
          </div>

          {/* Author + Reply */}
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
              {isAuthor ? "You" : comment.author?.username || "Anonymous"}
            </span>

            <button
              type="button"
              onClick={() => setShowReplyForm((prev) => !prev)}
              className="
                text-xs
                text-gray-500 dark:text-gray-400
                hover:text-blue-600
                dark:hover:text-blue-400
              "
            >
              {showReplyForm ? "Cancel" : "Reply"}
            </button>
            
            
            {isAuthor && <button
                type="button"
                onClick={() => {
                    handleDelete(comment.id)}}
                className="
                    text-xs
                    text-gray-500 dark:text-gray-400
                    hover:text-red-600
                    dark:hover:text-red-600
              "
            >
                Delete
            </button>}

          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <ReplyForm
              commentId={comment.id}
              onReplyAdded={handleReplyAdded}
              onCancel={() => setShowReplyForm(false)}
            />
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies?.length > 0 && (
        <div className="mt-1">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReplyAdded={onReplyAdded}
              onDeleteComment={onDeleteComment}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
