import React from "react";
import { Outlet } from "react-router-dom"; // 👈 phải import Outlet
import Navigation from "../pages/admin/Navigation";

const AdminLayout = () => {
  return (
    <div className="admin-layout d-flex">
      <Navigation /> {/* Sidebar hoặc menu admin */}
      <div className="main-content p-3 flex-grow-1">
        <Outlet /> {/*  chỗ này render các trang con */}
      </div>
    </div>
  );
};

export default AdminLayout;
