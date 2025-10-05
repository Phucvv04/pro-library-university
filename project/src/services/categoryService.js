import axios from "./api.js";

const CATEGORY_API = "/the-loai";

export const getCategories = () => axios.get(CATEGORY_API);
export const getCategoryById = (id) => axios.get(`${CATEGORY_API}/${id}`);
export const createCategory = (data) => axios.post(CATEGORY_API, data);
export const updateCategory = (id, data) =>
  axios.put(`${CATEGORY_API}/${id}`, data);
export const deleteCategory = (id) => axios.delete(`${CATEGORY_API}/${id}`);
