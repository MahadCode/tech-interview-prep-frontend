import api from "../../auth/api/axios"

export const updateProfile = (data) => {
    return api.patch(`auth/edit-profile/`, data)
}

export const getPreparationGoals = () => {
  return api.get(`/progress/goals/`);
};

export const getPreparationGoalById = (id) => {
  return api.get(`/progress/goals/${id}/`);
};

export const createPreparationGoal = (data) => {
  return api.post(`/progress/goals/`, data);
};

export const updatePreparationGoal = (id, data) => {
  return api.patch(`/progress/goals/${id}/`, data);
};

export const deletePreparationGoal = (id) => {
  return api.delete(`/progress/goals/${id}/`);
};

export const getQuestionStatus = (questionId) => {
  return api.get(`/questions/${questionId}/status/`);
};

export const createQuestionStatus = (questionId, data) => {
  return api.post(`/questions/${questionId}/status/`, data);
};

export const updateQuestionStatus = (questionId, data) => {
  return api.patch(`/questions/${questionId}/status/`, data);
};

export const deleteQuestionStatus = (questionId) => {
  return api.delete(`/questions/${questionId}/status/`);
};

export const getPreparationStatistics = () => {
  return api.get("/progress/statistics/");
};

export const getProgress = () => {
  return api.get("/questions/progress")
}