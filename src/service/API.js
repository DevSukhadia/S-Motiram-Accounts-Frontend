import axios from "axios";
import {get} from "./storage/cookies";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = get.token();
  // If token exists, set the Authorization header
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
