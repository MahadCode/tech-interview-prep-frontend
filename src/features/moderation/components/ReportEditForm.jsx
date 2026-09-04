import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import RTE from "../../../components/RTE";

export default function ReportEditForm({
  question,
  loading = false,
  onSubmit,
  onClose,
}) {
  const {
    register,
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      title: question?.title || "",
      description: question?.description || "",
    },
  });

  const submit = async (data) => {
    try {

      await onSubmit({
        title: data.title,
        description: data.description,
      });
    } catch (error) {
      console.error(
        "Moderation edit failed:",
        error.response?.data || error.message
      );
    }
  };

  if (!question) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Reported Question
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-2xl leading-none text-gray-400 hover:text-gray-700 disabled:opacity-50"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(submit)}>

          <Input
            label="Title :"
            placeholder="Title"
            className="mb-5"
            {...register("title", {
              required: true,
            })}
          />

          <RTE
            label="Description :"
            name="description"
            control={control}
            defaultValue={question.description || ""}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-gray-200">

            <Button
              type="button"
              bgColor="bg-gray-500"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              bgColor="bg-green-500"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>

          </div>

        </form>
      </div>
    </div>
  );
}

