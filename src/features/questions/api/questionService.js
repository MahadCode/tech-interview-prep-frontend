import api from "../../auth/api/axios";

export const getAllQuestion = () =>
    api.get("questions/");

export const createQuestion = (data) =>
    api.post("questions/", data);

export const getQuestion = (id) =>
    api.get(`questions/${id}/`);

export const updateQuestion = (id, data) =>
    api.patch(`questions/${id}/`, data);

export const deleteQuestion = (id) =>
    api.delete(`questions/${id}/`);

export const getAllCompanies = () =>
    api.get("taxonomy/companies/")

export const getAllJobRoles = () =>
    api.get("taxonomy/job-roles/")

export const getAllTags = () =>
    api.get("taxonomy/tags/")