import {
  LucideHome,
  LucideSettings,
  LucideBarChart2,
  LucideUser,
} from "lucide-react";
import { Link } from "react-router";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <aside className="col-span-3 bg-white rounded-2xl shadow p-4">
          <div className="space-y-4">
            <div className="text-2xl font-bold">My Dashboard</div>
            <nav className="space-y-2">
              <button className="flex items-center space-x-2 p-2 w-full text-left rounded-lg hover:bg-gray-200">
                <LucideHome className="w-5 h-5" />
                <Link to="/admin">Home</Link>
              </button>
              <button className="flex items-center space-x-2 p-2 w-full text-left rounded-lg hover:bg-gray-200">
                <LucideBarChart2 className="w-5 h-5" />
                <span>Analytics</span>
              </button>
              <button className="flex items-center space-x-2 p-2 w-full text-left rounded-lg hover:bg-gray-200">
                <LucideUser className="w-5 h-5" />
                <Link to="/admin/profile">Profile</Link>
              </button>
              <button className="flex items-center space-x-2 p-2 w-full text-left rounded-lg hover:bg-gray-200">
                <LucideSettings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </nav>
          </div>
        </aside>

        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
