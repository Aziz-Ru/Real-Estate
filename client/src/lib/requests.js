import apiRequest from "./apiRequest";

export const login = async ({ email, password }) => {
  const response = await apiRequest.post("/auth/login", { email, password });
  return response.data;
};

export const logout = async () => {
  const response = await apiRequest.post("/auth/logout");
  return response.data;
};
