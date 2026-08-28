
import api from "./axios";
export const getCsrfCookie = () => {
  console.log("set cookie")
  return api.get("csrf/")
};
export const register = (data) => api.post("register/", data);
export const login = (username, password) =>
  api.post("login/", { username, password });

export const logout = () => api.post("logout/");
export const getCurrentUser = () => api.get("current-user/");