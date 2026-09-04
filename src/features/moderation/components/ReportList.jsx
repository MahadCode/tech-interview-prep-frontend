import ReportCard from "./ReportCard";

const ReportList = ({ reports, loading, onRefresh }) => {
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-gray-500">
          Loading reports...
        </p>
      </div>
    );
  }

  if (!reports.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <span className="text-xl">✓</span>
        </div>

        <h3 className="mt-4 text-sm font-semibold text-gray-900">
          No pending reports
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          There are currently no reports waiting for moderation.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">
            Reports
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Review pending reports.
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-3">
        {reports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
          />
        ))}
      </div>
    </div>
  );
};

export default ReportList;