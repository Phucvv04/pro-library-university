import { useState } from "react";
import { toast } from "react-toastify";
import { getMembers } from "../../../services/memberService";

const AddMemberForm = ({ onSave, onCancel, existingUsers = [] }) => {
  const [formData, setFormData] = useState({
    tenNguoiDung: "",
    email: "",
    username: "",
    password: "",
    vaiTro: "Độc giả",
    gioiTinh: "Nam",
    sdt: "",
    diaChi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { tenNguoiDung, email, username, password, sdt, diaChi } = formData;

    if (!tenNguoiDung.trim()) {
      toast.error("Vui lòng nhập tên người dùng!");
      return;
    }

    if (!email.trim()) {
      toast.error("Vui lòng nhập email!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ!");
      return;
    }

    if (!username.trim()) {
      toast.error("Vui lòng nhập tên đăng nhập!");
      return;
    }

    if (!password.trim()) {
      toast.error("Vui lòng nhập mật khẩu!");
      return;
    }
    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }
    if (!sdt.trim()) {
      toast.error("Vui lòng nhập số điện thoại!");
      return;
    }

    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(sdt) || !sdt.startsWith("0") || sdt.length !== 10) {
      toast.error("Số điện thoại không hợp lệ!");
      return;
    }

    if (!diaChi.trim()) {
      toast.error("Vui lòng nhập địa chỉ!");
      return;
    }

    try {
      const res = await getMembers();
      const users = res.data;

      const isUsernameExist = users.some(
        (u) =>
          u.username?.trim().toLowerCase() === username.trim().toLowerCase()
      );
      if (isUsernameExist) {
        toast.error("Username đã tồn tại!");
        return;
      }

      const isEmailExist = users.some(
        (u) => u.email?.trim().toLowerCase() === email.trim().toLowerCase()
      );
      if (isEmailExist) {
        toast.error("Email đã được sử dụng!");
        return;
      }
      const isPhoneExist = users.some((u) => u.sdt?.trim() === sdt.trim());
      if (isPhoneExist) {
        toast.error("Số điện thoại đã tồn tại!");
        return;
      }
      await onSave(formData);

      setFormData({
        tenNguoiDung: "",
        email: "",
        username: "",
        password: "",
        vaiTro: "Độc giả",
        gioiTinh: "Nam",
        sdt: "",
        diaChi: "",
      });
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Thêm người dùng mới</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Tên người dùng</label>
              <input
                type="text"
                name="tenNguoiDung"
                className="form-control"
                value={formData.tenNguoiDung}
                onChange={handleChange}
              />
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
            </div>
            <div className="col-md-4">
              <label className="form-label">Vai trò</label>
              <select
                name="vaiTro"
                className="form-select"
                value={formData.vaiTro}
                onChange={handleChange}
              >
                <option value="Độc giả">Độc giả</option>
                <option value="Thủ thư">Thủ thư</option>
                <option value="Quản lý">Quản lý</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Giới tính</label>
              <select
                name="gioiTinh"
                className="form-select"
                value={formData.gioiTinh}
                onChange={handleChange}
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                name="sdt"
                className="form-control"
                value={formData.sdt}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Địa chỉ</label>
              <textarea
                name="diaChi"
                className="form-control"
                value={formData.diaChi}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <button type="submit" className="btn btn-success">
              Lưu
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberForm;
