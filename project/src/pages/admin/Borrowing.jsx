import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getBorrows,
  createBorrow,
  updateBorrow,
  deleteBorrow,
} from "../../services/borrowingService";
import { getMembers } from "../../services/memberService";
import AddBorrowForm from "../../components/forms/borrowing/AddBorrowForm";
import UpdateBorrowForm from "../../components/forms/borrowing/UpdateBorrowForm";

import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

const Borrowing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [borrows, setBorrows] = useState([]);
  const [members, setMembers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBorrow, setEditingBorrow] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [borrowRes, memberRes] = await Promise.all([
        getBorrows(),
        getMembers(),
      ]);
      setBorrows(borrowRes.data);
      setMembers(memberRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi tải dữ liệu mượn trả!");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Đang mượn":
        return "bg-success";
      case "Quá hạn":
        return "bg-danger";
      case "Đã trả":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  };

  const handleDelete = async (maMuon) => {
    if (!window.confirm("Bạn có chắc muốn xóa phiếu mượn này?")) {
      toast.info("Đã hủy xóa phiếu mượn.");
      return;
    }
    try {
      await deleteBorrow(maMuon);
      setBorrows((prev) => prev.filter((b) => b.maMuon !== maMuon));
      toast.success("Xóa phiếu mượn thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi xóa phiếu mượn!");
    }
  };

  const handleAdd = async (newBorrow) => {
    try {
      const res = await createBorrow(newBorrow);
      if (!res || !res.data) {
        toast.error("Thêm phiếu mượn thất bại!");
        return;
      }
      setBorrows([...borrows, res.data]);
      setShowAddForm(false);
      toast.success("Thêm phiếu mượn thành công!");
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi thêm phiếu mượn!");
    }
  };

  const handleUpdate = async (updatedBorrow) => {
    try {
      const res = await updateBorrow(updatedBorrow.maMuon, updatedBorrow);
      setBorrows(
        borrows.map((b) => (b.maMuon === updatedBorrow.maMuon ? res.data : b))
      );
      setEditingBorrow(null);
      toast.success("Cập nhật phiếu mượn thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi cập nhật phiếu mượn!");
    }
  };

  const filteredBorrows = borrows.filter(
    (b) =>
      (b.tenNguoiDung &&
        b.tenNguoiDung.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.maMuon && b.maMuon.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="borrowing-page">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold" style={{ color: "var(--primary-blue)" }}>
          Quản lý Mượn Trả
        </h2>
        {!showAddForm && !editingBorrow && (
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={() => setShowAddForm(true)}
          >
            <FaPlus className="me-2" /> Tạo phiếu mượn
          </button>
        )}
      </div>

      {!showAddForm && !editingBorrow && (
        <div className="mb-3 position-relative">
          <FaSearch
            style={{
              position: "absolute",
              top: "50%",
              left: "12px",
              transform: "translateY(-50%)",
              color: "#888",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Tìm theo mã mượn hoặc tên người dùng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {showAddForm && (
        <AddBorrowForm
          onSave={handleAdd}
          members={members}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {editingBorrow && (
        <UpdateBorrowForm
          borrow={editingBorrow}
          onSave={handleUpdate}
          members={members}
          onClose={() => setEditingBorrow(null)}
        />
      )}

      {!showAddForm && !editingBorrow && (
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Mã mượn</th>
                    <th>Người dùng</th>
                    <th>Ngày mượn</th>
                    <th>Ngày trả dự kiến</th>
                    <th>Ngày trả thực tế</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBorrows.map((b) => (
                    <tr key={b.maMuon}>
                      <td>
                        <span className="badge text-dark">
                          {b.maMuon?.substring(18, 24)}
                        </span>
                      </td>
                      <td>{b.tenNguoiDung}</td>
                      <td>{b.ngayMuon?.substring(0, 10)}</td>
                      <td>{b.ngayTraDuKien?.substring(0, 10)}</td>
                      <td>
                        {b.ngayTraThucTe ? (
                          b.ngayTraThucTe.substring(0, 10)
                        ) : (
                          <em>Chưa trả</em>
                        )}
                      </td>
                      <td>
                        <span
                          className={`badge ${getStatusBadge(b.trangThai)}`}
                        >
                          {b.trangThai}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group">
                          <button
                            className="btn btn-sm btn-outline-primary d-flex align-items-center"
                            onClick={() => setEditingBorrow(b)}
                          >
                            <FaEdit className="me-1" /> Sửa
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger d-flex align-items-center"
                            onClick={() => handleDelete(b.maMuon)}
                          >
                            <FaTrash className="me-1" /> Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredBorrows.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center text-muted">
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Borrowing;
