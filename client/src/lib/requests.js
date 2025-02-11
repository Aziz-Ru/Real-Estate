import apiRequest from "./apiRequest";

export const login = async ({ email, password }) => {
  const response = await apiRequest.post("/auth/login", { email, password });
  return response.data;
};

export const logout = async () => {
  const response = await apiRequest.post("/auth/logout");
  return response.data;
};

export const addPost = async (data) => {
  const response = await apiRequest.post("/posts", data);
  return response.data;
};

export const getPosts = async () => {
  const response = await apiRequest.get("/posts");
  return response.data;
};

export const getSinglePost = async (id) => {
  const response = await apiRequest.get(`/posts/${id}`);
  return response.data;
};
