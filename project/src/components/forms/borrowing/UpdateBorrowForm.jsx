import React, { useState } from "react";
import { toast } from "react-toastify";

const UpdateBorrowForm = ({ borrow, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...borrow });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let updated = { ...prev, [name]: value };

      // Nếu người dùng thay đổi ngày trả thực tế → tự động cập nhật trạng thái
      if (name === "ngayTraThucTe" && value) {
        const ngayTraThucTe = new Date(value);
        const ngayTraDuKien = new Date(prev.ngayTraDuKien);

        updated.trangThai =
          ngayTraThucTe > ngayTraDuKien ? "Quá hạn" : "Đã trả";
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

    const { ngayMuon, ngayTraDuKien, ngayTraThucTe } = formData;

    if (!ngayMuon) {
      toast.error("Ngày mượn không được để trống!");
      return;
    }

    if (!ngayTraDuKien) {
      toast.error("Ngày trả dự kiến không được để trống!");
      return;
    }

    const dMuon = new Date(ngayMuon);
    const dDuKien = new Date(ngayTraDuKien);

    if (dDuKien < dMuon) {
      toast.error("Ngày trả dự kiến không được nhỏ hơn ngày mượn!");
      return;
    }

    if (ngayTraThucTe) {
      const dThucTe = new Date(ngayTraThucTe);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      dThucTe.setHours(0, 0, 0, 0);

      if (dThucTe < dMuon) {
        toast.error("Ngày trả thực tế không được nhỏ hơn ngày mượn!");
        return;
      }

      if (dThucTe > today) {
        toast.error("Ngày trả thực tế không được lớn hơn ngày hiện tại!");
        return;
      }
    }

    const payload = {
      ...formData,
      ngayMuon: new Date(formData.ngayMuon).toISOString(),
      ngayTraDuKien: new Date(formData.ngayTraDuKien).toISOString(),
      ngayTraThucTe: formData.ngayTraThucTe
        ? new Date(formData.ngayTraThucTe).toISOString()
        : null,
    };

    onSave(payload);
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Sửa phiếu mượn</h5>
        <form onSubmit={handleSubmit}>
          {/* Mã mượn */}
          <div className="mb-3">
            <label className="form-label">Mã mượn</label>
            <input
              type="text"
              className="form-control"
              value={formData.maMuon?.substring(0, 6) || ""}
              disabled
            />
          </div>

          {/* Người dùng */}
          <div className="mb-3">
            <label className="form-label">Người dùng</label>
            <input
              type="text"
              className="form-control"
              value={formData.tenNguoiDung || ""}
              disabled
            />
          </div>

          {/* Ngày mượn */}
          <div className="mb-3">
            <label className="form-label">Ngày mượn</label>
            <input
              type="date"
              name="ngayMuon"
              value={formData.ngayMuon?.substring(0, 10) || ""}
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
              value={formData.ngayTraDuKien?.substring(0, 10) || ""}
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
              value={formData.trangThai || ""}
              disabled
            />
          </div>

          {/* Nút hành động */}
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
