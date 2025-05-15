import React from 'react';

const AdminLayout = ({ children }) => {
  return (
    <div className='flex gap-4'>
      <aside className='bg-blue-400 h-screen w-1/5'>
        <h2>Admin Sidebar</h2>
        <nav>
          <a href="#">Dashboard</a>
        </nav>
      </aside>
      <main className='w-full px-5 mt-10'>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
