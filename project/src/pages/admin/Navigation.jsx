import { Link, useLocation } from "react-router-dom";
import {
  FaChartBar,
  FaBook,
  FaUsers,
  FaUser,
  FaBuilding,
  FaFolder,
  FaBookOpen,
  FaListAlt,
  FaChartLine,
  FaSignOutAlt,
  FaUniversity,
} from "react-icons/fa";

const Navigation = () => {
  const location = useLocation();

  // Lấy thông tin vai trò (ví dụ: từ localStorage hoặc Context)
  const user = JSON.parse(localStorage.getItem("user"));
  const vaiTro = user?.vaiTro || ""; // ví dụ "Admin" hoặc "Thủ thư"

  const isActive = (path) => location.pathname === path;

  // Danh sách menu mặc định
  const navItems = [
    { path: "/admin", icon: <FaChartBar />, label: "Dashboard" },
    { path: "/admin/books", icon: <FaBook />, label: "Quản lý sách" },
    { path: "/admin/members", icon: <FaUsers />, label: "Quản lý người dùng" },
    { path: "/admin/authors", icon: <FaUser />, label: "Quản lý tác giả" },
    {
      path: "/admin/publishers",
      icon: <FaBuilding />,
      label: "Quản lý nhà xuất bản",
    },
    {
      path: "/admin/categories",
      icon: <FaFolder />,
      label: "Quản lý thể loại",
    },
    { path: "/admin/borrowing", icon: <FaBookOpen />, label: "Mượn sách" },
    {
      path: "/admin/borrowingdetail",
      icon: <FaListAlt />,
      label: "Mượn trả chi tiết",
    },
    { path: "/admin/statistics", icon: <FaChartLine />, label: "Thống kê" },
  ];

  // Nếu là Thủ thư thì loại bỏ menu Quản lý người dùng
  const filteredNavItems =
    vaiTro === "Thủ thư"
      ? navItems.filter((item) => item.path !== "/admin/members")
      : navItems;

  return (
    <nav
      className="navbar navbar-dark fixed-top custom-navbar d-none d-lg-flex flex-column"
      style={{
        width: "280px",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <div className="container-fluid flex-column align-items-stretch">
        {/* Logo */}
        <Link
          className="navbar-brand d-flex align-items-center justify-content-center mb-4 mt-2"
          to="/"
        >
          <FaUniversity style={{ fontSize: "1.8rem", marginRight: "8px" }} />
          <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
            Thư viện Đại học
          </span>
        </Link>

        {/* Menu */}
        <ul className="nav nav-pills flex-column mb-auto">
          {filteredNavItems.map((item) => (
            <li className="nav-item mb-2" key={item.path}>
              <Link
                className={`nav-link d-flex align-items-center ${
                  isActive(item.path) ? "active" : ""
                }`}
                to={item.path}
                style={{
                  borderRadius: "8px",
                  padding: "12px 16px",
                  color: isActive(item.path)
                    ? "#1e3a8a"
                    : "rgba(255, 255, 255, 0.85)",
                  backgroundColor: isActive(item.path)
                    ? "white"
                    : "transparent",
                  fontWeight: isActive(item.path) ? "600" : "500",
                  transition: "all 0.3s ease",
                }}
              >
                <span style={{ fontSize: "1.2rem", marginRight: "12px" }}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Đăng xuất */}
        <div
          className="mt-auto mb-3 p-3"
          style={{
            backgroundColor: "rgba(207, 111, 111, 0.15)",
            borderRadius: "12px",
          }}
        >
          <Link
            to="/login"
            className="btn btn-sm w-100 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              fontWeight: "600",
              borderRadius: "8px",
              transition: "all 0.3s ease",
            }}
          >
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            Đăng xuất
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
