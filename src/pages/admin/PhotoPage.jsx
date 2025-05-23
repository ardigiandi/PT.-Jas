import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import PhotoList from "../../components/fragments/admin/photos/PhotoList";

const AdminPhotoPage = () => {
  return (
    <AdminLayout>
      <PhotoList />
    </AdminLayout>
  );
};

export default AdminPhotoPage;
