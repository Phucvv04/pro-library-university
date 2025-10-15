import React, { useState } from "react";
import { toast } from "react-toastify";

const AddBookForm = ({
  onSave,
  onCancel,
  authors = [],
  categories = [],
  publishers = [],
}) => {
  const [formData, setFormData] = useState({
    tenSach: "",
    tenTacGia: "",
    tenTheLoai: "",
    tenNhaXB: "",
    moTa: "",
    soLuong: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tenSach.trim()) {
      toast.error("Tên sách không được để trống!");
      return;
    }

    if (!formData.tenTacGia || !formData.tenTheLoai || !formData.tenNhaXB) {
      toast.error("Vui lòng chọn tác giả, thể loại và NXB!");
      return;
    }

    if (!formData.moTa.trim()) {
      toast.error("Vui lòng nhập mô tả!");
      return;
    }

    if (formData.soLuong <= 0) {
      toast.error("Số lượng phải lớn hơn 0!");
      return;
    }

    if (formData.soLuong > 1000) {
      toast.error("Số lượng quá lớn!");
      return;
    }

    onSave(formData);

    setFormData({
      tenSach: "",
      tenTacGia: "",
      tenTheLoai: "",
      tenNhaXB: "",
      moTa: "",
      soLuong: 1,
    });
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Thêm sách mới</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tên sách</label>
            <input
              type="text"
              name="tenSach"
              value={formData.tenSach}
              onChange={handleChange}
              className="form-control"
              placeholder="Nhập tên sách"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tác giả</label>
            <select
              name="tenTacGia"
              value={formData.tenTacGia}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">-- Chọn tác giả --</option>
              {authors.map((a) => (
                <option key={a.tenTacGia} value={a.tenTacGia}>
                  {a.tenTacGia}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Thể loại</label>
            <select
              name="tenTheLoai"
              value={formData.tenTheLoai}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">-- Chọn thể loại --</option>
              {categories.map((c) => (
                <option key={c.tenTheLoai} value={c.tenTheLoai}>
                  {c.tenTheLoai}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Nhà xuất bản</label>
            <select
              name="tenNhaXB"
              value={formData.tenNhaXB}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">-- Chọn NXB --</option>
              {publishers.map((p) => (
                <option key={p.tenNhaXB} value={p.tenNhaXB}>
                  {p.tenNhaXB}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <textarea
              name="moTa"
              value={formData.moTa}
              onChange={handleChange}
              className="form-control"
              rows="3"
              placeholder="Nhập mô tả sách"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Số lượng</label>
            <input
              name="soLuong"
              value={formData.soLuong}
              onChange={handleChange}
              className="form-control"
              min="1"
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">
              Lưu
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
