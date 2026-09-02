import { useEffect, useState } from "react";

import StatisticsOverview from "../components/StatisticsOverview";
import DifficultyBreakdown from "../components/DifficultyBreakdown";
import TopicBreakdown from "../components/TopicBreakdown";
import CompanyBreakdown from "../components/CompanyBreakdown";
import StatisticsSkeleton from "../components/StatisticsSkeleton";
import { getPreparationStatistics } from "../api/dashboardService";

const StatisticsPage = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      
      const response = await getPreparationStatistics()
      
      setStatistics(response.data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (loading) {
    return <StatisticsSkeleton />;
  }

  if (!statistics) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">

            <h2 className="text-sm font-semibold text-gray-900">
              Unable to load statistics
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Something went wrong while loading your statistics.
            </p>

            <button
              type="button"
              onClick={fetchStatistics}
              className="mt-4 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              Try Again
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Statistics
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Track your preparation progress and see where you've been practicing.
          </p>
        </div>

        {/* Summary */}
        <StatisticsOverview
          totalSolved={statistics.total_solved}
          difficultyBreakdown={
            statistics.difficulty_breakdown
          }
        />

        {/* Difficulty */}
        <div className="mt-6">
          <DifficultyBreakdown
            data={statistics.difficulty_breakdown}
          />
        </div>

        {/* Topic + Company */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
        
            <CompanyBreakdown
                data={statistics.company_breakdown}
            />

            <TopicBreakdown
                data={statistics.topic_breakdown}
            />


        </div>

      </div>
    </div>
  );
};

export default StatisticsPage;