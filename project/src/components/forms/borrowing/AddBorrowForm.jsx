import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const AddBorrowForm = ({ onSave, onClose, members = [] }) => {
  const [formData, setFormData] = useState({
    maNguoiDung: "",
    ngayMuon: "",
    ngayTraDuKien: "",
    ngayTraThucTe: "",
    trangThai: "Đang mượn",
  });

  // 🔹 Chuyển danh sách người dùng thành định dạng react-select
  const userOptions = members.map((u) => ({
    value: u.maNguoiDung,
    label: `${u.tenNguoiDung} (${u.email})`,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      maNguoiDung: selected ? selected.value : "",
    }));
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

    const selectedUser = members.find(
      (u) => u.maNguoiDung === formData.maNguoiDung
    );
    if (!selectedUser) {
      toast.error("Không tìm thấy thông tin người dùng!");
      return;
    }

    const payload = {
      tenNguoiDung: selectedUser.tenNguoiDung,
      ngayMuon: formData.ngayMuon,
      ngayTraDuKien: formData.ngayTraDuKien,
      ngayTraThucTe: formData.ngayTraThucTe || null,
      trangThai: formData.trangThai,
    };

    onSave(payload);

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
            <Select
              options={userOptions}
              onChange={handleSelectChange}
              value={
                userOptions.find((opt) => opt.value === formData.maNguoiDung) ||
                null
              }
              placeholder="Nhập hoặc chọn người dùng..."
              isSearchable
              isClearable
              noOptionsMessage={() => "Không tìm thấy người dùng"}
            />
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
