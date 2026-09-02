
import { useEffect, useState } from "react";

import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";

import {
  getPreparationGoals,
  createPreparationGoal,
  updatePreparationGoal,
  deletePreparationGoal,
} from "../api/dashboardService";

import {
  getAllCompanies,
  getAllTags,
} from "../../questions/api/questionService";


const GoalsPage = () => {
  const [goals, setGoals] = useState([]);

  const [tags, setTags] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);


  /*
  ============================================================
  LOAD GOALS, TAGS AND COMPANIES
  ============================================================
  */

  const fetchData = async () => {
    try {
      setLoading(true);

      const [
        goalsResponse,
        tagsResponse,
        companiesResponse,
      ] = await Promise.all([
        getPreparationGoals(),
        getAllTags(),
        getAllCompanies(),
      ]);

      setGoals(goalsResponse.data);
      setTags(tagsResponse.data);
      setCompanies(companiesResponse.data);

    } catch (error) {
      console.error("Failed to load goals data:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  /*
  ============================================================
  CREATE GOAL
  ============================================================
  */

  const handleCreate = async (data) => {
    try {
      const response = await createPreparationGoal(data);

      setGoals((current) => [
        response.data,
        ...current,
      ]);

      setShowForm(false);

    } catch (error) {
      /*
       * Throw the error so GoalForm can display
       * Django field validation errors.
       *
       * Example backend response:
       *
       * {
       *   "target_value": [
       *     "Target value must be greater than 0."
       *   ]
       * }
       */

      throw error;
    }
  };


  /*
  ============================================================
  UPDATE GOAL
  ============================================================
  */

  const handleUpdate = async (data) => {
    try {
      const response = await updatePreparationGoal(
        editingGoal.id,
        data
      );

      setGoals((current) =>
        current.map((goal) =>
          goal.id === editingGoal.id
            ? response.data
            : goal
        )
      );

      setEditingGoal(null);

    } catch (error) {
      /*
       * Throw the error so GoalForm can display
       * backend validation errors.
       */

      throw error;
    }
  };


  /*
  ============================================================
  DELETE GOAL
  ============================================================
  */

  const handleDelete = async (goalId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this goal?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deletePreparationGoal(goalId);

      setGoals((current) =>
        current.filter(
          (goal) => goal.id !== goalId
        )
      );

    } catch (error) {
      console.error(
        "Failed to delete goal:",
        error
      );
    }
  };


  /*
  ============================================================
  EDIT GOAL
  ============================================================
  */

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setShowForm(false);
  };


  /*
  ============================================================
  CANCEL CREATE
  ============================================================
  */

  const handleCancelCreate = () => {
    setShowForm(false);
  };


  /*
  ============================================================
  CANCEL EDIT
  ============================================================
  */

  const handleCancelEdit = () => {
    setEditingGoal(null);
  };


  /*
  ============================================================
  LOADING
  ============================================================
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-5xl">

          {/* Header skeleton */}
          <div className="flex items-center justify-between">

            <div>
              <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />

              <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-200" />

          </div>


          {/* Goal skeletons */}
          <div className="mt-6 space-y-4">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-44 animate-pulse rounded-xl border border-gray-200 bg-white"
              />
            ))}

          </div>

        </div>
      </div>
    );
  }


  /*
  ============================================================
  PAGE
  ============================================================
  */

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="mx-auto max-w-5xl">


        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="text-2xl font-bold text-gray-900">
              My Goals
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Set targets and track your interview preparation.
            </p>

          </div>


          {!showForm && !editingGoal && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Create Goal
            </button>
          )}

        </div>


        {/* ==================================================
            CREATE FORM
        ================================================== */}

        {showForm && (
          <div className="mb-6">

            <GoalForm
              tags={tags}
              companies={companies}
              onSubmit={handleCreate}
              onCancel={handleCancelCreate}
            />

          </div>
        )}


        {/* ==================================================
            EDIT FORM
        ================================================== */}

        {editingGoal && (
          <div className="mb-6">

            <GoalForm
              goal={editingGoal}
              tags={tags}
              companies={companies}
              onSubmit={handleUpdate}
              onCancel={handleCancelEdit}
            />

          </div>
        )}


        {/* ==================================================
            GOAL LIST
        ================================================== */}

        <GoalList
          goals={goals}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </div>

    </div>
  );
};


export default GoalsPage;

