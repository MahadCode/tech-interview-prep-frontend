import QuestionProgressRow from "./QuestionProgressRow";

const QuestionProgressList = ({
  questions,
  companies = [],
  roles = [],
  tags = [],
  onStatusChange,
}) => {
  if (questions.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <span className="text-xl text-gray-400">?</span>
        </div>

        <h3 className="mt-4 text-sm font-semibold text-gray-900">
          No questions found
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Try changing your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Desktop Header */}
      <div className="hidden border-b border-gray-200 bg-gray-50 px-6 py-3 md:grid md:grid-cols-[1fr_140px_160px] md:gap-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Question
        </p>

        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Difficulty
        </p>

        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Status
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {questions.map((question) => (
          <QuestionProgressRow
            key={question.id}
            question={question}
            companies={companies}
            roles={roles}
            tags={tags}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionProgressList;