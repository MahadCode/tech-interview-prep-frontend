const ProgressFilters = ({
  filters,
  setFilters,
  companies,
  roles,
  tags,
}) => {
  const updateFilter = (name, value) => {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "all",
      company: "all",
      role: "all",
      tag: "all",
      difficulty: "all",
      search: "",
    });
  };

  return (
    <div className="border-b border-gray-200 px-6 py-5">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div>
          <h2 className="font-semibold text-gray-900">
            Questions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Filter your questions by progress and category.
          </p>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Clear filters
        </button>

      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={filters.search}
          onChange={(event) =>
            updateFilter("search", event.target.value)
          }
          placeholder="Search questions..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
        />
      </div>

      {/* Filters */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

        {/* Status */}
        <FilterSelect
          label="Status"
          value={filters.status}
          onChange={(value) =>
            updateFilter("status", value)
          }
          options={[
            {
              value: "all",
              label: "All statuses",
            },
            {
              value: "solved",
              label: "Solved",
            },
            {
              value: "attempted",
              label: "Attempted",
            },
            {
              value: "unsolved",
              label: "Unsolved",
            },
          ]}
        />

        {/* Company */}
        <FilterSelect
          label="Company"
          value={filters.company}
          onChange={(value) =>
            updateFilter("company", value)
          }
          options={[
            {
              value: "all",
              label: "All companies",
            },
            ...companies.map((company) => ({
              value: company.id,
              label: company.name,
            })),
          ]}
        />

        {/* Role */}
        <FilterSelect
          label="Role"
          value={filters.role}
          onChange={(value) =>
            updateFilter("role", value)
          }
          options={[
            {
              value: "all",
              label: "All roles",
            },
            ...roles.map((role) => ({
              value: role.id,
              label: role.name,
            })),
          ]}
        />

        {/* Tag */}
        <FilterSelect
          label="Topic"
          value={filters.tag}
          onChange={(value) =>
            updateFilter("tag", value)
          }
          options={[
            {
              value: "all",
              label: "All topics",
            },
            ...tags.map((tag) => ({
              value: tag.id,
              label: tag.name,
            })),
          ]}
        />

        {/* Difficulty */}
        <FilterSelect
          label="Difficulty"
          value={filters.difficulty}
          onChange={(value) =>
            updateFilter("difficulty", value)
          }
          options={[
            {
              value: "all",
              label: "All difficulties",
            },
            {
              value: "easy",
              label: "Easy",
            },
            {
              value: "medium",
              label: "Medium",
            },
            {
              value: "hard",
              label: "Hard",
            },
          ]}
        />

      </div>
    </div>
  );
};

const FilterSelect = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-500">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProgressFilters;