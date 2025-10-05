import { useState, useEffect } from "react";

const UpdateCategoryForm = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    maTheLoai: "",
    tenTheLoai: "",
    moTa: "",
  });

  // Load dữ liệu cũ vào form khi mở
  useEffect(() => {
    if (category) {
      setFormData({
        maTheLoai: category.maTheLoai || "",
        tenTheLoai: category.tenTheLoai || "",
        moTa: category.moTa || "",
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tenTheLoai.trim()) {
      alert("Tên thể loại không được để trống!");
      return;
    }
    onSave(formData); // gọi callback cập nhật
  };

  return (
    <div className="card p-3">
      <h5 className="mb-3">Cập nhật thể loại</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Mã thể loại</label>
          <input
            type="text"
            className="form-control"
            name="maTheLoai"
            value={formData.maTheLoai}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tên thể loại</label>
          <input
            type="text"
            className="form-control"
            name="tenTheLoai"
            value={formData.tenTheLoai}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            name="moTa"
            rows="3"
            value={formData.moTa}
            onChange={handleChange}
          />
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
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
