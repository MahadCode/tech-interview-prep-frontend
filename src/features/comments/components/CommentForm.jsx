import React, { useState } from "react";
import Button from "../../../components/Button";
import { createComment } from "../api/commentService";

export default function CommentForm({ questionId, onCommentAdded }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    try {
      setLoading(true);

      const response = await createComment({
        question: questionId,
        content: content.trim(),
      });

      if (response?.data) {
        onCommentAdded(response.data);

        setContent("");
      }
    } catch (error) {
      console.error(error.response?.data || "Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        rows={3}
        disabled={loading}
        className="
          w-full
          rounded-md
          border border-gray-300
          dark:border-gray-600
          bg-white dark:bg-gray-900
          text-gray-800 dark:text-gray-100
          placeholder-gray-400
          p-3
          text-sm
          resize-y
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          disabled:opacity-60
        "
      />

      <div className="flex justify-end mt-2">
        <Button type="submit" disabled={loading || !content.trim()}>
          {loading ? "Posting..." : "Add Comment"}
        </Button>
      </div>
    </form>
  );
}
