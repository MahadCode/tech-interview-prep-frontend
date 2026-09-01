import React, { useState } from "react";
import Button from "../../../components/Button";
import { createComment } from "../api/commentService";

export default function ReplyForm({ commentId, onReplyAdded, onCancel }) {
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
        reply_to: commentId,
        content: content.trim(),
      });

      if (response?.data) {
        // Give the newly created reply to CommentItem
        onReplyAdded(response.data);

        setContent("");
      }
    } catch (error) {
      console.error(error.response?.data || "Failed to add reply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a reply..."
        rows={2}
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

      <div className="flex justify-end gap-2 mt-2">
        <Button
          type="button"
          bgColor="bg-gray-500"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading || !content.trim()}>
          {loading ? "Posting..." : "Reply"}
        </Button>
      </div>
    </form>
  );
}
