import { useEffect, useState } from "react";
import AddPublisherForm from "../../components/forms/publisher/AddPublisherForm";
import UpdatePublisherForm from "../../components/forms/publisher/UpdatePublisherForm";
import { toast } from "react-toastify";
import {
  getPublishers,
  createPublisher,
  updatePublisher,
  deletePublisher,
} from "../../services/publisherService";
import { getBooks } from "../../services/bookService";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Publishers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingPublisher, setEditingPublisher] = useState(null);

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchPublishers = async () => {
    try {
      setLoading(true);
      const res = await getPublishers();
      setPublishers(res.data);
    } catch (err) {
      toast.error("Không thể tải danh sách NXB!", {
        toastId: "fetch-publishers-error",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPublishers = publishers.filter((publisher) =>
    publisher.tenNhaXB?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Thêm NXB
  const handleAddPublisher = async (data) => {
    try {
      await createPublisher(data);
      toast.success("Thêm nhà xuất bản thành công!");
      setShowForm(false);
      fetchPublishers();
    } catch (err) {
      toast.error("Lỗi khi thêm NXB!");
      console.error(err);
    }
  };

  // Cập nhật NXB
  const handleUpdatePublisher = async (data) => {
    try {
      await updatePublisher(editingPublisher.maNhaXB, data);
      toast.success("Cập nhật nhà xuất bản thành công!");
      setEditingPublisher(null);
      fetchPublishers();
    } catch (err) {
      toast.error("Lỗi khi cập nhật NXB!");
      console.error(err);
    }
  };

  // Xóa NXB
  const handleDeletePublisher = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa nhà xuất bản này?"
    );
    if (!confirmDelete) {
      toast.info("Đã hủy xóa nhà xuất bản.");
      return;
    }
    try {
      const booksRes = await getBooks();
      const books = booksRes.data || [];

      const hasLinkedBooks = books.some(
        (book) =>
          book.tenNhaXB === publishers.find((a) => a.maNhaXB === id)?.tenNhaXB
      );

      if (hasLinkedBooks) {
        toast.error("Không thể xóa NXB vì đang được liên kết với sách!");
        return;
      }

      await deletePublisher(id);
      toast.success("Xóa nhà xuất bản thành công!");
      fetchPublishers();
    } catch (err) {
      toast.error("Lỗi khi xóa NXB!");
      console.error(err);
    }
  };

  return (
    <div className="publishers-page">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h1
              className="h2 mb-2"
              style={{ color: "var(--primary-blue)", fontWeight: "700" }}
            >
              Quản lý nhà xuất bản
            </h1>
            {!showForm && !editingPublisher && (
              <button
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                <FaPlus className="me-2" />
                Thêm NXB
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Form thêm */}
      {showForm && (
        <AddPublisherForm
          onSave={handleAddPublisher}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Form sửa */}
      {editingPublisher && (
        <UpdatePublisherForm
          publisher={editingPublisher}
          publishers={publishers}
          onSave={handleUpdatePublisher}
          onClose={() => setEditingPublisher(null)}
        />
      )}

      {/* Nếu không mở form thì hiển thị bảng */}
      {!showForm && !editingPublisher && (
        <>
          {/* Search */}
          <div className="mb-3 position-relative">
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
              placeholder="Tìm kiếm theo tên nhà xuất bản..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                        <th>Mã NXB</th>
                        <th>Tên NXB</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPublishers.map((publisher) => (
                        <tr key={publisher.maNhaXB}>
                          <td>{publisher.maNhaXB?.substring(18, 24)}</td>
                          <td>{publisher.tenNhaXB}</td>
                          <td>{publisher.moTa}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary d-flex align-items-center"
                                onClick={() => setEditingPublisher(publisher)}
                              >
                                <FaEdit className="me-1" />
                                Sửa
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger d-flex align-items-center"
                                onClick={() =>
                                  handleDeletePublisher(publisher.maNhaXB)
                                }
                              >
                                <FaTrash className="me-1" />
                                Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredPublishers.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center text-muted">
                            Không tìm thấy nhà xuất bản nào
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

export default Publishers;
