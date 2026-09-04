import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import GoalCard from "../components/GoalCard";
import DifficultyBreakdown from "../components/DifficultyBreakdown";
import {
  getPreparationGoals,
  getPreparationStatistics,
  getProgress,
} from "../api/dashboardService";
import DashboardProgress from "../components/DashboardProgress";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const goalsResponse = await getPreparationGoals();
        const goals = goalsResponse.data;

        const response = await getPreparationStatistics();
        const data = response.data;

        const progressResponse = await getProgress();
        const progress = progressResponse.data;

        const percentage = Math.round(
          (data.total_solved / data.total_question) * 100,
        );

        data.goals = goals;
        data.progress_percentage = percentage;
        data.progress = progress;

        setDashboardData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-xl border border-gray-200 bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

          <p className="mt-1 text-sm text-gray-500">
            Track your interview preparation and progress.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/statistics")}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            View Statistics
          </button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Questions"
            value={dashboardData.total_question}
            description="Total Questions"
          />

          <StatCard
            title="Solved"
            value={dashboardData.total_solved}
            description="Questions solved"
          />

          <StatCard
            title="Attempted"
            value={dashboardData.total_attempted}
            description="Questions attempted"
          />

          <StatCard
            title="Unsolved"
            value={dashboardData.total_unsolved}
            description="Questions remaining"
          />

          <StatCard
            title="Progress"
            value={`${dashboardData.progress_percentage}%`}
            description="Overall completion"
          />
        </div>

        {/* Main Content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Goals */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                <div>
                  <h2 className="font-semibold text-gray-900">Current Goals</h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Keep track of your preparation goals.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/dashboard/goals");
                  }}
                  className="text-sm font-medium text-gray-900 hover:underline"
                >
                  View all
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {dashboardData.goals?.length > 0 ? (
                  dashboardData.goals
                    ?.slice(0, 3)
                    .map((goal) => <GoalCard key={goal.id} goal={goal} />)
                ) : (
                  <div className="px-6 py-10 text-center">
                    <p className="text-sm text-gray-500">
                      You don't have any active goals.
                    </p>

                    <button
                      type="button"
                      className="mt-3 text-sm font-medium text-gray-900 hover:underline"
                    >
                      Create a goal
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Difficulty */}
          <DifficultyBreakdown data={dashboardData.difficulty_breakdown} />
        </div>

        {/* Recent Progress */}
        <div className="mt-6">
          <DashboardProgress data={dashboardData.progress} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
