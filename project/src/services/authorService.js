import axios from "../services/api.js"; // mình sẽ config sẵn axios trong api.js

const AUTHOR_API = "/tac-gia";

export const getAuthors = () => axios.get(AUTHOR_API);
export const getAuthorById = (id) => axios.get(`${AUTHOR_API}/${id}`);
export const createAuthor = (data) => axios.post(AUTHOR_API, data);
export const updateAuthor = (id, data) =>
  axios.put(`${AUTHOR_API}/${id}`, data);
export const deleteAuthor = (id) => axios.delete(`${AUTHOR_API}/${id}`);
