import api from "../../auth/api/axios";

export const getQuestionComments = (questionId) => {
  return api.get(`/questions/${questionId}/comments/`);
};

export const createComment = (data) => {
  return api.post(`/comments/`, data);
};

export const deleteComment = (id) => {
  return api.delete(`/comments/${id}/`)
}
