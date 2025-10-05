import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer-section text-white mt-5">
      <Container>
        <Row>
          <Col md={6} className="mb-4 mb-md-0">
            <h5 className="fw-bold">Thư viện trực tuyến</h5>
            <p className="mb-1">
              Hệ thống quản lý thư viện hiện đại, phục vụ độc giả 24/7
            </p>
            <p className="small opacity-75">
              © 2025 Library Management System. All rights reserved.
            </p>
          </Col>
          <Col md={6}>
            <h6 className="fw-bold mb-3">Thông tin liên hệ</h6>
            <p className="small mb-1 opacity-75">
              Email: library@example.com
              <br />
              Phone: 0123 456 789
              <br />
              Địa chỉ: Triều Khúc, Thành phố Hà Nội
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
