import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const UpdateAuthorForm = ({ author, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    maTacGia: "",
    tenTacGia: "",
    queQuan: "",
    tieuSu: "",
  });

  useEffect(() => {
    if (author) {
      setFormData(author);
    }
  }, [author]);

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
    onSave(formData);
  };

  if (!author) return null;

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3"> Cập nhật tác giả</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Mã tác giả</label>
            <input
              type="text"
              name="maTacGia"
              value={formData.maTacGia}
              className="form-control"
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tên tác giả</label>
            <input
              type="text"
              name="tenTacGia"
              value={formData.tenTacGia}
              onChange={handleChange}
              className="form-control"
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
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Cập nhật
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
};

export default UpdateAuthorForm;
