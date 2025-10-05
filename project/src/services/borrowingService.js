import axios from "../services/api.js";

const BORROWING_API = "/muon-tra";

export const getBorrows = () => axios.get(BORROWING_API);
export const getBorrowById = (id) => axios.get(`${BORROWING_API}/${id}`);
export const createBorrow = (data) => axios.post(BORROWING_API, data);
export const updateBorrow = (id, data) =>
  axios.put(`${BORROWING_API}/${id}`, data);
export const deleteBorrow = (id) => axios.delete(`${BORROWING_API}/${id}`);
