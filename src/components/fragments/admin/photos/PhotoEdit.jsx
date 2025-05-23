import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PhotoEdit = () => {
  const { id } = useParams();
  const [portfolioId, setPortfolioId] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // To display current image
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // Fetch photo data
        const photoResponse = await axios.get(
          `http://127.0.0.1:8000/api/photos/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTitle(photoResponse.data.title);
        setImageUrl(photoResponse.data.photo_path); // Assuming 'photo_path' is the field for the photo image URL
        setPortfolioId(photoResponse.data.portfolio_id); // Set initial portfolio ID

        // Fetch portfolios
        const portfoliosResponse = await axios.get(
          "http://127.0.0.1:8000/api/portofolios", // Corrected endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPortfolios(portfoliosResponse.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("_method", "PUT"); // Method spoofing for PUT with form-data
    formData.append("portfolio_id", portfolioId);
    if (photoFile) {
      formData.append("photo_path", photoFile); // Only append if a new file is selected
    }
    formData.append("title", title); // Include title in update

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `http://127.0.0.1:8000/api/photos/${id}`,
        formData, // Send formData
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      console.log("Photo updated:", response.data);
      navigate("/admin/photos"); // Redirect to photo list after update
    } catch (err) {
      console.error("Failed to update photo:", err);
      setError(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading photo: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Photo</h2>
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
          <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">
            Photo File
          </label>
          <input
            type="file"
            id="photo"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            // required // Make required false as photo update is optional
          />
          {/* Display current photo */}
          {imageUrl && (
            <div className="mt-2">
              <label className="block text-gray-700 font-bold mb-2">
                Current Photo
              </label>
              <img
                src={imageUrl}
                alt="Current Photo"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={submitting || !portfolioId} // Disable if no portfolio selected
          >
            {submitting ? "Updating..." : "Update Photo"}
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

export default PhotoEdit;
