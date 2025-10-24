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
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const BorrowingDetail = () => {
  const [borrowDetails, setBorrowDetails] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [books, setBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDetail, setEditingDetail] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
      const borrowMap = new Map(
        borrowRes.data.map((b) => [b.maMuon, b.tenNguoiDung])
      );
      const mergedDetails = detailRes.data.map((d) => ({
        ...d,
        tenNguoiDung: borrowMap.get(d.maMuon) || "Không xác định",
      }));

      setBorrowDetails(mergedDetails);
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
      fetchData();
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
      fetchData();
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
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi xóa!");
    }
  };

  //Lọc danh sách theo từ khóa tìm kiếm
  const filteredDetails = borrowDetails.filter((d) =>
    d.tenNguoiDung?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {!showAddForm && !editingDetail && (
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
            placeholder="Tìm theo tên người dùng"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {showAddForm && (
        <AddBorrowDetailForm
          onSave={handleAdd}
          borrows={borrows}
          books={books}
          borrowDetails={borrowDetails}
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
                    <th>STT</th>
                    <th>Mã mượn chi tiết</th>
                    <th>Mã mượn</th>
                    <th>Tên độc giả</th>
                    <th>Tên sách</th>
                    <th>Số lượng</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDetails.length > 0 ? (
                    filteredDetails.map((d) => (
                      <tr key={d.maMuonCT}>
                        <td>{filteredDetails.indexOf(d) + 1}</td>
                        <td>{d.maMuonCT?.substring(18, 24)}</td>
                        <td>{d.maMuon?.substring(18, 24)}</td>
                        <td>
                          <strong>{d.tenNguoiDung}</strong>
                        </td>
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        Không có dữ liệu phù hợp
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

export default BorrowingDetail;
