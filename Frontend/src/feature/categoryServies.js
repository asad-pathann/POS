import axios from "axios";

const API = "http://localhost:8888/api/categoryes";

// CREATE CATEGORY
export const createCategory = async (data) => {
  const res = await axios.post(`${API}/post-category`, data);
  return res.data;
};

// GET ALL CATEGORY (optional but useful)
export const getCategories = async () => {
  const res = await axios.get(`${API}`);
  return res.data;
};
