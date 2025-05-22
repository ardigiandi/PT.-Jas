import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://127.0.0.1:8000/api/photos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPhotos(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://127.0.0.1:8000/api/photos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPhotos(photos.filter((photo) => photo.id !== id));
    } catch (err) {
      console.error("Failed to delete photo:", err);
      alert("Failed to delete photo.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading photos: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Photo List</h2>
      <div className="flex justify-end mb-4">
        <Link
          to="/admin/photos/create"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add New Photo
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={photo.url} // Assuming 'url' is the field for the photo image URL
              alt={photo.title} // Assuming 'title' is the field for photo title
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{photo.title}</h3>
              {/* Add other photo details here if available */}
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/admin/photos/edit/${photo.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoList;
