import { useEffect, useState } from "react";
import { X } from "lucide-react";

const AddTaxonomyModel = ({
  isOpen,
  onClose,
  onSubmit,
  type,
  loading = false,
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const getTitle = () => {
    if (type === "company") {
      return "Add Company";
    }

    if (type === "job_role") {
      return "Add Job Role";
    }

    return "Add Tag";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Name is required.");
      return;
    }

    setError("");

    try {
      await onSubmit(trimmedName);
    } catch (err) {
      setError(
        err.response?.data?.name?.[0] ||
          err.response?.data?.detail ||
          "Failed to create item.",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{getTitle()}</h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-5 py-5">
            <label
              htmlFor="taxonomy-name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>

            <input
              id="taxonomy-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={
                type === "company"
                  ? "e.g. Google"
                  : type === "job_role"
                    ? "e.g. Software Engineer"
                    : "e.g. Dynamic Programming"
              }
              disabled={loading}
              autoFocus
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 disabled:cursor-not-allowed disabled:bg-gray-100"
            />

            {error && (
              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                {error}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaxonomyModel;
