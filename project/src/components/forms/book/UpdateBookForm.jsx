import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function UpdateBookForm({
  book,
  authors,
  categories,
  publishers,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState({
    tenSach: "",
    tenTacGia: "",
    tenTheLoai: "",
    tenNhaXB: "",
    moTa: "",
    soLuong: "",
  });

  useEffect(() => {
    if (book) {
      setFormData({
        tenSach: book.tenSach || "",
        tenTacGia: book.tenTacGia || "",
        tenTheLoai: book.tenTheLoai || "",
        tenNhaXB: book.tenNhaXB || "",
        moTa: book.moTa || "",
        soLuong: book.soLuong || 1,
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tenSach.trim()) {
      toast.error("Tên sách không được để trống!");
      return;
    }
    if (!formData.tenTacGia || !formData.tenTheLoai || !formData.tenNhaXB) {
      toast.error("Vui lòng chọn tác giả, thể loại và NXB!");
      return;
    }
    if (formData.soLuong > 1000) {
      toast.error("Số lượng quá lớn!");
      return;
    }
    try {
      await onSave(formData);
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi khi cập nhật sách!");
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3"> Cập nhật sách</h5>
        <form onSubmit={handleSubmit}>
          {/* Tên sách */}
          <div className="mb-3">
            <label className="form-label">Tên sách</label>
            <input
              type="text"
              name="tenSach"
              value={formData.tenSach}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Tác giả */}
          <div className="mb-3">
            <label className="form-label">Tác giả</label>
            <select
              name="tenTacGia"
              className="form-select"
              value={formData.tenTacGia}
              onChange={handleChange}
            >
              <option value="">-- Chọn tác giả --</option>
              {authors.map((author) => (
                <option key={author.tenTacGia} value={author.tenTacGia}>
                  {author.tenTacGia}
                </option>
              ))}
            </select>
          </div>

          {/* Thể loại */}
          <div className="mb-3">
            <label className="form-label">Thể loại</label>
            <select
              name="tenTheLoai"
              className="form-select"
              value={formData.tenTheLoai}
              onChange={handleChange}
            >
              <option value="">-- Chọn thể loại --</option>
              {categories.map((cate) => (
                <option key={cate.tenTheLoai} value={cate.tenTheLoai}>
                  {cate.tenTheLoai}
                </option>
              ))}
            </select>
          </div>

          {/* Nhà xuất bản */}
          <div className="mb-3">
            <label className="form-label">Nhà xuất bản</label>
            <select
              name="tenNhaXB"
              className="form-select"
              value={formData.tenNhaXB}
              onChange={handleChange}
            >
              <option value="">-- Chọn NXB --</option>
              {publishers.map((pub) => (
                <option key={pub.tenNhaXB} value={pub.tenNhaXB}>
                  {pub.tenNhaXB}
                </option>
              ))}
            </select>
          </div>

          {/* Mô tả */}
          <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <textarea
              name="moTa"
              value={formData.moTa}
              onChange={handleChange}
              className="form-control"
              rows="3"
            />
          </div>

          {/* Số lượng */}
          <div className="mb-3">
            <label className="form-label">Số lượng</label>
            <input
              type="text"
              name="soLuong"
              value={formData.soLuong}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">
              Lưu
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
