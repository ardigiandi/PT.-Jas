import React, { useState, useEffect } from "react";
import axios from "axios";

const PhotoCreateModal = ({ isOpen, onClose, onSuccess }) => {
  const [portfolioId, setPortfolioId] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return; // Only fetch when modal is open

    const fetchPortfolios = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/portofolios", // Corrected endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPortfolios(response.data);
      } catch (err) {
        console.error("Failed to fetch portfolios:", err);
        setError("Failed to load portfolios. Please try again."); // Set a user-friendly error message
      }
    };

    fetchPortfolios();
  }, [isOpen]); // Fetch portfolios when modal opens

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("portfolio_id", portfolioId);
    formData.append("image", photoFile); // Use 'image' as per backend controller

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/photos",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Photo created:", response.data);
      // Reset form and close modal on success
      setPortfolioId("");
      setPhotoFile(null);
      onSuccess(); // Call the success callback to refresh list
      onClose();
    } catch (err) {
      console.error("Failed to create photo:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
      {" "}
      {/* Changed opacity to 25 */}
      <div className="p-5 border w-96 shadow-lg rounded-md bg-white">
        {" "}
        {/* Removed relative top-20 mx-auto */}
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Create New Photo
          </h3>
          {error && (
            <div className="text-red-500 mb-4">Error: {error}</div> // Display the error state
          )}
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                htmlFor="photo"
                className="block text-gray-700 font-bold mb-2"
              >
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
            <div className="items-center px-4 py-3">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                disabled={loading || !portfolioId || !photoFile}
              >
                {loading ? "Creating..." : "Create Photo"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
