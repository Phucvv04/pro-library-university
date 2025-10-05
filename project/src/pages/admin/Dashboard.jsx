import { Link } from "react-router-dom";
import {
  FaBook,
  FaUsers,
  FaBookOpen,
  FaExclamationTriangle,
  FaClock,
  FaPlus,
  FaUserPlus,
  FaUndo,
  FaBolt,
  FaChartBar,
} from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    {
      title: "Tổng số sách",
      count: "12.467",
      icon: <FaBook />,
      color: "primary",
    },
    {
      title: "Thành viên",
      count: "2,456",
      icon: <FaUsers />,
      color: "success",
    },
    {
      title: "Sách mượn",
      count: "387",
      icon: <FaBookOpen />,
      color: "warning",
    },
    {
      title: "Trả quá hạn",
      count: "23",
      icon: <FaExclamationTriangle />,
      color: "danger",
    },
  ];

  const recentActivities = [
    {
      action: "Mượn sách",
      item: "Toán học nâng cao",
      member: "Vũ Văn Phúc",
      time: "2 phút trước",
    },
    {
      action: "Đã thanh toán tiền phạt",
      item: "Cơ sở vật lý",
      member: "Trương Quốc Tuấn",
      time: "15 phút trước",
    },
    {
      action: "Thành viên mới",
      item: "Đã hoàn tất đăng ký",
      member: "Nguyễn Thị Tuyết Như",
      time: "1 giờ trước",
    },
    {
      action: "Trả sách",
      item: "Cơ bản về khoa học máy tính",
      member: "Cao Thị Lệ Diễm",
      time: "2 giờ trước",
    },
  ];

  const popularBooks = [
    {
      title: "Giới thiệu về Tâm lý học",
      author: "TS. Nguyễn Thị Lan",
      borrowed: 45,
    },
    {
      title: "Giải tích và Hình học giải tích",
      author: "PGS. Trần Văn Minh",
      borrowed: 38,
    },
    {
      title: "Lịch sử thế giới hiện đại",
      author: "TS. Lê Thị Hồng",
      borrowed: 32,
    },
    { title: "Hóa học hữu cơ", author: "GS. Phạm Văn Tài", borrowed: 28 },
    {
      title: "Chiến lược tiếp thị kỹ thuật số",
      author: "ThS. Nguyễn Thu Trang",
      borrowed: 25,
    },
  ];

  return (
    <div className="dashboard">
      <div className="mb-4">
        <h1 className="h2 fw-bold" style={{ color: "var(--primary-blue)" }}>
          <FaChartBar style={{ marginRight: "8px" }} /> Thư viện - Dashboard
        </h1>
      </div>

      {/* Hàng 1: Thống kê nhanh */}
      <div className="row mb-5">
        {stats.map((stat, index) => (
          <div className="col-lg-3 col-md-6 mb-3" key={index}>
            <div
              className={`card shadow-sm border-0 bg-${stat.color} text-white`}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="fw-bold mb-1">{stat.count}</h3>
                  <p className="mb-0">{stat.title}</p>
                </div>
                <div style={{ fontSize: "2.5rem", opacity: 0.8 }}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hàng 2: Nội dung chính */}
      <div className="row mb-5">
        {/* Hoạt động gần đây */}
        <div className="col-lg-8 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-bottom-0 pb-0">
              <h5
                className="card-title fw-bold"
                style={{ color: "var(--primary-blue)" }}
              >
                <FaClock style={{ marginRight: "8px" }} /> Hoạt động gần đây
              </h5>
            </div>
            <div className="card-body pt-2">
              <div className="list-group list-group-flush">
                {recentActivities.map((activity, index) => (
                  <div
                    className="list-group-item border-0 px-0 py-3"
                    key={index}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center mb-1">
                          <span className="badge bg-primary me-2">
                            {activity.action}
                          </span>
                          <strong>{activity.item}</strong>
                        </div>
                        <small className="text-muted">
                          bởi {activity.member}
                        </small>
                      </div>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sách phổ biến */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-bottom-0 pb-0">
              <h5
                className="card-title fw-bold"
                style={{ color: "var(--primary-blue)" }}
              >
                <FaBook style={{ marginRight: "8px" }} /> Sách phổ biến
              </h5>
            </div>
            <div className="card-body pt-2">
              {popularBooks.map((book, index) => (
                <div className="mb-3" key={index}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="mb-1" style={{ fontSize: "0.9rem" }}>
                        {book.title}
                      </h6>
                      <small className="text-muted">{book.author}</small>
                    </div>
                    <span className="badge bg-success">{book.borrowed}</span>
                  </div>
                  <div className="progress mt-1" style={{ height: "6px" }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${(book.borrowed / 45) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hàng 3: Hành động nhanh */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white border-bottom-0 pb-0">
          <h5
            className="card-title fw-bold"
            style={{ color: "var(--primary-blue)" }}
          >
            <FaBolt style={{ marginRight: "8px" }} /> Hành động nhanh
          </h5>
        </div>
        <div className="card-body pt-3">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-3">
              <Link to={"/admin/books"} className="btn btn-primary w-100 py-3">
                <FaPlus style={{ fontSize: "1.2rem", marginBottom: "6px" }} />
                <br />
                Thêm sách mới
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <Link
                to={"/admin/members"}
                className="btn btn-success w-100 py-3"
              >
                <FaUserPlus
                  style={{ fontSize: "1.2rem", marginBottom: "6px" }}
                />
                <br />
                Đăng ký thành viên
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <Link
                to={"/admin/borrowing"}
                className="btn btn-warning w-100 py-3"
              >
                <FaBookOpen
                  style={{ fontSize: "1.2rem", marginBottom: "6px" }}
                />
                <br />
                Mượn sách
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <Link
                to={"/admin/borrowingdetail"}
                className="btn btn-info w-100 py-3"
              >
                <FaUndo style={{ fontSize: "1.2rem", marginBottom: "6px" }} />
                <br />
                Mượn trả chi tiết
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
