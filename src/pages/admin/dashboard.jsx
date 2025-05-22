import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
// import PortfolioList from "../../components/fragments/admin/PortfolioList"; // No longer needed here
import AdminHomePage from "./HomePage"; // Import AdminHomePage

const AdminDashboard = () => {
  return (
    <AdminLayout>
      {/* Render AdminHomePage content */}
      <AdminHomePage />
    </AdminLayout>
  );
};

export default AdminDashboard;
