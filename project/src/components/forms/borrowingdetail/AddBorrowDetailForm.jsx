import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

export default function AddBorrowDetailForm({
  onSave,
  onClose,
  borrows,
  books,
  borrowDetails,
}) {
  const [formData, setFormData] = useState({
    maMuon: "",
    maSach: "",
    soLuong: 1,
  });

  const updatedBooks = books.map((book) => {
    const totalBorrowed = borrowDetails
      .filter((bd) => {
        const borrow = borrows.find((b) => b.maMuon === bd.maMuon);
        const status = (borrow?.trangThai || "").toLowerCase();

        return (
          bd.maSach === book.maSach &&
          ["đang mượn", "chưa trả", "quá hạn"].includes(status)
        );
      })
      .reduce((sum, bd) => sum + (Number(bd.soLuong) || 0), 0);

    const soLuongConLai = Math.max(
      (Number(book.soLuong) || 0) - totalBorrowed,
      0
    );

    return { ...book, soLuongConLai };
  });

  // 2️⃣ Option cho select
  const borrowOptions = borrows.map((b) => ({
    value: b.maMuon,
    label: `${b.maMuon?.substring(18, 24)} - ${b.tenNguoiDung}`,
  }));

  const bookOptions = updatedBooks.map((b) => ({
    value: b.maSach,
    label: `${b.maSach?.substring(18, 24)} - ${b.tenSach} (Còn lại: ${
      b.soLuongConLai ?? b.soLuong
    })`,
  }));

  // 3️⃣ Xử lý chọn và nhập
  const handleBorrowChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      maMuon: selected ? selected.value : "",
    }));
  };

  const handleBookChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      maSach: selected ? selected.value : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 4️⃣ Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedBook = updatedBooks.find((b) => b.maSach === formData.maSach);
    if (!selectedBook) {
      toast.error("Không tìm thấy thông tin sách!");
      return;
    }

    const soLuongMuon = Number(formData.soLuong);
    const soLuongConLai = Number(
      selectedBook.soLuongConLai || selectedBook.soLuong || 0
    );

    if (soLuongMuon <= 0) {
      toast.error("Số lượng mượn phải lớn hơn 0!");
      return;
    }

    if (soLuongMuon > soLuongConLai) {
      toast.error("Sách vượt quá số lượng trong kho!");
      return;
    }

    if (!formData.maMuon || !formData.maSach) {
      toast.error("Vui lòng chọn phiếu mượn và sách!");
      return;
    }

    onSave(formData);
  };

  // 5️⃣ JSX
  return (
    <div className="card shadow-sm border-0 rounded-3 mb-4">
      <div className="card-header bg-primary text-white fw-bold">
        Thêm chi tiết mượn
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="row g-3">
          {/* Phiếu mượn */}
          <div className="col-md-6">
            <label className="form-label">Phiếu mượn</label>
            <Select
              options={borrowOptions}
              onChange={handleBorrowChange}
              value={
                borrowOptions.find((opt) => opt.value === formData.maMuon) ||
                null
              }
              placeholder="Chọn phiếu mượn..."
              isSearchable
              isClearable
              noOptionsMessage={() => "Không tìm thấy thông tin phiếu mượn"}
            />
          </div>

          {/* Sách */}
          <div className="col-md-6">
            <label className="form-label">Sách</label>
            <Select
              options={bookOptions}
              onChange={handleBookChange}
              value={
                bookOptions.find((opt) => opt.value === formData.maSach) || null
              }
              placeholder="Chọn sách..."
              isSearchable
              isClearable
              noOptionsMessage={() => "Không tìm thấy thông tin sách"}
            />
          </div>

          {/* Số lượng */}
          <div className="col-md-6">
            <label className="form-label">Số lượng</label>
            <input
              name="soLuong"
              type="number"
              min="1"
              className="form-control"
              value={formData.soLuong}
              onChange={handleChange}
            />
          </div>

          {/* Nút hành động */}
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
