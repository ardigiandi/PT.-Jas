import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";

const PhotoCreate = () => {
  const [portfolioId, setPortfolioId] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axiosInstance.get("/api/portfolios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPortfolios(response.data);
      } catch (err) {
        console.error("Failed to fetch portfolios:", err);
        // Handle error fetching portfolios, maybe set an error state or show a message
      }
    };

    fetchPortfolios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("portfolio_id", portfolioId);
    formData.append("photo_path", photoFile); // Use 'photo_path' as per fillable

    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.post(
        "/api/photos",
        formData, // Send formData
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Important for file uploads
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
          <label
            htmlFor="portfolio"
            className="block text-gray-700 font-bold mb-2"
          >
            Portfolio
          </label>
          <select
            id="portfolio"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={portfolioId}
            onChange={(e) => setPortfolioId(e.target.value)}
            required
          >
            <option value="">Select a Portfolio</option>
            {portfolios.map((portfolio) => (
              <option key={portfolio.id} value={portfolio.id}>
                {portfolio.title} {/* Assuming portfolio has a 'title' field */}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">
            Photo File
          </label>
          <input
            type="file"
            id="photo"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading || !portfolioId || !photoFile}
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
