import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getModerationReport,
  moderateReport,
} from "../api/moderationService";
import ReportEditForm from "./ReportEditForm";
import RemoveConfirmation from "./RemoveConfirmation";
import parse from "html-react-parser";

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [showRemove, setShowRemove] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getModerationReport(id);

      setReport(response.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to load this report."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  const handleDismiss = async () => {
    setActionLoading(true);
    setError("");

    try {

      await moderateReport(id, {
        action: "dismiss",
      });

      navigate("/moderation");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to approve the report."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemove = async () => {
    setActionLoading(true);
    setError("");

    try {

      await moderateReport(id, {
        action: "remove",
      });

      navigate("/moderation");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to remove the reported content."
      );
    } finally {
      setActionLoading(false);
      setShowRemove(false);
    }
  };

  const handleEdit = async (data) => {
    setActionLoading(true);
    setError("");

    try {

      await moderateReport(id, {
        action: "edit",
        ...data,
      });

      navigate("/moderation");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to edit the reported content."
      );
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Loading report...
          </p>
        </div>
      </div>
    );
  }

  if (error && !report) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <button
            onClick={() => navigate("/moderation")}
            className="mb-5 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Back to reports
          </button>

          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  const reportData = report.report;
  const question = report.question;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        <button
          onClick={() => navigate("/moderation")}
          className="mb-6 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          ← Back to reports
        </button>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Report information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Report #{report.id}
              </p>

              <h1 className="mt-1 text-xl font-semibold text-gray-900">
                Moderation Report
              </h1>
            </div>

            <span className="w-fit rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
              Pending
            </span>

          </div>

          <div className="mt-6 grid gap-5 border-t border-gray-100 pt-6 sm:grid-cols-2">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Reason
              </p>

              <p className="mt-1 text-sm text-gray-900">
                {reportData?.reason}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Reporter
              </p>

              <p className="mt-1 text-sm text-gray-900">
                {report?.reporter?.username ||
                  "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Reported At
              </p>

              <p className="mt-1 text-sm text-gray-900">
                {reportData?.created_at
                  ? new Date(
                      reportData.created_at
                    ).toLocaleString()
                  : "—"}
              </p>
            </div>

          </div>
        </div>

        {/* Reported content */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Reported Question
            </p>

            <h2 className="mt-1 text-xl font-semibold text-gray-900">
              {question?.title}
            </h2>
          </div>

          {question?.author && (
            <div className="mb-5 text-sm text-gray-500">
              Posted by{" "}
              <span className="font-medium text-gray-700">
                {question.author.username}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {question?.difficulty_level && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {question.difficulty_level}
              </span>
            )}

            {question?.company_full?.map((company) => (
              <span
                key={company.id}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {company.name}
              </span>
            ))}

            {question?.job_role_full && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {question.job_role_full.name}
              </span>
            )}

            {question?.tag_full?.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {tag.name}
              </span>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <div className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
              {parse(question?.description)}
            </div>
          </div>

        </div>

        {/* Actions */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <h3 className="font-semibold text-gray-900">
            Moderation Action
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Choose what should happen to this reported content.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              disabled={actionLoading}
              onClick={handleDismiss}
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Dismiss Report
            </button>

            <button
              type="button"
              disabled={actionLoading}
              onClick={() => setShowEdit(true)}
              className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Edit Content
            </button>

            <button
              type="button"
              disabled={actionLoading}
              onClick={() => setShowRemove(true)}
              className="rounded-lg border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Remove Content
            </button>

          </div>
        </div>

      </div>

      {showEdit && (
        <ReportEditForm
          question={question}
          loading={actionLoading}
          onSubmit={handleEdit}
          onClose={() => setShowEdit(false)}
        />
      )}

      {showRemove && (
        <RemoveConfirmation
          loading={actionLoading}
          onConfirm={handleRemove}
          onCancel={() => setShowRemove(false)}
        />
      )}

    </div>
  );
};

export default ReportDetail;