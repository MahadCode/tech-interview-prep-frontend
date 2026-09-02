import { useNavigate } from "react-router-dom";

const DashboardProgress = ({ data = [] }) => {
  const navigate = useNavigate()

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
        <div>
          <h2 className="font-semibold text-gray-900">
            Recent Progress
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your recently updated questions.
          </p>
        </div>

        <button
          type="button"
          onClick={()=>{ navigate("/dashboard/progress")}}
          className="text-sm font-medium text-gray-900 hover:underline"
        >
          View all
        </button>
      </div>

      {data.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <p className="text-sm text-gray-500">
            No question activity yet.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {data.map((item) => {
            const question = item.question;

            const companies = question?.company_full || [];

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 px-6 py-4"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {question?.title || "Untitled Question"}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                    <span>
                      {companies.length > 0
                        ? companies.map((company) => company.name).join(", ")
                        : "No company"}
                    </span>

                    <span>•</span>

                    <span className="capitalize">
                      {question?.difficulty_level || "Unknown"}
                    </span>
                  </div>
                </div>

                <StatusBadge status={item.status} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const statusConfig = {
    solved: {
      label: "Solved",
      className: "bg-gray-900 text-white",
    },

    attempted: {
      label: "Attempted",
      className: "bg-gray-100 text-gray-700",
    },

    unsolved: {
      label: "Unsolved",
      className: "bg-gray-50 text-gray-500 border border-gray-200",
    },
  };

  const config = statusConfig[status] || statusConfig.unsolved;

  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default DashboardProgress;

