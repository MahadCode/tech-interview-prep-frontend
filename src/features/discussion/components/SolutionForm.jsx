import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import RTE from "../../../components/RTE";
import {
  createSolution,
  updateSolution,
} from "../api/solutionService";

export default function SolutionForm({ questionId, solution }) {
  const navigate = useNavigate();

  const isEditing = Boolean(solution);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    if (solution) {
      reset({
        content: solution.content || "",
      });
    }
  }, [solution, reset]);

  const submit = async (data) => {
    try {
      const payload = {
        content: data.content,
      };

      if (isEditing) {
        await updateSolution(solution.id, payload);
      } else {
        await createSolution(questionId, payload);
      }

      navigate(`/questions/${questionId}`);
    } catch (error) {
      console.error(
        isEditing
          ? "Solution update failed:"
          : "Solution submission failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full"
    >
      <RTE
        label={isEditing ? "Edit Your Solution :" : "Your Solution :"}
        name="content"
        control={control}
        defaultValue=""
      />

      <Button type="submit" className="mt-4">
        {isEditing ? "Update Solution" : "Submit Solution"}
      </Button>
    </form>
  );
}