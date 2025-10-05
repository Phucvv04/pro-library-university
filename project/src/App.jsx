import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./nav.css";
/* Toastify */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Layouts */
import AdminLayout from "./layouts/AdminLayout.jsx";
import ClientLayout from "./layouts/ClientLayout.jsx";

/* Auth Pages */
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

/* Admin Pages */
import Dashboard from "./pages/admin/Dashboard.jsx";
import Books from "./pages/admin/Books.jsx";
import Members from "./pages/admin/Members.jsx";
import Authors from "./pages/admin/Authors.jsx";
import Publishers from "./pages/admin/Publishers.jsx";
import Categories from "./pages/admin/Categories.jsx";
import Borrowing from "./pages/admin/Borrowing.jsx";
import BorrowingDetail from "./pages/admin/BorrowingDetail.jsx";
import Statistics from "./pages/admin/Statistics.jsx";

/* Client Pages */
import Home from "./pages/client/pages/Home.jsx";
import BorrowReturn from "./pages/client/pages/BorrowReturn.jsx";
import Guide from "./pages/client/pages/Guide.jsx";
import News from "./pages/client/pages/News.jsx";
import Account from "./pages/client/pages/Account.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Điều hướng "/" sang /client hoặc /admin */}
          <Route path="/" element={<Navigate to="/client" replace />} />

          {/* Client Routes */}
          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<Home />} /> {/* /client */}
            <Route path="borrow-return" element={<BorrowReturn />} />
            <Route path="guide" element={<Guide />} />
            <Route path="news" element={<News />} />
            <Route path="account" element={<Account />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} /> {/* /admin */}
            <Route path="books" element={<Books />} />
            <Route path="members" element={<Members />} />
            <Route path="authors" element={<Authors />} />
            <Route path="publishers" element={<Publishers />} />
            <Route path="categories" element={<Categories />} />
            <Route path="borrowing" element={<Borrowing />} />
            <Route path="borrowingdetail" element={<BorrowingDetail />} />
            <Route path="statistics" element={<Statistics />} />
          </Route>

          {/* Auth Routes (bên ngoài AdminLayout nếu muốn login/register riêng) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;
