import { useState } from "react";

const AddCategoryForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    tenTheLoai: "",
    moTa: "",
  });

  // Xử lý khi nhập dữ liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.tenTheLoai.trim()) {
      alert("Tên thể loại không được để trống!");
      return;
    }

    if (onSave) {
      onSave(formData); // Gửi đúng format cho API
    }

    // Reset form
    setFormData({
      tenTheLoai: "",
      moTa: "",
    });
  };

  return (
    <div className="card p-3 shadow-sm">
      <h5 className="mb-3">Thêm thể loại mới</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên thể loại</label>
          <input
            type="text"
            className="form-control"
            name="tenTheLoai"
            value={formData.tenTheLoai}
            onChange={handleChange}
            placeholder="Nhập tên thể loại..."
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            name="moTa"
            value={formData.moTa}
            onChange={handleChange}
            placeholder="Nhập mô tả..."
          ></textarea>
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={onCancel}
          >
            Hủy
          </button>
          <button type="submit" className="btn btn-primary">
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
