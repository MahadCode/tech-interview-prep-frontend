import api from "../../auth/api/axios";

export const createReport = (data) => {
  return api.post("/reports/", data);
};

export const getAllReports = () => {
  return api.get("/reports/");
};

export const getReport = (id) => {
  return api.get(`/reports/${id}/`);
};

export const updateReport = (id, data) => {
  return api.patch(`/reports/${id}/`, data);
};

export const deleteReport = (id) => {
  return api.delete(`/reports/${id}/`);
};

