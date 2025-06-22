import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";

const ItemCreateModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    description: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories when the modal is opened
  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try {
          const token = localStorage.getItem("authToken");
          // Assuming an API endpoint for fetching categories
          const response = await axiosInstance.get("/api/categories", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Assuming the response data is an array of category objects with id and name
          setCategories(response.data.data);
        } catch (err) {
          console.error("Failed to fetch categories:", err);
          // Handle error fetching categories
        }
      };
      fetchCategories();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("image", formData.image);
    data.append("description", formData.description);
    data.append("category_id", formData.category_id);

    try {
      const token = localStorage.getItem("authToken");
      await axiosInstance.post("/api/items", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      onSuccess(); // Call the success callback to refresh the list
      onClose(); // Close the modal
      // Reset form
      setFormData({
        name: "",
        image: null,
        description: "",
        category_id: "",
      });
    } catch (err) {
      console.error("Failed to create item:", err);
      setError(err.response?.data?.message || "Failed to create item.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {" "}
      {/* Removed bg-black bg-opacity-50 */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Item</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              accept="image/jpeg,image/png,image/jpg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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
              {loading ? "Creating..." : "Create Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemCreateModal;
