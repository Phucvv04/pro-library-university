import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../pages/client/components/Header";
import Footer from "../pages/client/components/Footer";

const ClientLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] p-4 bg-light">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default ClientLayout;
