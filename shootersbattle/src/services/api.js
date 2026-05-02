import axios from "axios";

const API = axios.create({
  baseURL: "https://careerquest-game.onrender.com/api",
});

export default API;

export const getUser = () => API.get("/users");
export const addXP = (xp) => API.post("/users/xp", { xp });