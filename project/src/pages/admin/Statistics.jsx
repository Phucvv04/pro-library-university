import { useEffect, useState } from "react";
import { getBooks } from "../../services/bookService";
import { getBorrows } from "../../services/borrowingService";
import { getBorrowDetails } from "../../services/borrowingDetailService";
import {
  FaChartLine,
  FaBook,
  FaFileAlt,
  FaBookReader,
  FaMoneyBillWave,
  FaListAlt,
} from "react-icons/fa";

const Statistics = () => {
  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [borrowDetails, setBorrowDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, borrowsRes, detailsRes] = await Promise.all([
          getBooks(),
          getBorrows(),
          getBorrowDetails(),
        ]);
        setBooks(booksRes.data || []);
        setBorrows(borrowsRes.data || []);
        setBorrowDetails(detailsRes.data || []);
      } catch (error) {
        console.error("Lỗi khi load dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Đang tải thống kê...</p>;

  // Tính toán
  const totalBooks = books.length;
  const totalBorrows = borrows.length;
  const totalBorrowedBooks = borrowDetails.length;
  const calculateFine = (detail, borrow) => {
    let fine = detail.tienPhat || 0;
    if (borrow?.trangThai === "Quá hạn") {
      fine += 100000;
    }
    return fine;
  };

  const totalFine = borrowDetails.reduce((sum, d) => {
    const borrow = borrows.find((b) => b.maMuon === d.maMuon);
    return sum + calculateFine(d, borrow);
  }, 0);

  return (
    <div className="statistics-page">
      <h2 className="mb-4 text-primary fw-bold">
        <FaChartLine className="me-2" />
        Thống kê mượn trả
      </h2>

      {/* Thông tin tổng hợp */}
      <div className="card shadow-sm p-3 mb-4 border-0 rounded-3">
        <div className="row text-center">
          <div className="col-md-3 mb-2">
            <div className="p-3 bg-light rounded">
              <h5 className="mb-1 text-primary">
                <FaBook className="me-2" />
                Tổng số sách
              </h5>
              <p className="fs-5 fw-bold">{totalBooks}</p>
            </div>
          </div>
          <div className="col-md-3 mb-2">
            <div className="p-3 bg-light rounded">
              <h5 className="mb-1 text-success">
                <FaFileAlt className="me-2" />
                Phiếu mượn
              </h5>
              <p className="fs-5 fw-bold">{totalBorrows}</p>
            </div>
          </div>
          <div className="col-md-3 mb-2">
            <div className="p-3 bg-light rounded">
              <h5 className="mb-1 text-warning">
                <FaBookReader className="me-2" />
                Sách đã mượn
              </h5>
              <p className="fs-5 fw-bold">{totalBorrowedBooks}</p>
            </div>
          </div>
          <div className="col-md-3 mb-2">
            <div className="p-3 bg-light rounded">
              <h5 className="mb-1 text-danger">
                <FaMoneyBillWave className="me-2" />
                Tổng tiền phạt
              </h5>
              <p className="fs-5 fw-bold">{totalFine.toLocaleString()} đ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng chi tiết */}
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-body table-responsive">
          <h5 className="fw-bold mb-3">
            <FaListAlt className="me-2" />
            Chi tiết mượn trả
          </h5>
          <table className="table table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th>STT</th>
                <th>Mã mượn</th>
                <th>Tên sách</th>
                <th>Tiền phạt</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {borrowDetails.map((d) => {
                const borrow = borrows.find((b) => b.maMuon === d.maMuon);
                const fine = calculateFine(d, borrow);
                return (
                  <tr
                    key={d._id}
                    className={
                      borrow?.trangThai === "Quá hạn" ? "table-danger" : ""
                    }
                  >
                    <td>{borrowDetails.indexOf(d) + 1}</td>
                    <td>{d.maMuon?.substring(18, 24)}</td>
                    <td>{d.tenSach}</td>
                    <td>{fine.toLocaleString()} đ</td>
                    <td>
                      <span
                        className={`badge ${
                          borrow?.trangThai === "Quá hạn"
                            ? "bg-danger text-dark"
                            : borrow?.trangThai === "Đã trả"
                            ? "bg-warning text-dark"
                            : "bg-success text-dark"
                        }`}
                      >
                        {borrow?.trangThai}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {borrowDetails.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
