import React, { useState } from "react";
import { toast } from "react-toastify";

const AddBorrowForm = ({ onSave, onClose, members = [] }) => {
  const [formData, setFormData] = useState({
    maNguoiDung: "",
    ngayMuon: "",
    ngayTraDuKien: "",
    ngayTraThucTe: "",
    trangThai: "Đang mượn",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.maNguoiDung) {
      toast.error("Vui lòng chọn người dùng!");
      return;
    }
    if (!formData.ngayMuon) {
      toast.error("Ngày mượn không được để trống!");
      return;
    }
    if (!formData.ngayTraDuKien) {
      toast.error("Ngày trả dự kiến không được để trống!");
      return;
    }

    // ✅ Tìm tên người dùng từ danh sách members
    const selectedUser = members.find(
      (u) => u.maNguoiDung === formData.maNguoiDung
    );

    if (!selectedUser) {
      toast.error("Không tìm thấy thông tin người dùng!");
      return;
    }

    // ✅ Payload gửi lên backend (giữ nguyên `tenNguoiDung`)
    const payload = {
      tenNguoiDung: selectedUser.tenNguoiDung, // backend cần tên
      ngayMuon: formData.ngayMuon,
      ngayTraDuKien: formData.ngayTraDuKien,
      ngayTraThucTe: formData.ngayTraThucTe || null,
      trangThai: formData.trangThai,
    };

    onSave(payload);

    // Reset form
    setFormData({
      maNguoiDung: "",
      ngayMuon: "",
      ngayTraDuKien: "",
      ngayTraThucTe: "",
      trangThai: "Đang mượn",
    });

    if (onClose) onClose();
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Thêm phiếu mượn</h5>
        <form onSubmit={handleSubmit}>
          {/* Người dùng */}
          <div className="mb-3">
            <label className="form-label">Người dùng</label>
            <select
              name="maNguoiDung"
              value={formData.maNguoiDung}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">-- Chọn người dùng --</option>
              {members.map((u) => (
                <option key={u.maNguoiDung} value={u.maNguoiDung}>
                  {u.tenNguoiDung} ({u.email})
                </option>
              ))}
            </select>
          </div>

          {/* Ngày mượn */}
          <div className="mb-3">
            <label className="form-label">Ngày mượn</label>
            <input
              type="date"
              name="ngayMuon"
              value={formData.ngayMuon}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Ngày trả dự kiến */}
          <div className="mb-3">
            <label className="form-label">Ngày trả dự kiến</label>
            <input
              type="date"
              name="ngayTraDuKien"
              value={formData.ngayTraDuKien}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">
              Lưu
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setFormData({
                  maNguoiDung: "",
                  ngayMuon: "",
                  ngayTraDuKien: "",
                  ngayTraThucTe: "",
                  trangThai: "Đang mượn",
                });
                if (onClose) onClose();
              }}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBorrowForm;
