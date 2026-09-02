import { useEffect, useState } from "react";

const GoalForm = ({
  goal = null,
  tags = [],
  companies = [],
  onSubmit,
  onCancel,
}) => {
  const [metric, setMetric] = useState(
    goal?.metric || "question_count"
  );

  const [targetValue, setTargetValue] = useState(
    goal?.target_value || ""
  );

  const [targetTag, setTargetTag] = useState(
    goal?.target_tag || ""
  );

  const [targetCompany, setTargetCompany] = useState(
    goal?.target_company || ""
  );

  const [deadline, setDeadline] = useState(
    goal?.deadline || ""
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /*
  ============================================================
  RESET DEPENDENT FIELDS
  ============================================================
  */

  useEffect(() => {
    if (metric === "question_count") {
      setTargetTag("");
      setTargetCompany("");
    }

    if (metric === "topic_mastery") {
      setTargetValue("");
      setTargetCompany("");
    }

    if (metric === "company_target") {
      setTargetValue("");
      setTargetTag("");
    }

    setErrors({});
  }, [metric]);

  /*
  ============================================================
  SUBMIT
  ============================================================
  */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrors({});

    const data = {
      metric,
      deadline: deadline || null,
    };

    if (metric === "question_count") {
      data.target_value = Number(targetValue);
    }

    if (metric === "topic_mastery") {
      data.target_tag = Number(targetTag);
    }

    if (metric === "company_target") {
      data.target_company = Number(targetCompany);
    }

    try {
      setLoading(true);

      // Parent handles the actual API request
      await onSubmit(data);

    } catch (error) {
      const backendErrors =
        error?.response?.data || error;

      if (
        backendErrors &&
        typeof backendErrors === "object"
      ) {
        const formattedErrors = {};

        Object.entries(backendErrors).forEach(
          ([field, messages]) => {
            formattedErrors[field] = Array.isArray(messages)
              ? messages[0]
              : String(messages);
          }
        );

        setErrors(formattedErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="font-semibold text-gray-900">
          {goal ? "Edit Goal" : "Create Goal"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Set a target for your interview preparation.
        </p>
      </div>

      <div className="space-y-5 px-6 py-6">

        {/* Goal Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Goal Type
          </label>

          <select
            value={metric}
            onChange={(event) =>
              setMetric(event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          >
            <option value="question_count">
              Question Count
            </option>

            <option value="topic_mastery">
              Topic Mastery
            </option>

            <option value="company_target">
              Company Target
            </option>
          </select>

          {errors.metric && (
            <ErrorMessage message={errors.metric} />
          )}
        </div>

        {/* Question Count */}
        {metric === "question_count" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Number of Questions
            </label>

            <input
              type="number"
              min="1"
              value={targetValue}
              onChange={(event) =>
                setTargetValue(event.target.value)
              }
              placeholder="e.g. 50"
              className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 ${
                errors.target_value
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              }`}
            />

            {errors.target_value && (
              <ErrorMessage
                message={errors.target_value}
              />
            )}
          </div>
        )}

        {/* Topic */}
        {metric === "topic_mastery" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Topic
            </label>

            <select
              value={targetTag}
              onChange={(event) =>
                setTargetTag(event.target.value)
              }
              className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:ring-1 ${
                errors.target_tag
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              }`}
            >
              <option value="">
                Select a topic
              </option>

              {tags.map((tag) => (
                <option
                  key={tag.id}
                  value={tag.id}
                >
                  {tag.name}
                </option>
              ))}
            </select>

            {errors.target_tag && (
              <ErrorMessage
                message={errors.target_tag}
              />
            )}
          </div>
        )}

        {/* Company */}
        {metric === "company_target" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Company
            </label>

            <select
              value={targetCompany}
              onChange={(event) =>
                setTargetCompany(event.target.value)
              }
              className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:ring-1 ${
                errors.target_company
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              }`}
            >
              <option value="">
                Select a company
              </option>

              {companies.map((company) => (
                <option
                  key={company.id}
                  value={company.id}
                >
                  {company.name}
                </option>
              ))}
            </select>

            {errors.target_company && (
              <ErrorMessage
                message={errors.target_company}
              />
            )}
          </div>
        )}

        {/* Deadline */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Deadline
          </label>

          <input
            type="date"
            value={deadline}
            onChange={(event) =>
              setDeadline(event.target.value)
            }
            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 ${
              errors.deadline
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-gray-900 focus:ring-gray-900"
            }`}
          />

          {errors.deadline && (
            <ErrorMessage
              message={errors.deadline}
            />
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : goal
              ? "Update Goal"
              : "Create Goal"}
        </button>

      </div>
    </form>
  );
};

const ErrorMessage = ({ message }) => {
  return (
    <p className="mt-1.5 text-xs text-red-500">
      {message}
    </p>
  );
};

export default GoalForm;

