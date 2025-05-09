const AdminLayout = (props) => {
  const { children } = props;

  return (
    <div>
      <h1>Admin Layout</h1>
      {children}
    </div>
  );
};

export default AdminLayout;
