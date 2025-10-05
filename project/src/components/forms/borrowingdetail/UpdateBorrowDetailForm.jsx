import { useState, useEffect } from "react";

export default function UpdateBorrowDetailForm({
  detail,
  borrows,
  books,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState({
    maMuonCT: "",
    maMuon: "",
    maSach: "",
    soLuong: 1,
  });

  useEffect(() => {
    if (detail) {
      setFormData({
        maMuonCT: detail.maMuonCT || "",
        maMuon: detail.maMuon || "",
        maSach: detail.maSach || "",
        soLuong: detail.soLuong || 1,
      });
    }
  }, [detail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "soLuong" ? Number(value) : value, // đảm bảo soLuong là number
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // gửi lên cha
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Sửa chi tiết mượn</h5>
        <form onSubmit={handleSubmit}>
          {/* Mã mượn CT */}
          <div className="mb-3">
            <label className="form-label">Mã mượn CT</label>
            <input
              type="text"
              name="maMuonCT"
              className="form-control"
              value={formData.maMuonCT}
              disabled
            />
          </div>

          {/* Phiếu mượn */}
          <div className="mb-3">
            <label className="form-label">Phiếu mượn</label>
            <select
              name="maMuon"
              className="form-select"
              value={formData.maMuon}
              onChange={handleChange}
              required
            >
              <option value="">-- Chọn phiếu mượn --</option>
              {borrows.map((b) => (
                <option key={b.maMuon} value={b.maMuon}>
                  {b.maMuon?.substring(18, 24)} - {b.tenNguoiDung}
                </option>
              ))}
            </select>
          </div>

          {/* Sách */}
          <div className="mb-3">
            <label className="form-label">Sách</label>
            <select
              name="maSach"
              className="form-select"
              value={formData.maSach}
              onChange={handleChange}
              required
            >
              <option value="">-- Chọn sách --</option>
              {books.map((b) => (
                <option key={b.maSach} value={b.maSach}>
                  {b.tenSach}
                </option>
              ))}
            </select>
          </div>

          {/* Số lượng */}
          <div className="mb-3">
            <label className="form-label">Số lượng</label>
            <input
              type="number"
              name="soLuong"
              className="form-control"
              value={formData.soLuong}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          {/* Buttons */}
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
}
