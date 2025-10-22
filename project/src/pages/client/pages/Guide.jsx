import React from "react";
import { Info } from "lucide-react";

const Guide = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">
        <Info size={22} /> Hướng dẫn sử dụng
      </h2>

      <div className="card-custom">
        <h5 className="card-title">Cách tìm kiếm sách</h5>
        <p className="card-text">
          Sử dụng thanh tìm kiếm ở đầu trang để nhập tên sách, tác giả hoặc thể
          loại. Hệ thống sẽ hiển thị danh sách kết quả phù hợp.
        </p>
      </div>

      <div className="card-custom mt-3">
        <h5 className="card-title">Cách mượn sách</h5>
        <p className="card-text">
          Độc giả có thể đăng nhập vào tài khoản, chọn sách và gửi yêu cầu mượn
          trực tuyến. Sau đó, đến quầy thủ thư để nhận sách.
        </p>
      </div>
    </div>
  );
};

export default Guide;
