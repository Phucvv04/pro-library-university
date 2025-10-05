import axios from "../services/api.js";

const PUBLISHER_API = "/nhaxb";

export const getPublishers = () => axios.get(PUBLISHER_API);
export const getPublisherById = (id) => axios.get(`${PUBLISHER_API}/${id}`);
export const createPublisher = (data) => axios.post(PUBLISHER_API, data);
export const updatePublisher = (id, data) =>
  axios.put(`${PUBLISHER_API}/${id}`, data);
export const deletePublisher = (id) => axios.delete(`${PUBLISHER_API}/${id}`);
