import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/user/home";
import Service from "./pages/user/service";
import NotFounPage from "./pages/notfoundpage";
import Navbar from "./components/fragments/navbar/Navbar";
import Dashboard from "./pages/admin/dashboard";
import Login from "./pages/auth/login";
import AdminRoutes from "./routes/AdminRoutes";
import Profile from "./pages/admin/profile";

function App() {
  const location = useLocation();

  // Rute di mana Navbar tidak akan ditampilkan
  const hideNavbarRoutes = ["/login", "/admin"];
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {/* Tampilkan Navbar hanya jika tidak berada di rute tertentu */}
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/service" element={<Service />} />
        <Route path="*" element={<NotFounPage />} />
        <Route path="/login" element={<Login />} />

        {/* Rute Admin */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
