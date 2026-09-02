const GoalCard = ({ goal }) => {
  console.log(goal)
  return (
    <div className="px-6 py-5">

      <div className="flex items-start justify-between gap-4">

        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {goal.metric}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            {goal.solved_questions} / {goal.total_questions} completed
          </p>
        </div>

        <span className="text-sm font-semibold text-gray-900">
          {goal.progress_percentage}%
        </span>

      </div>

      {/* Progress */}
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-gray-900 transition-all"
          style={{
            width: `${Math.min(goal.progress_percentage, 100)}%`,
          }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between">

        <p className="text-xs text-gray-500">
          Deadline
        </p>

        <p className="text-xs font-medium text-gray-700">
          {goal.deadline
            ? new Date(goal.deadline).toLocaleDateString()
            : "No deadline"}
        </p>

      </div>

    </div>
  );
};

export default GoalCard;