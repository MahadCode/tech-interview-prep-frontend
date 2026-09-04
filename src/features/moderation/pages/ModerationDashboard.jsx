import { useEffect, useState } from "react";
import { getModerationReports } from "../api/moderationService";
import ReportList from "../components/ReportList";

const ModerationDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getModerationReports();

      setReports(response.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to load moderation reports."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Moderation
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Review reports submitted by users and take appropriate action.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Pending Reports
            </p>

            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {reports.length}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <ReportList
          reports={reports}
          loading={loading}
          onRefresh={fetchReports}
        />

      </div>
    </div>
  );
};

export default ModerationDashboard;