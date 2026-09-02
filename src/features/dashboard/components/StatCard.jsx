const StatCard = ({ title, value, description }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-5 py-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>

      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>

      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
  );
};

export default StatCard;
