import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="bg-blue-400 h-screen w-1/5 fixed top-0 left-0 p-4">
        <h2 className="text-white text-xl font-bold mb-4">Admin Sidebar</h2>
        <nav className="space-y-2">
          <a href="#" className="block text-white hover:underline">
            Dashboard
          </a>
          {/* Tambahkan lebih banyak menu jika diperlukan */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-[20%] w-[80%] px-5 mt-10">{children}</main>
    </div>
  );
};

export default AdminLayout;
