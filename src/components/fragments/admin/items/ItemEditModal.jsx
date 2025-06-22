import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";

const ItemEditModal = ({ isOpen, onClose, onSuccess, item }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: null, // Use null for file input
    description: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(""); // To display current image

  // Fetch categories and populate form when the modal is opened or item changes
  useEffect(() => {
    if (isOpen && item) {
      const fetchCategories = async () => {
        try {
          const token = localStorage.getItem("authToken");
          const response = await axiosInstance.get("/api/categories", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCategories(response.data.data);
        } catch (err) {
          console.error("Failed to fetch categories:", err);
          // Handle error fetching categories
        }
      };
      fetchCategories();

      // Populate form with item data
      setFormData({
        name: item.name || "",
        image: null, // Reset image input
        description: item.description || "",
        category_id: item.category_id || "",
      });
      setCurrentImageUrl(item.url || ""); // Set current image URL
    }
  }, [isOpen, item]);

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
    data.append("_method", "PUT"); // Use PUT method for update
    data.append("name", formData.name);
    if (formData.image) {
      data.append("image", formData.image);
    }
    data.append("description", formData.description);
    data.append("category_id", formData.category_id);

    try {
      const token = localStorage.getItem("authToken");
      await axiosInstance.post(`/api/items/${item.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      onSuccess(); // Call the success callback to refresh the list
      onClose(); // Close the modal
    } catch (err) {
      console.error("Failed to update item:", err);
      setError(err.response?.data?.message || "Failed to update item.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {" "}
      {/* Removed bg-black bg-opacity-50 */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Item</h2>
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
            <label className="block text-gray-700">Current Image</label>
            {currentImageUrl ? (
              <img
                src={currentImageUrl}
                alt="Current Item"
                className="w-32 h-32 object-cover mb-2"
              />
            ) : (
              <p>No image available</p>
            )}
            <label className="block text-gray-700">New Image (Optional)</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              accept="image/jpeg,image/png,image/jpg"
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
              {loading ? "Updating..." : "Update Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemEditModal;
