
import api from "./axios";
export const getCsrfCookie = () => {
  console.log("set cookie")
  return api.get("auth/csrf/")
};
export const register = (data) => api.post("auth/register/", data);
export const login = (username, password) =>
  api.post("auth/login/", { username, password });

export const logout = () => api.post("auth/logout/");
export const getCurrentUser = () => api.get("auth/current-user/");

export const resendEmailVerification = () => api.post("auth/resend-verification/")
export const requestPasswordRecovery = (data) => api.post("auth/recover-password/", data)
export const resetPassword = (token, data) => api.post(`auth/reset-password/${token}/`, data)
export const changePassword = (data) => api.post(`auth/change-password/`, data)