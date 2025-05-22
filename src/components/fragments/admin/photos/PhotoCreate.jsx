import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PhotoCreate = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Assuming image is handled via URL for now
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/photos",
        {
          title,
          url: imageUrl, // Assuming the backend expects 'url' for the image
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Adjust if using form-data for file upload
          },
        }
      );
      console.log("Photo created:", response.data);
      navigate("/admin/photos"); // Redirect to photo list after creation
    } catch (err) {
      console.error("Failed to create photo:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Photo</h2>
      {error && <div className="text-red-500 mb-4">Error: {error.message}</div>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 font-bold mb-2"
          >
            Image URL
          </label>
          <input
            type="text" // Change to type="file" for file upload
            id="imageUrl"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={imageUrl} // Remove value and onChange for file input
            onChange={(e) => setImageUrl(e.target.value)} // Adjust for file input
            required
          />
          {/* Add file input handling here if needed */}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Photo"}
          </button>
          <Link
            to="/admin/photos"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PhotoCreate;
