import React, { useEffect, useState, useCallback } from "react";
import ItemCreateModal from "./ItemCreateModal"; // Will create this next
import ItemEditModal from "./ItemEditModal"; // Import ItemEditModal // Add import for ItemEditModal
import DeleteConfirmationModal from "../../../common/DeleteConfirmationModal";
import axiosInstance from "@/api/axiosInstance";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Add state for edit modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null); // Add state for item to edit

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Assuming pagination is supported by the API

  const fetchItems = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      // Assuming your API supports pagination like the photo API
      const response = await axiosInstance.get(`/api/items?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Adjust based on your actual API response structure if different from photo API
      setItems(response.data.data);
      // Assuming pagination details are in the response
      setTotalPages(response.data.last_page || 1); // Default to 1 if no pagination info
      setCurrentPage(response.data.current_page || 1); // Default to 1 if no pagination info
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems(currentPage);
  }, [fetchItems, currentPage]);

  const handleDeleteClick = (id) => {
    setItemToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleteModalOpen(false);
    if (itemToDeleteId) {
      try {
        const token = localStorage.getItem("authToken");
        await axiosInstance.delete(`/api/items/${itemToDeleteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchItems(currentPage); // Refresh list after deletion
        setItemToDeleteId(null);
      } catch (err) {
        console.error("Failed to delete item:", err);
        alert("Failed to delete item.");
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setItemToDeleteId(null);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleItemCreated = () => {
    fetchItems(currentPage); // Refresh list after creation
  };

  // Add handlers for edit modal
  const handleEditClick = (item) => {
    setItemToEdit(item);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setItemToEdit(null);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading items: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Item List</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleOpenCreateModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add New Item
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            {item.url && (
              <img
                src={item.url}
                alt={`Item ${item.name}`}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {item.description || "No description provided"}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Category: {item.category ? item.category.name : "N/A"}
              </p>
              <div className="flex justify-end mt-4">
                {/* Add Edit button here */}
                <button
                  onClick={() => handleEditClick(item)} // Call handleEditClick
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition mr-2" // Added mr-2 for spacing
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
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
      )}

      <ItemCreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSuccess={handleItemCreated}
      />

      {/* Add ItemEditModal */}
      <ItemEditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSuccess={handleItemCreated} // Refresh list after edit
        item={itemToEdit}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName="item"
      />
    </div>
  );
};

export default ItemList;
