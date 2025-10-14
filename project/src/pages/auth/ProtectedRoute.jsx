import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute - Chặn người dùng không có quyền truy cập vào route
 * @param {ReactNode} children - Component con
 * @param {string[]} allowedRoles - Danh sách vai trò được phép truy cập
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Nếu chưa đăng nhập → về trang login
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra quyền
  const vaiTro = user.vaiTro || "";

  if (!allowedRoles.includes(vaiTro)) {
    // Nếu không đủ quyền → quay lại Dashboard
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
