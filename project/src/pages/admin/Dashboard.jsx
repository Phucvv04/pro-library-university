import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaPlus,
  FaUserPlus,
  FaUndo,
  FaBolt,
  FaChartBar,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="mb-4">
        <h1 className="h2 fw-bold" style={{ color: "var(--primary-blue)" }}>
          <FaChartBar style={{ marginRight: "8px" }} /> Thư viện - Dashboard
        </h1>
      </div>

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
