import React, { useState } from "react";
import { toast } from "react-toastify";

const UpdateBorrowForm = ({ borrow, onSave, onClose, members = [] }) => {
  const [formData, setFormData] = useState({ ...borrow });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let updated = { ...prev, [name]: value };

      // Nếu người dùng thay đổi ngày trả thực tế → tự động cập nhật trạng thái
      if (name === "ngayTraThucTe" && value) {
        const ngayTraThucTe = new Date(value);
        const ngayTraDuKien = new Date(prev.ngayTraDuKien);

        if (ngayTraThucTe > ngayTraDuKien) {
          updated.trangThai = "Quá hạn";
        } else {
          updated.trangThai = "Đã trả";
        }
      }

      // Nếu xóa ngày trả thực tế -> quay lại trạng thái “Đang mượn”
      if (name === "ngayTraThucTe" && !value) {
        updated.trangThai = "Đang mượn";
      }

      return updated;
    });
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

    const ngayMuon = new Date(formData.ngayMuon);
    const ngayTraDuKien = new Date(formData.ngayTraDuKien);

    if (ngayTraDuKien < ngayMuon) {
      toast.error("Ngày trả dự kiến không được nhỏ hơn ngày mượn!");
      return;
    }
    if (formData.ngayTraThucTe) {
      const ngayTraThucTe = new Date(formData.ngayTraThucTe);
      if (ngayTraThucTe < ngayMuon) {
        toast.error("Ngày trả thực tế không được nhỏ hơn ngày mượn!");
        return;
      }

      const todayStr = new Date().toISOString().substring(0, 10);
      if (formData.ngayTraThucTe > todayStr) {
        toast.error("Ngày trả thực tế không được lớn hơn ngày hiện tại!");
        return;
      }
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
            <input
              type="text"
              className="form-control"
              value={formData.trangThai}
              disabled
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

export default UpdateBorrowForm;
