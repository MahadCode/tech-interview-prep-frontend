import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import RTE from "../../../components/RTE";
import Select from "../../../components/Select";
import MultiSelect from "../../../components/MultiSelect";
import { useNavigate } from "react-router-dom";
import { createQuestion, updateQuestion } from "../api/questionService";
import { getAllCompanies, getAllJobRoles, getAllTags } from "../api/questionService";

export default function QuestionForm({ post }) {
  const [companies, setCompanies] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [tags, setTags] = useState([]);

  const { register, handleSubmit, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      company: post?.company?.map(String) || [],
      job_role: post?.job_role ? String(post.job_role) : "",
      tag: post?.tag?.map(String) || [],
      difficulty_level: post?.difficulty_level || "easy",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    getAllCompanies().then((res) => setCompanies(res.data));
    getAllJobRoles().then((res) => setJobRoles(res.data));
    getAllTags().then((res) => setTags(res.data));
  }, []);

  const submit = async (data) => {
    try {
      const payload = {
        ...data,
        company: data.company.map(Number),
        tag: data.tag.map(Number),
        job_role: data.job_role ? Number(data.job_role) : null,
      };

      let response;
      if (post) {
        response = await updateQuestion(post.id, payload);
      } else {
        response = await createQuestion(payload);
      }

      if (response?.data) {
        navigate(`/questions/${response.data.id}`);
      }
    } catch (error) {
      console.error(
        "Question submission failed:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* Left side */}
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <RTE
          label="Description :"
          name="description"
          control={control}
          defaultValue={getValues("description")}
        />
      </div>

      {/* Right side */}
      <div className="w-1/3 px-2">
        <Controller
          name="company"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <MultiSelect
              label="Company :"
              options={companies}
              value={field.value}
              onChange={field.onChange}
              className="mb-4"
            />
          )}
        />

        <Select
          options={jobRoles}
          label="Job Role :"
          className="mb-4"
          {...register("job_role")}
        />

        <Controller
          name="tag"
          control={control}
          render={({ field }) => (
            <MultiSelect
              label="Tag :"
              options={tags}
              value={field.value}
              onChange={field.onChange}
              className="mb-4"
            />
          )}
        />

        <Select
          options={["easy", "medium", "hard"]}
          label="Difficulty Level :"
          className="mb-4"
          {...register("difficulty_level", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}