import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getMembers } from "../../services/memberService";

const Login = () => {
  const [vaiTro, setVaiTro] = useState("Độc giả");
  const roles = [
    { label: "docgia", value: "Độc giả" },
    { label: "thuthu", value: "Thủ thư" },
    { label: "quanly", value: "Quản lý" },
  ];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ Kiểm tra trống
    if (!username || !password) {
      alert("Vui lòng nhập thông tin");
      return;
    }

    // 2️⃣ Kiểm tra ký tự đặc biệt
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(username)) {
      alert("Tài khoản không hợp lệ");
      return;
    }

    try {
      const res = await getMembers();
      const members = res.data;

      // 3️⃣ Kiểm tra tài khoản tồn tại
      const userExist = members.find((m) => m.username === username);
      if (!userExist) {
        alert("Tài khoản không tồn tại");
        return;
      }

      // 4️⃣ Kiểm tra mật khẩu
      if (userExist.password !== password) {
        alert("Sai tài khoản hoặc mật khẩu");
        return;
      }

      // 5️⃣ Kiểm tra vai trò
      if (userExist.vaiTro !== vaiTro) {
        alert("Đăng nhập không thành công");
        return;
      }

      // ✅ Thành công
      localStorage.setItem("user", JSON.stringify(userExist));

      if (vaiTro === "Thủ thư" || vaiTro === "Quản lý") {
        navigate("/admin");
      } else {
        navigate("/client");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Đăng nhập không thành công!");
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
