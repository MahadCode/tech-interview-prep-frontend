
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