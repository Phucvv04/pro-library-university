import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getBorrowDetails,
  createBorrowDetail,
  updateBorrowDetail,
  deleteBorrowDetail,
} from "../../services/borrowingDetailService";
import { getBorrows } from "../../services/borrowingService";
import { getBooks } from "../../services/bookService";
import AddBorrowDetailForm from "../../components/forms/borrowingdetail/AddBorrowDetailForm";
import UpdateBorrowDetailForm from "../../components/forms/borrowingdetail/UpdateBorrowDetailForm";

// 🔥 Thêm icon
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const BorrowDetail = () => {
  const [borrowDetails, setBorrowDetails] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [books, setBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDetail, setEditingDetail] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [detailRes, borrowRes, bookRes] = await Promise.all([
        getBorrowDetails(),
        getBorrows(),
        getBooks(),
      ]);

      // 🔥 Backend đã trả về cả maSach và tenSach
      setBorrowDetails(detailRes.data);
      setBorrows(borrowRes.data);
      setBooks(bookRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi tải dữ liệu chi tiết mượn!");
    }
  };

  const handleAdd = async (newDetail) => {
    try {
      await createBorrowDetail(newDetail);
      toast.success("Thêm chi tiết mượn thành công!");
      setShowAddForm(false);
      fetchData(); // 🔥 load lại list mới
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi thêm chi tiết mượn!");
    }
  };

  const handleUpdate = async (updatedDetail) => {
    try {
      await updateBorrowDetail(updatedDetail.maMuonCT, updatedDetail);
      toast.success("Cập nhật chi tiết mượn thành công!");
      setEditingDetail(null);
      fetchData(); // 🔥 load lại list mới
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi cập nhật chi tiết mượn!");
    }
  };

  const handleDelete = async (maMuonCT) => {
    if (!window.confirm("Bạn có chắc muốn xóa chi tiết mượn này?")) {
      toast.info("Đã hủy xóa.");
      return;
    }
    try {
      await deleteBorrowDetail(maMuonCT);
      toast.success("Xóa thành công!");
      fetchData(); // 🔥 load lại list mới
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi xóa!");
    }
  };

  return (
    <div className="borrow-detail-page">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold" style={{ color: "var(--primary-blue)" }}>
          Mượn Trả Chi Tiết
        </h2>
        {!showAddForm && !editingDetail && (
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => setShowAddForm(true)}
          >
            <FaPlus /> Thêm chi tiết
          </button>
        )}
      </div>

      {showAddForm && (
        <AddBorrowDetailForm
          onSave={handleAdd}
          borrows={borrows}
          books={books}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {editingDetail && (
        <UpdateBorrowDetailForm
          detail={editingDetail}
          borrows={borrows}
          books={books}
          onSave={handleUpdate}
          onClose={() => setEditingDetail(null)}
        />
      )}

      {!showAddForm && !editingDetail && (
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Mã chi tiết</th>
                    <th>Mã mượn</th>
                    <th>Tên sách</th>
                    <th>Số lượng</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowDetails.map((d) => (
                    <tr key={d.maMuonCT}>
                      <td>{d.maMuonCT?.substring(18, 24)}</td>
                      <td>{d.maMuon?.substring(18, 24)}</td>
                      <td>{d.tenSach}</td>
                      <td>{d.soLuong}</td>
                      <td>
                        <div className="btn-group">
                          <button
                            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                            onClick={() => setEditingDetail(d)}
                          >
                            <FaEdit /> Sửa
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                            onClick={() => handleDelete(d.maMuonCT)}
                          >
                            <FaTrash /> Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {borrowDetails.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
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

export default BorrowDetail;
