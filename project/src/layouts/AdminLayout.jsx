import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../pages/admin/Navigation";

const AdminLayout = () => {
  return (
    <div className="admin-layout d-flex">
      <Navigation />
      <div className="main-content p-3 flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
