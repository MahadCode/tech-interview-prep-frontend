import StatCard from "./StatCard";

const StatisticsOverview = ({
  totalSolved,
  difficultyBreakdown,
}) => {
  const getCount = (difficulty) => {
    return (
      difficultyBreakdown.find(
        (item) => item.difficulty === difficulty
      )?.solved || 0
    );
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      <StatCard
        title="Total Solved"
        value={totalSolved}
        description="Questions solved"
      />

      <StatCard
        title="Easy"
        value={getCount("easy")}
        description="Easy questions"
      />

      <StatCard
        title="Medium"
        value={getCount("medium")}
        description="Medium questions"
      />

      <StatCard
        title="Hard"
        value={getCount("hard")}
        description="Hard questions"
      />

    </div>
  );
};

// const StatCard = ({
//   title,
//   value,
//   description,
// }) => {
//   return (
//     <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

//       <p className="text-sm text-gray-500">
//         {title}
//       </p>

//       <p className="mt-2 text-3xl font-bold text-gray-900">
//         {value}
//       </p>

//       <p className="mt-1 text-xs text-gray-500">
//         {description}
//       </p>

//     </div>
//   );
// };

export default StatisticsOverview;