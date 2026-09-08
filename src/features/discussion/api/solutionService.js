import api from "../../auth/api/axios"

export const getSolution = (id) =>
    api.get(`solutions/${id}/`)

export const createSolution = (id, data) =>
    api.post(`questions/${id}/solutions/`, data);

export const getAllSolutions = (id) =>
    api.get(`questions/${id}/solutions/`);

export const updateSolution = (id, data) =>
    api.patch(`solutions/${id}/`, data)

export const deleteSolution = (id) => 
    api.delete(`solutions/${id}/`)