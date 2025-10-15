import { useState } from "react";
import { toast } from "react-toastify";

const AddAuthorForm = ({ onSave, onCancel, authors = [] }) => {
  const [formData, setFormData] = useState({
    tenTacGia: "",
    queQuan: "",
    tieuSu: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.tenTacGia.trim()) {
      toast.error("Tên tác giả không được để trống!");
      return;
    }

    const Regex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (!Regex.test(formData.tenTacGia.trim())) {
      toast.error("Tên tác giả không được chứa ký tự đặc biệt!");
      return;
    }

    if (!formData.queQuan.trim()) {
      toast.error("Vui lòng nhập quê quán!");
      return;
    }
    const isDuplicate = authors.some(
      (a) =>
        a.tenTacGia.trim().toLowerCase() ===
        formData.tenTacGia.trim().toLowerCase()
    );
    if (isDuplicate) {
      toast.error("Tác giả này đã tồn tại!");
      return;
    }

    onSave(formData);
    setFormData({ tenTacGia: "", queQuan: "", tieuSu: "" });
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Thêm tác giả</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tên tác giả</label>
            <input
              type="text"
              name="tenTacGia"
              value={formData.tenTacGia}
              onChange={handleChange}
              className="form-control"
              placeholder="Nhập tên tác giả"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Quê quán</label>
            <input
              type="text"
              name="queQuan"
              value={formData.queQuan}
              onChange={handleChange}
              className="form-control"
              placeholder="Nhập quê quán"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tiểu sử</label>
            <textarea
              name="tieuSu"
              value={formData.tieuSu}
              onChange={handleChange}
              className="form-control"
              rows="3"
              placeholder="Nhập tiểu sử"
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

export default AddAuthorForm;
