import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";

const PhotoCreate = () => {
  const [portfolioId, setPortfolioId] = useState("");
  const [caption, setCaption] = useState("");
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
          headers: { Authorization: `Bearer ${token}` },
        });
        setPortfolios(response.data);
      } catch (err) {
        setError("Failed to fetch portfolios.");
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
    formData.append("photo_path", photoFile);
    formData.append("caption", caption); // Include title/caption

    try {
      const token = localStorage.getItem("authToken");
      await axiosInstance.post("/api/photos", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin/photos");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Photo</h2>
      {error && (
        <div className="text-red-500 mb-4">Error: {error.message || error}</div>
      )}
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
            className="w-full border rounded py-2 px-3"
            value={portfolioId}
            onChange={(e) => setPortfolioId(e.target.value)}
            required
          >
            <option value="">Select a Portfolio</option>
            {portfolios.map((portfolio) => (
              <option key={portfolio.id} value={portfolio.id}>
                {portfolio.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="caption"
            className="block text-gray-700 font-bold mb-2"
          >
            Caption
          </label>
          <input
            type="text"
            id="caption"
            className="w-full border rounded py-2 px-3"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">
            Photo File
          </label>
          <input
            type="file"
            id="photo"
            className="w-full border rounded py-2 px-3"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            disabled={loading || !portfolioId || !photoFile || !caption}
          >
            {loading ? "Creating..." : "Create Photo"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhotoCreate;
