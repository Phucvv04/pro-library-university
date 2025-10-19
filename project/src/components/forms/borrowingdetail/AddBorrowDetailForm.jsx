import { useState } from "react";
import { toast } from "react-toastify";

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedBook = books.find((b) => b.maSach === formData.maSach);
    if (!selectedBook) {
      toast.error("Không tìm thấy thông tin sách!");
      return;
    }

    const soLuongMuon = Number(formData.soLuong);
    const soLuongConLai = Number(
      selectedBook.soLuongConLai || selectedBook.soLuong || 0
    );

    // 🔹 Kiểm tra số lượng
    if (soLuongMuon <= 0) {
      toast.error("Số lượng mượn phải lớn hơn 0!");
      return;
    }

    if (soLuongMuon > soLuongConLai) {
      toast.error("Sách vượt quá số lượng trong kho!");
      return; // ❌ Không cho lưu
    }

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
                  {b.maSach?.substring(18, 24)} - {b.tenSach} (Còn lại:{" "}
                  {b.soLuongConLai ?? b.soLuong})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Số lượng</label>
            <input
              name="soLuong"
              type="number"
              className="form-control"
              value={formData.soLuong}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="d-flex gap-2 mt-3">
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
