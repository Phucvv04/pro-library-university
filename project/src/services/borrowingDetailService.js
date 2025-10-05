import axios from "../services/api.js";

const BORROWINGDETAIL_API = "/muon-tra-chi-tiet";

export const getBorrowDetails = () => axios.get(BORROWINGDETAIL_API);
export const getBorrowDetailById = (id) =>
  axios.get(`${BORROWINGDETAIL_API}/${id}`);
export const createBorrowDetail = (data) =>
  axios.post(BORROWINGDETAIL_API, data);
export const updateBorrowDetail = (id, data) =>
  axios.put(`${BORROWINGDETAIL_API}/${id}`, data);
export const deleteBorrowDetail = (id) =>
  axios.delete(`${BORROWINGDETAIL_API}/${id}`);
