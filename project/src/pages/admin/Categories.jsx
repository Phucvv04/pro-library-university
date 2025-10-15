import { useEffect, useState } from "react";
import AddCategoryForm from "../../components/forms/category/AddCategoryForm";
import UpdateCategoryForm from "../../components/forms/category/UpdateCategoryForm";
import { toast } from "react-toastify";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";
import { getBooks } from "../../services/bookService";

import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false); // Thêm mới
  const [editingCategory, setEditingCategory] = useState(null); // Sửa

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      toast.error("Không thể tải danh sách thể loại!", {
        toastId: "fetch-categories-error",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.tenTheLoai?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = async (data) => {
    try {
      if (!data.tenTheLoai?.trim()) {
        toast.error("Tên thể loại không được để trống!");
        return;
      }
      await createCategory(data);
      toast.success("Thêm thể loại thành công!");
      setShowForm(false);
      fetchCategories();
    } catch (err) {
      toast.error("Lỗi khi thêm thể loại!");
      console.error(err);
    }
  };

  const handleUpdateCategory = async (data) => {
    try {
      if (!data.tenTheLoai?.trim()) {
        toast.error("Tên thể loại không được để trống!");
        return;
      }
      await updateCategory(editingCategory.maTheLoai, data);
      toast.success("Cập nhật thể loại thành công!");
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      toast.error("Lỗi khi cập nhật thể loại!");
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa thể loại này không?"
    );
    if (!confirmDelete) {
      toast.info("Đã hủy xóa thể loại.");
      return;
    }
    try {
      const booksRes = await getBooks();
      const books = booksRes.data || [];

      const hasLinkedBooks = books.some(
        (book) =>
          book.tenTheLoai ===
          categories.find((a) => a.maTheLoai === id)?.tenTheLoai
      );

      if (hasLinkedBooks) {
        toast.error("Không thể xóa thể loại vì đang được liên kết với sách!");
        return;
      }

      await deleteCategory(id);
      toast.success("Xóa thể loại thành công!");
      fetchCategories();
    } catch (err) {
      toast.error("Lỗi khi xóa thể loại!");
      console.error(err);
    }
  };

  return (
    <div className="categories-page">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h1
              className="h2 mb-2"
              style={{ color: "var(--primary-blue)", fontWeight: "700" }}
            >
              Quản lý thể loại
            </h1>
            {!showForm && !editingCategory && (
              <button
                className="btn btn-primary d-flex align-items-center"
                onClick={() => setShowForm(true)}
              >
                <FaPlus className="me-2" /> Thêm thể loại
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Form thêm */}
      {showForm && (
        <AddCategoryForm
          onSave={handleAddCategory}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Form sửa */}
      {editingCategory && (
        <UpdateCategoryForm
          category={editingCategory}
          categories={categories}
          onSave={handleUpdateCategory}
          onClose={() => setEditingCategory(null)}
        />
      )}

      {!showForm && !editingCategory && (
        <>
          {/* Search */}
          <div className="mb-3 position-relative">
            <FaSearch
              style={{
                position: "absolute",
                top: "50%",
                left: "12px",
                transform: "translateY(-50%)",
                color: "#888",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Tìm kiếm theo tên thể loại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Bảng danh sách */}
          <div className="card">
            <div className="card-body">
              {loading ? (
                <p>Đang tải dữ liệu...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Mã thể loại</th>
                        <th>Tên thể loại</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCategories.map((category) => (
                        <tr key={category.maTheLoai}>
                          <td>{category.maTheLoai?.substring(18, 24)}</td>
                          <td>{category.tenTheLoai}</td>
                          <td>{category.moTa}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary d-flex align-items-center"
                                onClick={() => setEditingCategory(category)}
                              >
                                <FaEdit className="me-1" /> Sửa
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger d-flex align-items-center"
                                onClick={() =>
                                  handleDeleteCategory(category.maTheLoai)
                                }
                              >
                                <FaTrash className="me-1" /> Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredCategories.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center text-muted">
                            Không tìm thấy thể loại nào
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

export default Categories;
