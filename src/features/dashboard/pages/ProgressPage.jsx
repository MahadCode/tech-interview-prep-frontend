import { useEffect, useMemo, useState } from "react";

import ProgressStats from "../components/ProgressStats";
import ProgressFilters from "../components/ProgressFilters";
import QuestionProgressList from "../components/QuestionProgressList";
import { getAllQuestion } from "../../questions/api/questionService";
import { getAllCompanies,getAllJobRoles,getAllTags } from "../../questions/api/questionService";

import {
  getQuestionStatus,
  createQuestionStatus,
  updateQuestionStatus,
  deleteQuestionStatus,
} from "../api/dashboardService";

const ProgressPage = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [tags, setTags] = useState([]);

  const [filters, setFilters] = useState({
    status: "all",
    company: "all",
    role: "all",
    tag: "all",
    difficulty: "all",
    search: "",
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await getAllQuestion();
        const questionData = response.data;

        const questionsWithStatus = await Promise.all(
          questionData.map(async (question) => {
            try {
              const response = await getQuestionStatus(question.id);

              return {
                ...question,

                status: response.data.status,
                statusExists: true,
                statusId: response.data.id,
              };
            } catch (error) {
              if (error.response?.status === 404) {
                return {
                  ...question,
                  status: "unsolved",
                  statusExists: false,
                  statusId: null,
                };
              }

              throw error;
            }
          }),
        );

        setQuestions(questionsWithStatus);
      } catch (error) {
        console.error("Failed to load questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const filteredQuestions = useMemo(() => {
  return questions.filter((question) => {
    // Status
    if (
      filters.status !== "all" &&
      question.status !== filters.status
    ) {
      return false;
    }

    // Company
    if (
      filters.company !== "all" &&
      !question.company?.includes(Number(filters.company))
    ) {
      return false;
    }

    // Role
    if (
      filters.role !== "all" &&
      question.job_role !== Number(filters.role)
    ) {
      return false;
    }

    // Tag
    if (
      filters.tag !== "all" &&
      !question.tag?.includes(Number(filters.tag))
    ) {
      return false;
    }

    // Difficulty
    if (
      filters.difficulty !== "all" &&
      question.difficulty_level !== filters.difficulty
    ) {
      return false;
    }

    // Search
    if (
      filters.search &&
      !question.title
        ?.toLowerCase()
        .includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
}, [questions, filters]);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [companiesResponse, rolesResponse, tagsResponse] =
          await Promise.all([
            getAllCompanies(),
            getAllJobRoles(),
            getAllTags(),
          ]);

        setCompanies(companiesResponse.data);
        setRoles(rolesResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilterData();
  }, []);

  const handleStatusChange = async (questionId, newStatus) => {
    // Find current question
    const question = questions.find((item) => item.id === questionId);

    if (!question) {
      return;
    }

    try {
      let response;

      if (!question.statusExists) {
        response = await createQuestionStatus(questionId, {
          status: newStatus,
        });
      } else {
        response = await updateQuestionStatus(questionId, {
          status: newStatus,
        });
      }

      setQuestions((currentQuestions) =>
        currentQuestions.map((item) =>
          item.id === questionId
            ? {
                ...item,
                status: response.data.status,
                statusExists: true,
                statusId: response.data.id,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Failed to update question status:", error?.response?.data);
    }
  };

  const handleRemoveStatus = async (questionId) => {
    const question = questions.find((item) => item.id === questionId);

    if (!question?.statusExists) {
      return;
    }

    try {
      await deleteQuestionStatus(questionId);

      setQuestions((currentQuestions) =>
        currentQuestions.map((item) =>
          item.id === questionId
            ? {
                ...item,
                status: "unsolved",
                statusExists: false,
                statusId: null,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Failed to remove question status:", error);
    }
  };

  const stats = useMemo(() => {
    return {
      total: questions.length,

      solved: questions.filter((question) => question.status === "solved")
        .length,

      attempted: questions.filter((question) => question.status === "attempted")
        .length,

      unsolved: questions.filter((question) => question.status === "unsolved")
        .length,
    };
  }, [questions]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-xl border border-gray-200 bg-white"
              />
            ))}
          </div>

          <div className="mt-6 h-96 animate-pulse rounded-xl border border-gray-200 bg-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Progress</h1>

          <p className="mt-1 text-sm text-gray-500">
            Track and manage your question progress.
          </p>
        </div>

        {/* Stats */}
        <ProgressStats stats={stats} />

        {/* Questions */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Filters */}
          <ProgressFilters
            filters={filters}
            setFilters={setFilters}
            companies={companies}
            roles={roles}
            tags={tags}
          />

          {/* List */}
          <QuestionProgressList
            questions={filteredQuestions}
            companies={companies}
            roles={roles}
            tags={tags}
            onStatusChange={handleStatusChange}
            onRemoveStatus={handleRemoveStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
