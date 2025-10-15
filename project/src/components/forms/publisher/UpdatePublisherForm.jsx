import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const UpdatePublisherForm = ({
  publisher,
  publishers = [],
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    maNhaXB: "",
    tenNhaXB: "",
    moTa: "",
  });
  // Load dữ liệu cũ vào form khi mở
  useEffect(() => {
    if (publisher) {
      setFormData({
        maNhaXB: publisher.maNhaXB || "",
        tenNhaXB: publisher.tenNhaXB || "",
        moTa: publisher.moTa || "",
      });
    }
  }, [publisher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tenNhaXB.trim()) {
      toast.error("Tên NXB không được bỏ trống");
      return;
    }
    // Kiểm tra trùng tên (ngoại trừ chính NXB đang sửa)
    const isDuplicate = publishers.some(
      (a) =>
        a.maNhaXB !== formData.maNhaXB &&
        a.tenNhaXB.trim().toLowerCase() ===
          formData.tenNhaXB.trim().toLowerCase()
    );
    if (isDuplicate) {
      toast.error("NXB này đã tồn tại trong hệ thống!");
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
            <label className="form-label">Mã NXB</label>
            <input
              type="text"
              className="form-control"
              name="maNhaXB"
              value={formData.maNhaXB}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tên NXB</label>
            <input
              type="text"
              name="tenNhaXB"
              className="form-control"
              value={formData.tenNhaXB}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <textarea
              className="form-control"
              rows="3"
              name="moTa"
              value={formData.moTa}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">
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

export default UpdatePublisherForm;
