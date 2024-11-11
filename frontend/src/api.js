import axios from "axios";

const api = axios.create({
  baseURL: "https://quiz-builder-83zi.onrender.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;


