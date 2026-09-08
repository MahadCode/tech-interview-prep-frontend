
import api from "../../auth/api/axios";

export const getCompanies = () => {
  return api.get(`taxonomy/companies/`);
};

export const createCompany = (data) => {
  return api.post(`taxonomy/companies/`, data);
};

export const getJobRoles = () => {
  return api.get(`taxonomy/job-roles/`);
};

export const createJobRole = (data) => {
  return api.post(`taxonomy/job-roles/`, data);
};

export const getTags = () => {
    console.log("get tags")
  return api.get(`taxonomy/tags/`);
};

export const createTag = (data) => {
  return api.post(`taxonomy/tags/`, data);
};