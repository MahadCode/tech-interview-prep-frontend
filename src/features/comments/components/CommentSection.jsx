import React, { useEffect, useState } from "react";
import { getQuestionComments } from "../api/commentService";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

export default function CommentSection({ questionId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getQuestionComments(questionId);

        setComments(response.data || []);
      } catch (error) {
        console.error(error.response?.data || "Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    };

    if (questionId) {
      fetchComments();
    }
  }, [questionId]);

  // Add a new top-level comment
  const handleCommentAdded = (comment) => {
    setComments((prev) => [...prev, comment]);
  };

  const handleDeleteComment = (commentId) => {
        const deleteComment = (comments) => {
            let updatedList = []

            for(let comment of comments){
                if(comment.id === commentId){
                    continue;
                }
                else if(comment.replies?.length > 0){
                    let newReplies = deleteComment(comment.replies)
                    comment = {...comment, replies: newReplies}
                }
                updatedList.push(comment)
            }

            return updatedList
        }
        setComments((prev) => deleteComment(prev))
  }

  const handleReplyAdded = (commentId, reply) => {
    const addReplyToTree = (comments) => {
        let updatedList = []

        for (let comment of comments){
            if (comment.id === commentId){
                let newReplies = comment.replies ? [ ...comment.replies, reply  ] : [reply]
                comment = {...comment, replies: newReplies}
            }

            else if (comment.replies?.length > 0){
                let newReplies = addReplyToTree(comment.replies)
                comment = {...comment, replies: newReplies}
            }

            updatedList.push(comment)
        } 
        return updatedList
    }
    setComments((prev) => addReplyToTree(prev))
  };


  return (
    <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h2>

      {/* Loading */}
      {loading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading comments...
        </p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No comments yet.
        </p>
      ) : (
        <div>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReplyAdded={handleReplyAdded}
              onDeleteComment={handleDeleteComment}
            />
          ))}
        </div>
      )}

      {/* New Comment */}
      <CommentForm
        questionId={questionId}
        onCommentAdded={handleCommentAdded}
      />
    </div>
  );
}
