import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LucideHome,
  LucideBarChart2,
  LucideLogIn,
  LucideImage,
  LucideBox,
  LucideTags,
} from "lucide-react";
import DeleteConfirmationModal from "../common/DeleteConfirmationModal";
import axiosInstance from "@/api/axiosInstance";

const AdminLayout = ({ children }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    setIsLogoutModalOpen(false);
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        await axiosInstance.post("/api/logout", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
  };

  const handleOpenLogoutModal = () => setIsLogoutModalOpen(true);
  const handleCloseLogoutModal = () => setIsLogoutModalOpen(false);

  // Disable scroll when modal is open
  useEffect(() => {
    if (isLogoutModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isLogoutModalOpen]);

  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="w-[250px] h-full bg-white rounded-2xl shadow p-4 text-gray-800 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4">
            <div className="text-2xl font-bold mb-4">Dashboard</div>
            <nav className="flex flex-col gap-4">
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-2 p-2 w-full text-left rounded-lg hover:bg-gray-200"
              >
                <LucideHome className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link
                to="/admin/portfolios"
                className="flex items-center space-x-2 p-2 w-full text-left rounded-lg hover:bg-gray-200"
              >
                <LucideBarChart2 className="w-5 h-5" />
                <span>Portfolio</span>
              </Link>
              <Link
                to="/admin/photos"
                className="flex items-center space-x-2 p-2 w-full text-left rounded-lg hover:bg-gray-200"
              >
                <LucideImage className="w-5 h-5" />
                <span>Foto</span>
              </Link>
              <Link
                to="/admin/items"
                className="flex items-center space-x-2 p-2 w-full text-left rounded-lg hover:bg-gray-200"
              >
                <LucideBox className="w-5 h-5" />
                <span>Item</span>
              </Link>
              <Link
                to="/admin/categories"
                className="flex items-center space-x-2 p-2 w-full text-left rounded-lg hover:bg-gray-200"
              >
                <LucideTags className="w-5 h-5" />
                <span>Kategori</span>
              </Link>
              {/* Tambahin item sebanyak apapun di sini, bakal scroll di dalam */}
            </nav>
          </div>

          <div className="pt-4 border-t mt-4">
            <button
              onClick={handleOpenLogoutModal}
              className="flex items-center space-x-2 p-2 w-full text-left rounded-lg text-red-600 hover:bg-red-100"
            >
              <LucideLogIn className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>
        <main className="flex-1 p-4 text-gray-800 overflow-auto">
          {children}
        </main>
      </div>

      <DeleteConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={handleCloseLogoutModal}
        onConfirm={handleLogout}
        title="Confirm Logout" // Set custom title
        message="Are you sure you want to log out?" // Set custom message
        confirmButtonText="Logout" // Set custom confirm button text
        confirmButtonClassName="bg-red-600 hover:bg-red-700" // Optional: customize button color if needed
      />
    </div>
  );
};

export default AdminLayout;
