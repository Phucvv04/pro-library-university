// src/pages/client/BooksContent.jsx
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Badge, ListGroup, Spinner } from "react-bootstrap";
import { BookOpen, Folder, Book, Star } from "lucide-react";
import { getBooks } from "../../../services/bookService";
import { getCategories } from "../../../services/categoryService";
import { useLocation } from "react-router-dom";

const BooksContent = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // lấy query param từ URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, catsRes] = await Promise.all([
          getBooks(),
          getCategories(),
        ]);

        const booksData = booksRes.data;
        const cats = catsRes.data;

        setCategories(cats);
        setBooks(booksData);

        setFeaturedBooks(booksData.slice(0, 6));

        const shuffled = [...booksData].sort(() => 0.5 - Math.random());
        setRecommendedBooks(shuffled.slice(0, 6));
      } catch (error) {
        console.error("Lỗi load dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
        <p>Đang tải dữ liệu sách...</p>
      </div>
    );
  }

  //  Ưu tiên lọc theo search > category
  let filteredBooks = [];
  if (search) {
    filteredBooks = books.filter((b) =>
      b.tenSach.toLowerCase().includes(search)
    );
  } else if (selectedCategory) {
    filteredBooks = books.filter((b) => b.tenTheLoai === selectedCategory);
  }

  return (
    <Row>
      {/* Sidebar danh mục */}
      <Col md={3}>
        <div className="category-sidebar p-3 shadow-sm rounded bg-white mb-4">
          <h5 className="fw-bold mb-3">
            <Folder color="#cc5017ff" /> Thể loại
          </h5>
          <ListGroup className="category-list">
            {categories.map((cat) => (
              <ListGroup.Item
                key={cat.maTheLoai}
                action
                active={selectedCategory === cat.tenTheLoai}
                onClick={() => setSelectedCategory(cat.tenTheLoai)}
              >
                {cat.tenTheLoai}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Col>

      {/* Nội dung sách */}
      <Col md={9}>
        {search ? (
          //  Kết quả tìm kiếm
          <div className="books-section p-4 mb-5 rounded shadow-sm bg-white">
            <h3 className="mb-4">Kết quả tìm kiếm cho: "{search}"</h3>
            <Row className="g-4">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <Col key={book.maSach} sm={6} lg={4}>
                    <Card className="book-card h-100 shadow-sm">
                      <Card.Body>
                        <Card.Title className="h6 fw-bold">
                          {book.tenSach}
                        </Card.Title>
                        <Card.Text className="text-muted">
                          Tác giả: {book.tenTacGia || "Chưa rõ"}
                        </Card.Text>
                        <Badge bg="primary">{book.tenTheLoai}</Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>Không tìm thấy sách nào.</p>
              )}
            </Row>
          </div>
        ) : selectedCategory ? (
          //  Lọc theo thể loại
          <div className="books-section p-4 mb-5 rounded shadow-sm bg-white">
            <h3 className="mb-4 section-title">
              <BookOpen color="#007BFF" /> Sách thuộc thể loại:{" "}
              {selectedCategory}
            </h3>
            <Row className="g-4">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <Col key={book.maSach} sm={6} lg={4}>
                    <Card className="book-card h-100 shadow-sm">
                      <Card.Body>
                        <Card.Title className="h6 fw-bold">
                          {book.tenSach}
                        </Card.Title>
                        <Card.Text className="text-muted">
                          Tác giả: {book.tenTacGia || "Chưa rõ"}
                        </Card.Text>
                        <Badge bg="primary">{book.tenTheLoai}</Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>Không có sách nào trong thể loại này.</p>
              )}
            </Row>
          </div>
        ) : (
          //  Hiển thị mặc định: nổi bật + đề xuất
          <>
            <div className="books-section p-4 mb-5 rounded shadow-sm bg-light">
              <h3 className="mb-4 section-title">
                <Book color="#ff0000" /> Sách nổi bật
              </h3>
              <Row className="g-4">
                {featuredBooks.map((book) => (
                  <Col key={book.maSach} sm={6} lg={4}>
                    <Card className="book-card h-100 shadow-sm">
                      <Card.Body>
                        <Card.Title className="h6 fw-bold">
                          {book.tenSach.toUpperCase()}
                        </Card.Title>
                        <Badge bg="success">{book.tenTheLoai}</Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            <div className="books-section p-4 mb-5 rounded shadow-sm bg-white">
              <h3 className="mb-4 section-title">
                <Star color="#FFD700" /> Sách được đề xuất
              </h3>
              <Row className="g-4">
                {recommendedBooks.map((book) => (
                  <Col key={book.maSach} sm={6} lg={4}>
                    <Card className="recommend-card h-100 text-center shadow-sm">
                      <Card.Body>
                        <BookOpen size={30} color="#007BFF" />
                        <Card.Title className="h6 fw-bold">
                          {book.tenSach}
                        </Card.Title>
                        <Card.Text className="text-muted">
                          Tác giả: {book.tenTacGia || "Chưa rõ"}
                        </Card.Text>
                        <Badge bg="warning">{book.tenTheLoai}</Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}
      </Col>
    </Row>
  );
};

export default BooksContent;
