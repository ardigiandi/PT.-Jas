import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";

const AdminHomePage = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Home Page</h1>
        <p>Ini page home</p>
      </div>
    </AdminLayout>
  );
};

export default AdminHomePage;
