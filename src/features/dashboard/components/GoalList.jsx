import GoalCard from "./GoalCard";

const GoalList = ({
  goals = [],
  onEdit,
  onDelete,
}) => {
  if (goals.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
        <h2 className="text-sm font-semibold text-gray-900">
          No goals yet
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Create your first preparation goal to start tracking your progress.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default GoalList;

