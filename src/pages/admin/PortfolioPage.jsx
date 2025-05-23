import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import PortfolioList from "../../components/fragments/admin/PortfolioList";
// import PortfolioCreate from "../../components/fragments/admin/PortfolioCreate"; // No longer needed

const AdminPortfolioPage = () => {
  return (
    <AdminLayout>
      <PortfolioList />
    </AdminLayout>
  );
};

export default AdminPortfolioPage;
