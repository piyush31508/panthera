import axios from "axios";

const API = axios.create({
  baseURL: "https://server-r8fa.onrender.com/api",
  withCredentials: true,
});

// Auth APIs
export const loginUser = (credentials) => API.post("user/login", credentials);
export const logoutUser = () => API.post("user/logout");
export const registerUser = (user) => API.post("user/newUser", user);

// User APIs
export const getAllUsers = () => API.get("user/");
export const getUserById = (id) => API.get(`user/${id}`);
export const updateUser = (user) => API.put("user/", user);
export const deleteUser = (id) => API.delete(`user/${id}`);
export const getData = () => API.get("/data");
