import { useState } from "react";

const UpdatePublisherForm = ({ publisher, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    tenNhaXB: publisher.tenNhaXB || "",
    moTa: publisher.moTa || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tenNhaXB.trim()) {
      toast.error("Tên NXB không được bỏ trống");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="mb-3">Sửa Nhà Xuất Bản</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tên NXB</label>
            <input
              type="text"
              className="form-control"
              value={formData.tenNhaXB}
              onChange={(e) =>
                setFormData({ ...formData, tenNhaXB: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <textarea
              className="form-control"
              rows="3"
              value={formData.moTa}
              onChange={(e) =>
                setFormData({ ...formData, moTa: e.target.value })
              }
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">
              Lưu thay đổi
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

export default UpdatePublisherForm;
