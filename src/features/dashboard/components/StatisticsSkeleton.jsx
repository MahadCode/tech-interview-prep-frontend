const StatisticsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6">
          <div className="h-8 w-36 animate-pulse rounded bg-gray-200" />

          <div className="mt-2 h-4 w-80 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Overview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-xl border border-gray-200 bg-white"
            />
          ))}

        </div>

        {/* Difficulty */}
        <div className="mt-6 h-64 animate-pulse rounded-xl border border-gray-200 bg-white" />

        {/* Topic / Company */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          <div className="h-80 animate-pulse rounded-xl border border-gray-200 bg-white" />

          <div className="h-80 animate-pulse rounded-xl border border-gray-200 bg-white" />

        </div>

      </div>
    </div>
  );
};

export default StatisticsSkeleton;