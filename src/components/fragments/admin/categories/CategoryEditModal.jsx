import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";

const CategoryEditModal = ({ isOpen, onClose, onSuccess, category }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Populate form when the modal is opened or category changes
  useEffect(() => {
    if (isOpen && category) {
      setName(category.name || "");
    }
  }, [isOpen, category]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      await axiosInstance.put(
        `/api/categories/${category.id}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSuccess(); // Call the success callback to refresh the list
      onClose(); // Close the modal
    } catch (err) {
      console.error("Failed to update category:", err);
      setError(err.response?.data?.message || "Failed to update category.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {" "}
      {/* Transparent background */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Category</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryEditModal;
