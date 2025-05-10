import React from 'react';

const AdminLayout = ({ children }) => {
  return (
    <div>
      <aside>
        <h2>Admin Sidebar</h2>
        <nav>
          <a href="/admin/dashboard">Dashboard</a> | <a href="/admin/users">Users</a>
        </nav>
      </aside>
      <main>
        <header>
          <h1>Admin Panel</h1>
        </header>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
