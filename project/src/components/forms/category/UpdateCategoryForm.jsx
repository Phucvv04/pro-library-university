import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const UpdateCategoryForm = ({ category, categories = [], onSave, onClose }) => {
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
      toast.error("Tên thể loại không được để trống!");
      return;
    }
    // Kiểm tra trùng tên (ngoại trừ chính thể đang sửa)
    const isDuplicate = categories.some(
      (a) =>
        a.maTheLoai !== formData.maTheLoai &&
        a.tenTheLoai.trim().toLowerCase() ===
          formData.tenTheLoai.trim().toLowerCase()
    );
    if (isDuplicate) {
      toast.error("Thể loại này đã tồn tại trong hệ thống!");
      return;
    }
    onSave(formData);
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
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            Cập nhật
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
