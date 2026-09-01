import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import RTE from "../../../components/RTE";
import { createSolution } from "../api/solutionService";

export default function SolutionForm({ questionId }) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      const payload = {
        content: data.content,
      };
      console.log(questionId)
      console.log(payload)
      const response = await createSolution(questionId, payload);

      if (response?.data) {
        navigate(`/questions/${questionId}`);
      }
    } catch (error) {
      console.error(
        "Solution submission failed:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="w-full">
      <RTE
        label="Your Solution :"
        name="content"
        control={control}
        defaultValue=""
      />

      <Button type="submit" className="mt-4">
        Submit Solution
      </Button>
    </form>
  );
}

