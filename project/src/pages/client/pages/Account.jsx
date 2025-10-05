import React, { useEffect, useState } from "react";
import { LogOut, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaUsers,
  FaEnvelope,
  FaPhone,
  FaHouseUser,
  FaVenusMars,
} from "react-icons/fa";
const Account = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Xoá thông tin user
    setUser(null);
    navigate("/login"); // Điều hướng về trang login
  };

  const handleLogin = () => {
    navigate("/login"); // Chuyển đến trang đăng nhập
  };

  if (!user) {
    return (
      <div className="page-container">
        <h2 className="page-title flex items-center gap-2">
          <FaUser /> Tài khoản của tôi
        </h2>
        <p>Bạn chưa đăng nhập. Vui lòng đăng nhập lại.</p>
        <button
          className="btn-login flex items-center gap-1 mt-3"
          onClick={handleLogin}
        >
          <LogIn size={16} /> Đăng nhập
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 className="page-title flex items-center gap-2">
        <FaUser /> Tài khoản của tôi
      </h2>

      <div className="card-custom">
        <h5 className="card-title">Thông tin cá nhân</h5>
        <p className="card-text">
          <FaUser /> Họ tên: {user.tenNguoiDung}
        </p>
        <p className="card-text">
          <FaEnvelope /> Email: {user.email}
        </p>
        <p className="card-text">
          <FaPhone /> Số điện thoại: {user.sdt}
        </p>
        <p className="card-text">
          <FaHouseUser /> Địa chỉ: {user.diaChi}
        </p>
        <p className="card-text">
          <FaUsers /> Vai trò: {user.vaiTro}
        </p>
        <p className="card-text">
          <FaVenusMars /> Giới tính: {user.gioiTinh}
        </p>

        <div className="flex gap-2 mt-3">
          <button
            className="btn-logout flex items-center gap-1"
            onClick={handleLogout}
          >
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
