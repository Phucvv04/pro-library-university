import { useState } from "react";
import { toast } from "react-toastify";

const UpdateMemberForm = ({ member, onSave, onClose, existingUsers = [] }) => {
  const [formData, setFormData] = useState({ ...member });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { tenNguoiDung, email, username, password, sdt, diaChi } = formData;

    if (!tenNguoiDung.trim()) {
      toast.error("Vui lòng nhập tên người dùng!");
      return;
    }

    const isUsernameExist = existingUsers.some(
      (u) =>
        u.username.trim().toLowerCase() === username.trim().toLowerCase() &&
        u.id !== member.id
    );
    if (isUsernameExist) {
      toast.error("Tên đăng nhập đã tồn tại!");
      return;
    }

    const isEmailExist = existingUsers.some(
      (u) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.id !== member.id
    );
    if (isEmailExist) {
      toast.error("Email đã được sử dụng!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ!");
      return;
    }
    if (password.trim().length < 6) {
      toast.error("Mật khẩu không hợp lệ!");
      return;
    }

    const phoneRegex = /^[0-9]+$/;
    if (
      sdt &&
      (!phoneRegex.test(sdt) || !sdt.startsWith("0") || sdt.length < 10)
    ) {
      toast.error("Số điện thoại không hợp lệ!");
      return;
    }

    if (!diaChi.trim()) {
      toast.error("Vui lòng nhập địa chỉ!");
      return;
    }

    onSave(formData);
    toast.success("Cập nhật người dùng thành công!");
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Cập nhật người dùng</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Tên người dùng</label>
              <input
                type="text"
                name="tenNguoiDung"
                className="form-control"
                value={formData.tenNguoiDung || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Vai trò</label>
              <select
                name="vaiTro"
                className="form-select"
                value={formData.vaiTro || ""}
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
                value={formData.gioiTinh || ""}
                onChange={handleChange}
              >
                <option value="">--Chọn--</option>
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
                value={formData.sdt || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Địa chỉ</label>
              <input
                type="text"
                name="diaChi"
                className="form-control"
                value={formData.diaChi || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-3 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={onClose}
            >
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMemberForm;
