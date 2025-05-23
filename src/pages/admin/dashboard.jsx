import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
// import PortfolioList from "../../components/fragments/admin/PortfolioList"; // No longer needed here
import AdminHomePage from "./HomePage"; // Import AdminHomePage

const AdminDashboard = () => {
  return (
    // Render AdminHomePage content directly, AdminLayout is provided by the router
    <AdminHomePage />
  );
};

export default AdminDashboard;
