import React from "react";
import { useParams } from "react-router-dom";

import Container from "../../../components/Container";
import SolutionForm from "../components/SolutionForm";

function AddSolution() {
  const { questionId } = useParams();

  return (
    <div className="py-8 bg-white dark:bg-gray-900 min-h-screen duration-200">
      <Container>
        <SolutionForm questionId={questionId} />
      </Container>
    </div>
  );
}

export default AddSolution;

