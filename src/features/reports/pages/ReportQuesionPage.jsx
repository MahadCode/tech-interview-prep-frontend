import React from "react";
import { useParams } from "react-router-dom";
import Container from "../../../components/Container";
import ReportForm from "../components/ReportForm";

function ReportQuestionPage() {
  const { questionId } = useParams();

  return (
    <div className="py-8 bg-white dark:bg-gray-800 min-h-screen">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-black uppercase text-gray-800 dark:text-white">
            Report Question
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Tell us why you think this question should be reviewed.
          </p>
        </div>

        <ReportForm questionId={questionId} />
      </Container>
    </div>
  );
}

export default ReportQuestionPage;

