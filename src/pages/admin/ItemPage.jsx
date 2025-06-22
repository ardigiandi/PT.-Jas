import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import ItemList from "../../components/fragments/admin/items/ItemList";

const AdminItemPage = () => {
  return (
    <AdminLayout>
      <ItemList />
    </AdminLayout>
  );
};

export default AdminItemPage;
