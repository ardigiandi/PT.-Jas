import {
  LucideHome,
  LucideSettings,
  LucideBarChart2,
  LucideUser,
  LucideLogIn,
} from "lucide-react";
import { Link } from "react-router";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex gap-4">
        {/* Sidebar */}
        <aside className="w-[250px] bg-white rounded-2xl shadow h-screen p-4 text-gray-800">
          <div className="space-y-4">
            <div className="text-2xl font-bold mb-4">Dashboard</div>{" "}
            {/* Added mb-4 for space below title */}
            <nav className="space-y-2">
              {" "}
              {/* Changed space-y back to 2 for spacing between nav items */}
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-2 p-2 w-full text-left rounded-lg hover:bg-gray-200"
              >
                <LucideHome className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link
                to="/admin/portfolios" // Assuming this is the route for portfolio list
                className="flex items-center space-x-2 p-2 w-full text-left rounded-lg hover:bg-gray-200"
              >
                <LucideBarChart2 className="w-5 h-5" />{" "}
                {/* Using BarChart2 for Portfolio for now */}
                <span>Portfolio</span>
              </Link>
              <Link
                to="/admin/photos" // Assuming this is the route for photo list
                className="flex items-center space-x-2 p-2 w-full text-left rounded-lg hover:bg-gray-200"
              >
                <LucideUser className="w-5 h-5" />{" "}
                {/* Using User for Foto for now */}
                <span>Foto</span>
              </Link>
            </nav>
          </div>
          <div className="mt-auto">
            {" "}
            {/* Use mt-auto to push to the bottom */}
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                window.location.href = "/login"; // Redirect to login page
              }}
              className="flex items-center space-x-2 p-2 w-full text-left rounded-lg text-red-600 hover:bg-red-100"
            >
              <LucideLogIn className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 text-gray-800">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
