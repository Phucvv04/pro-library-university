import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    tenNguoiDung: "",
    email: "",
    username: "",
    password: "",
    vaiTro: "Sinh Viên",
    gioiTinh: "Nam",
    sdt: "",
    diaChi: "",
  });

  const [errors, setErrors] = useState({}); // lưu lỗi validate
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // xóa lỗi khi nhập lại
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.tenNguoiDung.trim())
      newErrors.tenNguoiDung = "Vui lòng nhập họ và tên";

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // chỉ chấp nhận email kết thúc bằng @gmail.com
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email phải có định dạng @gmail.com";
      }
    }

    if (!formData.username.trim())
      newErrors.username = "Vui lòng nhập username";
    if (!formData.password.trim())
      newErrors.password = "Vui lòng nhập password";

    if (!formData.sdt.trim()) {
      newErrors.sdt = "Vui lòng nhập số điện thoại";
    } else {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.sdt)) {
        newErrors.sdt = "Số điện thoại phải gồm đúng 10 chữ số";
      }
    }

    if (!formData.diaChi.trim()) newErrors.diaChi = "Vui lòng nhập địa chỉ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // nếu lỗi thì không submit

    try {
      await axios.post("http://localhost:8085/api/nguoi-dung", formData);

      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi đăng ký!");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderRadius: "20px",
        }}
      >
        <h3 className="mb-4 text-center fw-bold" style={{ color: "#1e3a8a" }}>
          Đăng ký tài khoản
        </h3>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Họ và tên</label>
            <input
              type="text"
              name="tenNguoiDung"
              className="form-control"
              value={formData.tenNguoiDung}
              onChange={handleChange}
            />
            {errors.tenNguoiDung && (
              <small className="text-danger">{errors.tenNguoiDung}</small>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <small className="text-danger">{errors.username}</small>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Vai trò</label>
            <select
              name="vaiTro"
              className="form-select"
              value={formData.vaiTro}
              onChange={handleChange}
            >
              <option>Sinh Viên</option>
              <option>Giảng Viên</option>
              <option>Thủ Thư</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Giới tính</label>
            <select
              name="gioiTinh"
              className="form-select"
              value={formData.gioiTinh}
              onChange={handleChange}
            >
              <option>Nam</option>
              <option>Nữ</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Số điện thoại</label>
            <input
              type="text"
              name="sdt"
              className="form-control"
              value={formData.sdt}
              onChange={handleChange}
            />
            {errors.sdt && <small className="text-danger">{errors.sdt}</small>}
          </div>
          <div className="col-12">
            <label className="form-label">Địa chỉ</label>
            <input
              type="text"
              name="diaChi"
              className="form-control"
              value={formData.diaChi}
              onChange={handleChange}
            />
            {errors.diaChi && (
              <small className="text-danger">{errors.diaChi}</small>
            )}
          </div>

          <div className="col-12 mt-3">
            <button
              type="submit"
              className="btn btn-success w-100 fw-semibold"
              style={{ borderRadius: "8px" }}
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
