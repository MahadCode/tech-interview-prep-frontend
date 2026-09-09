import api from "../../auth/api/axios";

export const getModerationReports = () => {
  return api.get("moderation/reports/");
};

export const getModerationReport = (id) => {
  return api.get(`moderation/reports/${id}/`);
};

export const moderateReport = (id, data) => {
  return api.patch(`moderation/reports/${id}/`, data);
};
