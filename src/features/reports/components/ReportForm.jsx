import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { createReport } from "../api/reportService";

export default function ReportForm({ questionId, solutionId, commentId }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        reason: reason.trim(),
      };

      // Only send the target that this report belongs to.
      if (questionId) {
        payload.question = Number(questionId);
      } else if (solutionId) {
        payload.solution = Number(solutionId);
      } else if (commentId) {
        payload.comment = Number(commentId);
      }

      const response = await createReport(payload);

      if (response?.data) {
        navigate(-1);
      }
    } catch (error) {
      console.error(error.response?.data || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap">
      {/* Left side */}
      <div className="w-full px-2">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
          Reason :
        </label>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Explain why you are reporting this..."
          rows={6}
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

        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            bgColor="bg-gray-500"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            bgColor="bg-red-500"
            disabled={loading || !reason.trim()}
          >
            {loading ? "Submitting..." : "Submit Report"}
          </Button>
        </div>
      </div>
    </form>
  );
}
