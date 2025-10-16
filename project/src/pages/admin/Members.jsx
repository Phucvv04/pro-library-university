import { useEffect, useState } from "react";
import AddMemberForm from "../../components/forms/member/AddMemberForm.jsx";
import UpdateMemberForm from "../../components/forms/member/UpdateMemberForm.jsx";
import { toast } from "react-toastify";
import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../../services/memberService";

import { getBorrows } from "../../services/borrowingService";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const memberRoles = ["all", "Độc giả", "Thủ thư", "Quản lý"];

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await getMembers();
      setMembers(res.data);
    } catch (err) {
      toast.error("Không thể tải danh sách người dùng!", {
        toastId: "fetch-members-error",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Lọc theo từ khóa + vai trò
  const filteredMembers = members.filter((member) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = member.tenNguoiDung?.toLowerCase().includes(search);
    const matchesRoles =
      selectedRole === "all" ||
      (member.vaiTro &&
        member.vaiTro.toLowerCase() === selectedRole.toLowerCase());
    return matchesSearch && matchesRoles;
  });

  // Thêm người dùng
  const handleAddMember = async (data) => {
    try {
      if (!data.tenNguoiDung?.trim()) {
        toast.error("Tên người dùng không được để trống!");
        return;
      }
      await createMember(data);
      toast.success("Thêm người dùng thành công!");
      setShowForm(false);
      fetchMembers();
    } catch (err) {
      toast.error("Lỗi khi thêm người dùng!");
      console.error(err);
    }
  };

  // Cập nhật người dùng
  const handleUpdateMember = async (data) => {
    try {
      if (!data.tenNguoiDung?.trim()) {
        toast.error("Tên người dùng không được để trống!");
        return;
      }
      await updateMember(editingMember.maNguoiDung, data);
      toast.success("Cập nhật người dùng thành công!");
      setEditingMember(null);
      fetchMembers();
    } catch (err) {
      toast.error("Lỗi khi cập nhật người dùng!");
      console.error(err);
    }
  };

  // Xóa người dùng
  const handleDeleteMember = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa người dùng này không?"
    );
    if (!confirmDelete) {
      toast.info("Đã hủy xóa người dùng.");
      return;
    }
    try {
      const borrowsRes = await getBorrows();
      const borrows = borrowsRes.data || [];

      const hasLinkedBorrows = borrows.some(
        (borrow) =>
          borrow.tenNguoiDung ===
          members.find((a) => a.maNguoiDung === id)?.tenNguoiDung
      );

      if (hasLinkedBorrows) {
        toast.error(
          "Không thể xóa người dùng vì đang được liên kết với mượn trả!"
        );
        return;
      }
      await deleteMember(id);
      toast.success("Xóa người dùng thành công!");
      fetchMembers();
    } catch (err) {
      toast.error("Lỗi khi xóa người dùng!");
      console.error(err);
    }
  };

  return (
    <div className="members-page">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h1
              className="h2 mb-2"
              style={{ color: "var(--primary-blue)", fontWeight: "700" }}
            >
              Quản lý người dùng
            </h1>
            {!showForm && !editingMember && (
              <button
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                <FaPlus className="me-2" /> Thêm người dùng
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Form thêm */}
      {showForm && (
        <AddMemberForm
          onSave={handleAddMember}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Form sửa */}
      {editingMember && (
        <UpdateMemberForm
          member={editingMember}
          onSave={handleUpdateMember}
          onClose={() => setEditingMember(null)}
        />
      )}

      {/* Nếu không mở form thì hiển thị bảng */}
      {!showForm && !editingMember && (
        <>
          {/* Search + Filter */}
          <div className="search-bar mb-3">
            <div className="row">
              {/* Ô tìm kiếm */}
              <div className="col-lg-8 mb-3">
                <div className="position-relative">
                  <FaSearch
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "12px",
                      transform: "translateY(-50%)",
                      color: "#888",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Tìm kiếm theo tên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filter vai trò */}
              <div className="col-lg-4 mb-3">
                <select
                  className="form-select"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  {memberRoles.map((role) => (
                    <option key={role} value={role}>
                      {role === "all" ? "Tất cả" : role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Bảng danh sách */}
          <div className="card">
            <div className="card-body">
              {loading ? (
                <p>Đang tải dữ liệu...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Mã</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Vai trò</th>
                        <th>Giới tính</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMembers.map((member) => (
                        <tr key={member.maNguoiDung}>
                          <td>{member.maNguoiDung?.substring(18, 24)}</td>
                          <td>{member.tenNguoiDung}</td>
                          <td>{member.email}</td>
                          <td>{member.username}</td>
                          <td>{member.password}</td>
                          <td>{member.vaiTro}</td>
                          <td>{member.gioiTinh}</td>
                          <td>{member.sdt}</td>
                          <td>{member.diaChi}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary d-flex align-items-center "
                                onClick={() => setEditingMember(member)}
                              >
                                <FaEdit className="me-1" /> Sửa
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger d-flex align-items-center"
                                onClick={() =>
                                  handleDeleteMember(member.maNguoiDung)
                                }
                              >
                                <FaTrash className="me-1" /> Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredMembers.length === 0 && (
                        <tr>
                          <td colSpan="10" className="text-center text-muted">
                            Không tìm thấy người dùng nào
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Members;
