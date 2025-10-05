import React, { useEffect, useState } from "react";
import { BookOpen, Calendar, Book, BellRing } from "lucide-react";
import { getBorrows } from "../../../services/borrowingService";
import { getBorrowDetails } from "../../../services/borrowingDetailService";

const BorrowReturn = () => {
  const [borrows, setBorrows] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBorrows();
        const allBorrows = res.data;

        if (!currentUser) return;

        // lọc ra các phiếu mượn của user hiện tại
        const userBorrows = allBorrows.filter(
          (b) => b.tenNguoiDung === currentUser.tenNguoiDung
        );

        // lấy toàn bộ chi tiết một lần
        const detailRes = await getBorrowDetails();
        const allDetails = detailRes.data;

        // ghép chi tiết theo maMuon
        const withDetails = userBorrows.map((item) => {
          const chiTiet = allDetails.filter((ct) => ct.maMuon === item.maMuon);
          return { ...item, chiTiet };
        });

        setBorrows(withDetails);
      } catch (error) {
        console.error("Lỗi load mượn trả:", error);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  return (
    <div className="page-container">
      <h2 className="page-title flex items-center gap-2">
        <BookOpen size={22} /> Thông tin mượn trả
      </h2>

      {borrows.length === 0 ? (
        <p className="text-gray-500">Bạn chưa có phiếu mượn nào.</p>
      ) : (
        borrows.map((item) => (
          <div key={item.maMuon} className="card-custom">
            <p>
              <Calendar /> Ngày mượn: {item.ngayMuon?.substring(0, 10)}
            </p>
            <p>
              <Calendar /> Hạn trả: {item.ngayTraDuKien?.substring(0, 10)}
            </p>
            <p>
              <BellRing /> Trạng thái:{" "}
              <strong
                className={
                  item.trangThai === "Đã trả"
                    ? "status-returned"
                    : item.trangThai === "Quá hạn"
                    ? "status-overdue"
                    : "status-borrowing"
                }
              >
                {item.trangThai || "Đang mượn"}
              </strong>
            </p>

            <div className="mt-2">
              <h6>
                <Book /> Sách mượn:
              </h6>
              {item.chiTiet && item.chiTiet.length > 0 ? (
                item.chiTiet.map((ct, index) => (
                  <p key={index}>
                    {ct.tenSach} (SL: {ct.soLuong})
                  </p>
                ))
              ) : (
                <p>Không có sách</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BorrowReturn;
