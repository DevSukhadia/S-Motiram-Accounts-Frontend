import API from "./API";

// POST /users/login
export const loginUser = (credentials) => API.post("/users/login", credentials);

// POST /users
export const createUser = (userData) => API.post("/users", userData);

// GET /users/profile
export const getUserProfile = () => API.get("/users/profile");
