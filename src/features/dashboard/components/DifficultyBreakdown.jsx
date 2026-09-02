const DifficultyBreakdown = ({ data = [] }) => {

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="font-semibold text-gray-900">
          Difficulty
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Your solved questions by difficulty.
        </p>
      </div>

      <div className="space-y-5 px-6 py-6">

        {data.length === 0 ? (
          <p className="text-sm text-gray-500">
            No statistics available yet.
          </p>
        ) : (
          data.map((item) => {

            const percentage =
              item.total > 0
                ? (item.solved / item.total) * 100
                : 0;

            return (
              <div key={item.difficulty}>

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm font-medium capitalize text-gray-700">
                    {item.difficulty}
                  </span>

                  <span className="text-sm text-gray-500">
                    {item.solved} / {item.total}
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="h-full rounded-full bg-gray-900"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

              </div>
            );
          })
        )}

      </div>
    </div>
  );
};

export default DifficultyBreakdown;