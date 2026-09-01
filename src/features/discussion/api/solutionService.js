import api from "../../auth/api/axios"

export const createSolution = (id, data) =>
    api.post(`questions/${id}/solutions/`, data);

export const getAllSolutions = (id) =>
    api.get(`questions/${id}/solutions/`);