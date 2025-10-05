import axios from "../services/api.js";

const MEMBER_API = "/nguoi-dung";

export const getMembers = () => axios.get(MEMBER_API);
export const getMemberById = (id) => axios.get(`${MEMBER_API}/${id}`);
export const createMember = (data) => axios.post(MEMBER_API, data);
export const updateMember = (id, data) =>
  axios.put(`${MEMBER_API}/${id}`, data);
export const deleteMember = (id) => axios.delete(`${MEMBER_API}/${id}`);
