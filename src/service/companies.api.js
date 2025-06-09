import API from "./API";

export const fetchUserCompanies = () => API.get("/companies");
