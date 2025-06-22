import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import CategoryList from "../../components/fragments/admin/categories/CategoryList";

const AdminCategoryPage = () => {
  return (
    <AdminLayout>
      <CategoryList />
    </AdminLayout>
  );
};

export default AdminCategoryPage;
