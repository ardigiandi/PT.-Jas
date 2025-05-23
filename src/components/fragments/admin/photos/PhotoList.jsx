import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PhotoCreateModal from "./PhotoCreateModal";
import DeleteConfirmationModal from "../../../common/DeleteConfirmationModal";

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [photoToDeleteId, setPhotoToDeleteId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPhotos = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/photos?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPhotos(response.data.data); // asumsi struktur Laravel Resource Collection
      setTotalPages(response.data.last_page);
      setCurrentPage(response.data.current_page);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos(currentPage);
  }, [fetchPhotos, currentPage]);

  const handleDeleteClick = (id) => {
    setPhotoToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleteModalOpen(false);
    if (photoToDeleteId) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(
          `http://127.0.0.1:8000/api/photos/${photoToDeleteId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchPhotos(currentPage);
        setPhotoToDeleteId(null);
      } catch (err) {
        console.error("Failed to delete photo:", err);
        alert("Failed to delete photo.");
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setPhotoToDeleteId(null);
  };

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handlePhotoCreated = () => fetchPhotos(currentPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading photos: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Photo List</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleOpenCreateModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add New Photo
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={photo.url}
              alt={`Photo ${photo.id}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">
                Portfolio:{" "}
                {photo.portfolio ? photo.portfolio.title : photo.portfolio_id}
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDeleteClick(photo.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <PhotoCreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSuccess={handlePhotoCreated}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName="photo"
      />
    </div>
  );
};

export default PhotoList;
