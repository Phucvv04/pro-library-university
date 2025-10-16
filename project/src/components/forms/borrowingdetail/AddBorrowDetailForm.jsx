import { useState } from "react";

export default function AddBorrowDetailForm({
  onSave,
  onClose,
  borrows,
  books,
}) {
  const [formData, setFormData] = useState({
    maMuon: borrows[0]?.maMuon || "",
    maSach: books[0]?.maSach || "",
    soLuong: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="card shadow-sm border-0 rounded-3 mb-4">
      <div className="card-header bg-primary text-white fw-bold">
        Thêm chi tiết mượn
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Phiếu mượn</label>
            <select
              name="maMuon"
              className="form-select"
              value={formData.maMuon}
              onChange={handleChange}
            >
              {borrows.map((b) => (
                <option key={b.maMuon} value={b.maMuon}>
                  {b.maMuon?.substring(18, 24)} - {b.tenNguoiDung}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Sách</label>
            <select
              name="maSach"
              className="form-select"
              value={formData.maSach}
              onChange={handleChange}
            >
              {books.map((b) => (
                <option key={b.maSach} value={b.maSach}>
                  {b.maSach?.substring(18, 24)} - {b.tenSach}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Số lượng</label>
            <input
              name="soLuong"
              className="form-control"
              value={formData.soLuong}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className=" d-flex  gap-2 mt-3">
            <button type="submit" className="btn btn-success">
              Lưu
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
