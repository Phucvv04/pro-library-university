// src/services/bookService.js
import axios from "../services/api.js";

const BOOK_API = "/sach";

export const getBooks = () => axios.get(BOOK_API);
export const getBookById = (id) => axios.get(`${BOOK_API}/${id}`);
export const createBook = (data) => axios.post(BOOK_API, data);
export const updateBook = (id, data) => axios.put(`${BOOK_API}/${id}`, data);
export const deleteBook = (id) => axios.delete(`${BOOK_API}/${id}`);

export const searchBooksLocal = async (keyword) => {
  const res = await getBooks();
  const books = res.data;
  return books.filter((b) =>
    b.tenSach.toLowerCase().includes(keyword.toLowerCase())
  );
};
