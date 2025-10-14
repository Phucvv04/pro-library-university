import { useState } from "react";

const AddMemberForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    tenNguoiDung: "",
    email: "",
    username: "",
    password: "",
    vaiTro: "Độc giả",
    gioiTinh: "",
    sdt: "",
    diaChi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
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
                required
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
                required
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
                required
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
                required
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
              <input
                type="text"
                name="diaChi"
                className="form-control"
                value={formData.diaChi}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-3 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={onCancel}
            >
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberForm;
