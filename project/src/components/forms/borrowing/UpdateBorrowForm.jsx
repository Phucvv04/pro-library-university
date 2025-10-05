import React, { useState } from "react";
import { toast } from "react-toastify";

const UpdateBorrowForm = ({ borrow, onSave, onClose, members = [] }) => {
  const [formData, setFormData] = useState({ ...borrow });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.ngayMuon) {
      toast.error("Ngày mượn không được để trống!");
      return;
    }
    if (!formData.ngayTraDuKien) {
      toast.error("Ngày trả dự kiến không được để trống!");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Sửa phiếu mượn</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Mã mượn</label>
            <input
              type="text"
              className="form-control"
              value={`${formData.maMuon.substring(0, 6)}`}
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Người dùng</label>
            <input
              type="text"
              className="form-control"
              value={`${formData.tenNguoiDung}`}
              disabled
            />
          </div>

          {/* Ngày mượn */}
          <div className="mb-3">
            <label className="form-label">Ngày mượn</label>
            <input
              type="date"
              name="ngayMuon"
              value={formData.ngayMuon?.substring(0, 10)}
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
              value={formData.ngayTraDuKien?.substring(0, 10)}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Ngày trả thực tế */}
          <div className="mb-3">
            <label className="form-label">Ngày trả thực tế</label>
            <input
              type="date"
              name="ngayTraThucTe"
              value={
                formData.ngayTraThucTe
                  ? formData.ngayTraThucTe.substring(0, 10)
                  : ""
              }
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Trạng thái */}
          <div className="mb-3">
            <label className="form-label">Trạng thái</label>
            <select
              name="trangThai"
              value={formData.trangThai}
              onChange={handleChange}
              className="form-select"
            >
              <option>Đang mượn</option>
              <option>Đã trả</option>
              <option>Quá hạn</option>
            </select>
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

export default UpdateBorrowForm;
