const ProgressStats = ({ stats }) => {
  const cards = [
    {
      title: "Total",
      value: stats.total,
      description: "Questions",
    },
    {
      title: "Solved",
      value: stats.solved,
      description: "Questions solved",
    },
    {
      title: "Attempted",
      value: stats.attempted,
      description: "Questions attempted",
    },
    {
      title: "Unsolved",
      value: stats.unsolved,
      description: "Questions remaining",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-gray-200 bg-white px-5 py-5 shadow-sm"
        >
          <p className="text-sm font-medium text-gray-500">
            {card.title}
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {card.value}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProgressStats;