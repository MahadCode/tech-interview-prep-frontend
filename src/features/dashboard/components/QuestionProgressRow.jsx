import { useNavigate } from "react-router-dom";



const QuestionProgressRow = ({question, companies = [], roles = [], tags = [], onStatusChange,}) => {
  
  const navigate = useNavigate()
  const questionCompanies = companies.filter((company) =>
    question.company?.includes(company.id),
  );

  const questionTags = tags.filter((tag) => question.tag?.includes(tag.id));
  const questionRole = roles.find((role) => role.id === question.job_role);

  return (
    <div className="px-6 py-4 transition hover:bg-gray-50">
      <div className="grid gap-4 md:grid-cols-[1fr_140px_160px] md:items-center">
        {/* Question */}
        <div className="min-w-0">
          <button
            type="button"
            onClick={() => {
              navigate(`/questions/${question.id}`);
            }}
            className="text-left text-sm font-medium text-gray-900 hover:underline"
          >
            {question.title}
          </button>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            {/* Companies */}
            {questionCompanies.map((company) => (
              <span
                key={company.id}
                className="rounded-md bg-gray-100 px-2 py-1 text-gray-600"
              >
                {company.name}
              </span>
            ))}

            {/* Role */}
            {questionRole && (
              <span className="rounded-md bg-gray-100 px-2 py-1 text-gray-600">
                {questionRole.name}
              </span>
            )}

            {/* Tags */}
            {questionTags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-md bg-gray-100 px-2 py-1 text-gray-600"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <DifficultyBadge difficulty={question.difficulty_level} />
        </div>

        {/* Status */}
        <div>
          <StatusSelect
            value={question.status}
            onChange={(value) => onStatusChange(question.id, value)}
          />
        </div>
      </div>
    </div>
  );
};

const DifficultyBadge = ({ difficulty }) => {
  const config = {
    easy: {
      label: "Easy",
      className: "bg-gray-100 text-gray-700",
    },

    medium: {
      label: "Medium",
      className: "bg-gray-200 text-gray-800",
    },

    hard: {
      label: "Hard",
      className: "bg-gray-900 text-white",
    },
  };

  const current = config[difficulty] || config.easy;

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${current.className}`}
    >
      {current.label}
    </span>
  );
};

const StatusSelect = ({ value, onChange }) => {
  return (
    <select
      value={value || "unsolved"}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
    >
      <option value="unsolved">Unsolved</option>
      <option value="attempted">Attempted</option>
      <option value="solved">Solved</option>
    </select>
  );
};

export default QuestionProgressRow;
