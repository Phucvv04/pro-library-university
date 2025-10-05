// src/components/Header.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { BookOpen, Search, Info, Home, Newspaper, User } from "lucide-react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const navItems = [
    { to: "/client", label: "Trang chủ", icon: Home },
    {
      to: "/client/borrow-return",
      label: "Thông tin mượn trả",
      icon: BookOpen,
    },
    { to: "/client/guide", label: "Hướng dẫn sử dụng", icon: Info },
    { to: "/client/news", label: "Tin tức - Sự kiện", icon: Newspaper },
    { to: "/client/account", label: "Tài khoản", icon: User },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    // 👉 Điều hướng ngay trên /client kèm query param
    navigate(`/client?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="header-banner text-white">
      <Container>
        {/* Banner */}
        <Row className="align-items-center py-4">
          <Col md={6}>
            <h1 className="mb-1 fw-bold site-title"> THƯ VIỆN TRỰC TUYẾN</h1>
            <p className="text-light opacity-75 mb-0">
              Hệ thống quản lý thư viện hiện đại
            </p>
          </Col>
        </Row>

        {/* Navigation */}
        <div className="nav-wrapper bg-white shadow-sm rounded">
          <Nav className="nav-tabs-custom justify-content-center py-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Nav.Item key={to}>
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    `nav-link-custom ${isActive ? "active" : ""}`
                  }
                >
                  <Icon size={16} className="me-2" />
                  {label}
                </NavLink>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        {/* Search Section */}
        <div className="search-section py-4">
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="search-box p-3 shadow-lg bg-white rounded-3">
                <InputGroup size="lg">
                  <Form.Control
                    placeholder="Tìm kiếm sách theo tên sách..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                  />
                  <Button
                    variant="primary"
                    className="search-btn"
                    onClick={handleSearch}
                  >
                    <Search size={20} />
                  </Button>
                </InputGroup>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </header>
  );
};

export default Header;
