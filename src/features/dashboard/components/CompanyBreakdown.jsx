const CompanyBreakdown = ({ data = [] }) => {
 const filtered_data = data.filter( (item) => item.total > 0 );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="font-semibold text-gray-900">
          Companies
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Your solved questions by company.
        </p>
      </div>

      {filtered_data.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-sm text-gray-500">
            No company data available yet.
          </p>
        </div>
      ) : (
        <div className="space-y-5">

          {filtered_data.map((item) => {

            const percentage =
              item.total > 0
                ? Math.round(
                    (item.solved / item.total) *
                      100
                  )
                : 0;

            return (
              <div key={item.company_id}>

                <div className="mb-2 flex items-center justify-between">

                  <span className="max-w-[70%] truncate text-sm font-medium text-gray-700">
                    {item.company_name}
                  </span>

                  <span className="text-sm font-medium text-gray-900">
                    {item.solved} / {item.total}
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="h-full rounded-full bg-gray-900 transition-all"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default CompanyBreakdown;