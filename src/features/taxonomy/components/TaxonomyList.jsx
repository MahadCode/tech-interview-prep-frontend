import { Plus } from "lucide-react";

const TaxonomyList = ({ title, items, loading, onAdd }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>

          <p className="mt-0.5 text-sm text-gray-500">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Add {title === "Job Roles" ? "Job Role" : title.slice(0, -1)}
        </button>
      </div>

      {loading ? (
        <div className="px-5 py-10 text-center text-sm text-gray-500">
          Loading...
        </div>
      ) : items.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <p className="text-sm text-gray-500">
            No {title.toLowerCase()} found.
          </p>

          <button
            type="button"
            onClick={onAdd}
            className="mt-3 text-sm font-medium text-gray-900 underline underline-offset-2 hover:text-gray-600"
          >
            Add the first one
          </button>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-5 py-4"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{item.name}</p>

                <p className="mt-1 text-xs text-gray-500">
                  Added{" "}
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString()
                    : "—"}
                </p>
              </div>

              <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                Active
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaxonomyList;
