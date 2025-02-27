import { httpClient } from "./http";

export const signup = async (userData) => {
  const response = await httpClient.post("/users/join", userData);
  return response.data;
};

export const resetRequest = async (data) => {
  const response = await httpClient.post("/users/reset", data);
  return response.data
}

export const resetPassword = async (data) => {
  const response = await httpClient.put("/users/reset", data);
  return response.data
}

export const login = async (data) => {
  const response = await httpClient.post("/users/login", data);
  return response.data;
};
