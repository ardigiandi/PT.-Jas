import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";

const PhotoCreateModal = ({ isOpen, onClose, onSuccess }) => {
  const [portfolioId, setPortfolioId] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [caption, setCaption] = useState(""); // New caption field
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    const fetchPortfolios = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axiosInstance.get("/api/portofolios", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPortfolios(response.data.data);
      } catch (err) {
        setError("Failed to load portfolios. Please try again.");
      }
    };
    fetchPortfolios();
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("portfolio_id", portfolioId);
    formData.append("image", photoFile);
    formData.append("caption", caption); // Include caption/title

    try {
      const token = localStorage.getItem("authToken");
      await axiosInstance.post("/api/photos", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setPortfolioId("");
      setPhotoFile(null);
      setCaption("");
      onSuccess();
      onClose();
    } catch (err) {
      setError("Failed to create photo.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg font-medium text-gray-900">
            Create New Photo
          </h3>
          {error && <div className="text-red-500 mb-4">Error: {error}</div>}
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="mb-4 text-left">
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
            <div className="mb-4 text-left">
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
            <div className="mb-4 text-left">
              <label
                htmlFor="photo"
                className="block text-gray-700 font-bold mb-2"
              >
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
            <div className="px-4 py-3">
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                disabled={loading || !portfolioId || !photoFile || !caption}
              >
                {loading ? "Creating..." : "Create Photo"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full border py-2 rounded bg-white text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhotoCreateModal;
