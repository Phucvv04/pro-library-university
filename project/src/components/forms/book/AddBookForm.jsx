import React, { useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
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
  const authorOptions = authors.map((u) => ({
    value: u.tenTacGia,
    label: `${u.tenTacGia} (${u.queQuan})`,
  }));
  const categoryOptions = categories.map((u) => ({
    value: u.tenTheLoai,
    label: u.tenTheLoai,
  }));
  const publisherOptions = publishers.map((u) => ({
    value: u.tenNhaXB,
    label: u.tenNhaXB,
  }));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAuthorChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      tenTacGia: selected ? selected.value : "",
    }));
  };

  const handlePublisherChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      tenNhaXB: selected ? selected.value : "",
    }));
  };

  const handleCategoryChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      tenTheLoai: selected ? selected.value : "",
    }));
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
            <Select
              options={authorOptions}
              onChange={handleAuthorChange}
              value={
                authorOptions.find((opt) => opt.value === formData.tenTacGia) ||
                null
              }
              placeholder="Nhập hoặc chọn tác giả"
              isSearchable
              isClearable
              noOptionsMessage={() => "Không tìm thấy tác giả"}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Thể loại</label>
            <Select
              options={categoryOptions}
              onChange={handleCategoryChange}
              value={
                categoryOptions.find(
                  (opt) => opt.value === formData.tenTheLoai
                ) || null
              }
              placeholder="Nhập hoặc chọn thể loại"
              isSearchable
              isClearable
              noOptionsMessage={() => "Không tìm thấy thể loại"}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nhà xuất bản</label>
            <Select
              options={publisherOptions}
              onChange={handlePublisherChange}
              value={
                publisherOptions.find(
                  (opt) => opt.value === formData.tenNhaXB
                ) || null
              }
              placeholder="Nhập hoặc chọn nhà xuất bản"
              isSearchable
              isClearable
              noOptionsMessage={() => "Không tìm thấy nhà xuất bản"}
            />
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
