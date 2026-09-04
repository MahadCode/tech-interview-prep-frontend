import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

const ReportCard = ({ report }) => {
  const navigate = useNavigate();

  const reportedQuestion = report.question;
  const reportData = report.report;
  const reporter = report.reporter;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

        <div className="min-w-0 flex-1">

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
              {reportData?.reason}
            </span>

            <span className="rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700">
              Pending
            </span>
          </div>

          <h3 className="truncate text-base font-semibold text-gray-900">
            {reportedQuestion?.title || "Reported Question"}
          </h3>

          <div className="mt-2 line-clamp-2 text-sm text-gray-500">
            {parse(reportedQuestion?.description ||
              "No question description available.")}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">

            <span>
              Report #{report.id}
            </span>

            {reporter && (
              <span>
                Reported by:{" "}
                <span className="font-medium text-gray-700">
                  {reporter.username || "User"}
                </span>
              </span>
            )}

            {reportedQuestion?.difficulty_level && (
              <span>
                Difficulty:{" "}
                <span className="font-medium text-gray-700">
                  {reportedQuestion.difficulty_level}
                </span>
              </span>
            )}

          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(`/moderation/reports/${report.id}`)
          }
          className="shrink-0 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Review
        </button>

      </div>
    </div>
  );
};

export default ReportCard;