import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getUser = () => API.get("/users");
export const addXP = (xp) => API.post("/users/xp", { xp });