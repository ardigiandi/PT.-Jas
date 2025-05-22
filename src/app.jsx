import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home";
import Service from "./pages/service";
import NotFounPage from "./pages/notfoundpage";
import Navbar from "./components/fragments/navbar/Navbar";
import Login from "./pages/login";
import AdminDashboard from "./pages/admin/dashboard";
import PortfolioList from "./components/fragments/admin/PortfolioList";
import PhotoList from "./components/fragments/admin/photos/PhotoList"; // Import PhotoList
import PhotoCreate from "./components/fragments/admin/photos/PhotoCreate"; // Import PhotoCreate
import PhotoEdit from "./components/fragments/admin/photos/PhotoEdit"; // Import PhotoEdit
import AdminHomePage from "./pages/admin/HomePage"; // Import AdminHomePage
import AdminPortfolioPage from "./pages/admin/PortfolioPage"; // Import AdminPortfolioPage
import AdminPhotoPage from "./pages/admin/PhotoPage"; // Import AdminPhotoPage
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
// import PortfolioCreate from "./components/fragments/admin/PortfolioCreate"; // No longer needed as creation is in a modal
// import PortfolioEdit from "./components/fragments/admin/PortfolioEdit"; // No longer needed as editing is in a modal

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
        {/* Protected Admin Routes */}
        <Route path="/admin" element={<PrivateRoute />}>
          <Route index element={<AdminHomePage />} />{" "}
          {/* Use index route for dashboard */}
          <Route path="portfolios" element={<AdminPortfolioPage />} />{" "}
          {/* Use AdminPortfolioPage */}
          {/* <Route path="portfolios/create" element={<PortfolioCreate />} /> */}{" "}
          {/* Remove create route */}
          {/* <Route path="portfolios/edit/:id" element={<PortfolioEdit />} /> */}{" "}
          {/* Remove edit route */}
          {/* Photo Routes */}
          <Route path="photos" element={<AdminPhotoPage />} />{" "}
          {/* Use AdminPhotoPage */}
          <Route path="photos/create" element={<PhotoCreate />} />
          <Route path="photos/edit/:id" element={<PhotoEdit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
