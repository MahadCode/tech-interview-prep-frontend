const RemoveConfirmation = ({
  loading,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
          <span className="text-lg text-red-600">
            !
          </span>
        </div>

        <h2 className="mt-4 text-lg font-semibold text-gray-900">
          Remove this content?
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          This action will remove the reported question. This
          action cannot be undone from the moderation panel.
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Removing..." : "Remove"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default RemoveConfirmation;