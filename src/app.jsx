import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home";
import Service from "./pages/service";
import NotFounPage from "./pages/notfoundpage";
import Navbar from "./components/fragments/navbar/Navbar";
import Login from "./pages/login";


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
      </Routes>
    </>
  );
}

export default App;
