import { useEffect, useState } from "react";
import AddAuthorForm from "../../components/forms/author/AddAuthorForm";
import UpdateAuthorForm from "../../components/forms/author/UpdateAuthorForm";
import { toast } from "react-toastify";
import {
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../../services/authorService";
import { getBooks } from "../../services/bookService";

import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const Authors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const res = await getAuthors();
      setAuthors(res.data);
    } catch (err) {
      toast.error("Không thể tải danh sách tác giả!", {
        toastId: "fetch-authors-error",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAuthors = authors.filter((author) =>
    author.tenTacGia?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAuthor = async (data) => {
    try {
      if (!data.tenTacGia.trim()) {
        toast.error("Tên tác giả không được để trống!");
        return;
      }
      await createAuthor(data);
      toast.success("Thêm tác giả thành công!");
      setShowForm(false);
      fetchAuthors();
    } catch (err) {
      toast.error("Lỗi khi thêm tác giả!");
      console.error(err);
    }
  };

  const handleUpdateAuthor = async (data) => {
    try {
      if (!data.tenTacGia.trim()) {
        toast.error("Tên tác giả không được để trống!");
        return;
      }
      await updateAuthor(editingAuthor.maTacGia, data);
      toast.success("Cập nhật tác giả thành công!");
      setEditingAuthor(null);
      fetchAuthors();
    } catch (err) {
      toast.error("Lỗi khi cập nhật tác giả!");
      console.error(err);
    }
  };

  const handleDeleteAuthor = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa tác giả này?");
    if (!confirmDelete) {
      toast.info("Đã hủy xóa tác giả.");
      return;
    }

    try {
      const booksRes = await getBooks();
      const books = booksRes.data || [];

      const hasLinkedBooks = books.some(
        (book) =>
          book.tenTacGia === authors.find((a) => a.maTacGia === id)?.tenTacGia
      );

      if (hasLinkedBooks) {
        toast.error("Không thể xóa tác giả vì đang được liên kết với sách!");
        return;
      }

      // Cho phép xóa nếu không có liên kết
      await deleteAuthor(id);
      toast.success("Xóa tác giả thành công!");
      fetchAuthors();
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi xóa tác giả!");
    }
  };

  return (
    <div className="authors-page">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h1
              className="h2 mb-2"
              style={{ color: "var(--primary-blue)", fontWeight: "700" }}
            >
              Quản lý tác giả
            </h1>
            {!showForm && !editingAuthor && (
              <button
                className="btn btn-primary d-flex align-items-center"
                onClick={() => setShowForm(true)}
              >
                <FaPlus className="me-2" /> Thêm tác giả
              </button>
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <AddAuthorForm
          onSave={handleAddAuthor}
          onCancel={() => setShowForm(false)}
          authors={authors}
        />
      )}

      {editingAuthor && (
        <UpdateAuthorForm
          author={editingAuthor}
          authors={authors}
          onSave={handleUpdateAuthor}
          onClose={() => setEditingAuthor(null)}
        />
      )}

      {!showForm && !editingAuthor && (
        <>
          {/* Thanh tìm kiếm có icon */}
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
              placeholder="Tìm kiếm theo tên tác giả..."
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
                        <th>Mã tác giả</th>
                        <th>Tên tác giả</th>
                        <th>Quê quán</th>
                        <th>Tiểu sử</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAuthors.map((author) => (
                        <tr key={author.maTacGia}>
                          <td>{author.maTacGia?.substring(18, 24)}</td>
                          <td>{author.tenTacGia}</td>
                          <td>{author.queQuan}</td>
                          <td>{author.tieuSu}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary d-flex align-items-center"
                                onClick={() => setEditingAuthor(author)}
                              >
                                <FaEdit className="me-1" /> Sửa
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger d-flex align-items-center"
                                onClick={() =>
                                  handleDeleteAuthor(author.maTacGia)
                                }
                              >
                                <FaTrash className="me-1" /> Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredAuthors.length === 0 && (
                        <tr>
                          <td colSpan="5" className="text-center text-muted">
                            Không tìm thấy tác giả nào
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

export default Authors;
