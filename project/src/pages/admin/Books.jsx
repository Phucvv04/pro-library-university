import { useEffect, useState } from "react";
import AddBookForm from "../../components/forms/book/AddBookForm.jsx";
import UpdateBookForm from "../../components/forms/book/UpdateBookForm.jsx";
import { toast } from "react-toastify";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../../services/bookService";
import { getAuthors } from "../../services/authorService";
import { getCategories } from "../../services/categoryService";
import { getPublishers } from "../../services/publisherService";
import { getBorrowDetails } from "../../services/borrowingDetailService";

import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [resBooks, resAuthors, resCategories, resPublishers] =
        await Promise.all([
          getBooks(),
          getAuthors(),
          getCategories(),
          getPublishers(),
        ]);
      setBooks(resBooks.data || []);
      setAuthors(resAuthors.data || []);
      setCategories(resCategories.data || []);
      setPublishers(resPublishers.data || []);
    } catch (err) {
      toast.error("Không thể tải dữ liệu!", { toastId: "fetch-error" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getAuthorName = (id) =>
    authors.find((a) => a.maTacGia === id)?.tenTacGia || id;

  const getCategoryName = (id) =>
    categories.find((c) => c.maTheLoai === id)?.tenTheLoai || id;

  const getPublisherName = (id) =>
    publishers.find((p) => p.maNhaXB === id)?.tenNhaXB || id;

  const filteredBooks = books.filter((book) => {
    const search = searchTerm.toLowerCase();
    return book.tenSach?.toLowerCase().includes(search);
  });

  const handleAddBook = async (data) => {
    try {
      await createBook(data);
      toast.success("Thêm sách thành công!");
      setShowForm(false);
      fetchAll();
    } catch (err) {
      toast.error("Lỗi khi thêm sách!");
      console.error(err);
    }
  };

  const handleUpdateBook = async (data) => {
    try {
      await updateBook(editingBook.maSach, data);
      toast.success("Cập nhật sách thành công!");
      setEditingBook(null);
      fetchAll();
    } catch (err) {
      toast.error("Lỗi khi cập nhật sách!");
      console.error(err);
    }
  };

  const handleDeleteBook = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa sách này?");
    if (!confirmDelete) {
      toast.info("Đã hủy xóa sách.");
      return;
    }

    try {
      const borrowDetailsRes = await getBorrowDetails();
      const borrowDetails = borrowDetailsRes.data || [];

      const isBorrowed = borrowDetails.some((detail) => detail.maSach === id);

      if (isBorrowed) {
        toast.error("Không thể xóa sách vì đang được mượn!");
        return;
      }

      await deleteBook(id);
      toast.success("Xóa sách thành công!");
      fetchAll();
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi xóa sách!");
    }
  };

  return (
    <div className="books-page">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h1
            className="h2 mb-2"
            style={{ color: "var(--primary-blue)", fontWeight: "700" }}
          >
            Quản lý sách
          </h1>
          {!showForm && !editingBook && (
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => setShowForm(true)}
            >
              <FaPlus className="me-2" /> Thêm sách
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <AddBookForm
          onSave={handleAddBook}
          onCancel={() => setShowForm(false)}
          authors={authors}
          categories={categories}
          publishers={publishers}
        />
      )}

      {editingBook && (
        <UpdateBookForm
          book={editingBook}
          authors={authors}
          categories={categories}
          publishers={publishers}
          onSave={handleUpdateBook}
          onClose={() => setEditingBook(null)}
        />
      )}

      {!showForm && !editingBook && (
        <>
          <div className="mb-3 position-relative">
            <FaSearch
              style={{
                position: "absolute",
                top: "50%",
                left: "12px",
                transform: "translateY(-50%)",
                color: "#888",
              }}
            />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Tìm kiếm theo tên sách"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="card">
            <div className="card-body">
              {loading ? (
                <p>Đang tải dữ liệu...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Mã sách</th>
                        <th>Tên sách</th>
                        <th>Tác giả</th>
                        <th>Thể loại</th>
                        <th>Nhà XB</th>
                        <th>Số lượng</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBooks.map((book) => (
                        <tr key={book.maSach}>
                          <td>{books.indexOf(book) + 1}</td>
                          <td>{book.maSach?.substring(18, 24)}</td>
                          <td>{book.tenSach}</td>
                          <td>{getAuthorName(book.tenTacGia)}</td>
                          <td>{getCategoryName(book.tenTheLoai)}</td>
                          <td>{getPublisherName(book.tenNhaXB)}</td>
                          <td>{book.soLuong}</td>
                          <td>{book.moTa}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary d-flex align-items-center"
                                onClick={() => setEditingBook(book)}
                              >
                                <FaEdit className="me-1" /> Sửa
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger d-flex align-items-center"
                                onClick={() => handleDeleteBook(book.maSach)}
                              >
                                <FaTrash className="me-1" /> Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredBooks.length === 0 && (
                        <tr>
                          <td colSpan="8" className="text-center text-muted">
                            Không tìm thấy sách nào
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Books;
