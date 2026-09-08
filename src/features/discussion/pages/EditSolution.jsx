import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../../../components/Container";
import SolutionForm from "../components/SolutionForm";
import { getSolution } from "../api/solutionService";

function EditSolution() {
  const { questionId, solutionId } = useParams();
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const fetchSolution = async () => {
      try {
        const response = await getSolution(solutionId);
        setSolution(response.data);
      } catch (error) {
        console.error(
          error.response?.data || "Failed to fetch solution"
        );
      }
    };

    if (solutionId) {
      fetchSolution();
    }
  }, [solutionId]);

  if (!solution) {
    return null;
  }

  return (
    <div className="py-8 bg-white dark:bg-gray-900 min-h-screen duration-200">
      <Container>
        <SolutionForm
          questionId={questionId}
          solution={solution}
        />
      </Container>
    </div>
  );
}

export default EditSolution;