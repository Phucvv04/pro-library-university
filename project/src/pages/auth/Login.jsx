import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getMembers } from "../../services/memberService";

const Login = () => {
  const [vaiTro, setVaiTro] = useState("Sinh Viên");
  const roles = [
    { label: "SinhVien", value: "Sinh Viên" },
    { label: "GiangVien", value: "Giảng Viên" },
    { label: "ThuThu", value: "Thủ Thư" },
  ];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await getMembers();
      const members = res.data;

      const user = members.find(
        (m) =>
          m.username === username &&
          m.password === password &&
          m.vaiTro === vaiTro
      );

      if (user) {
        // ✅ Lưu user vào localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Điều hướng theo vai trò
        if (vaiTro === "Thủ Thư") {
          navigate("/admin");
        } else {
          navigate("/client");
        }
      } else {
        alert("Sai tài khoản hoặc mật khẩu!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Có lỗi xảy ra khi đăng nhập!");
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
          maxWidth: "500px",
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderRadius: "20px",
        }}
      >
        <h3 className="mb-4 text-center fw-bold" style={{ color: "#1e3a8a" }}>
          Đăng nhập tài khoản
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Bạn là ai?</label>
            <select
              className="form-select"
              value={vaiTro}
              onChange={(e) => setVaiTro(e.target.value)}
            >
              {roles.map((role) => (
                <option key={role.label} value={role.value}>
                  {role.value}
                </option>
              ))}
            </select>
          </div>

          {/* Username */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Tài khoản</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tài khoản..."
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu..."
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            style={{ borderRadius: "8px" }}
          >
            Đăng nhập
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Bạn chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="fw-bold"
              style={{ color: "#1e3a8a" }}
            >
              Đăng ký
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
