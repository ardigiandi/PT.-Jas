import React, { useEffect, useState, useCallback } from "react";
import CategoryCreateModal from "./CategoryCreateModal"; // Will create this next
import CategoryEditModal from "./CategoryEditModal"; // Will create this next
import DeleteConfirmationModal from "../../../common/DeleteConfirmationModal";
import axiosInstance from "@/api/axiosInstance";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDeleteId, setCategoryToDeleteId] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  // Assuming pagination is not strictly required based on the controller index method,
  // but keeping the state structure for potential future use or consistency.
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCategories = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      // Using the correct API endpoint for categories
      const response = await axiosInstance.get(`/api/categories?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Adjust based on your actual API response structure if different
      setCategories(response.data.data);
      // Assuming pagination details might be in the response, default to 1 page if not
      setTotalPages(response.data.last_page || 1);
      setCurrentPage(response.data.current_page || 1);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories(currentPage);
  }, [fetchCategories, currentPage]);

  const handleDeleteClick = (id) => {
    setCategoryToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleteModalOpen(false);
    if (categoryToDeleteId) {
      try {
        const token = localStorage.getItem("authToken");
        await axiosInstance.delete(`/api/categories/${categoryToDeleteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchCategories(currentPage); // Refresh list after deletion
        setCategoryToDeleteId(null);
      } catch (err) {
        console.error("Failed to delete category:", err);
        alert("Failed to delete category.");
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDeleteId(null);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleOpenEditModal = (category) => {
    setCategoryToEdit(category);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCategoryToEdit(null);
  };

  const handleCategoryCreatedOrUpdated = () => {
    fetchCategories(currentPage); // Refresh list after creation or update
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Category List</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleOpenCreateModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add New Category
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {category.id}
                </td>
                <td className="py-3 px-6 text-left">{category.name}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      onClick={() => handleOpenEditModal(category)}
                      className="w-6 mr-2 transform hover:scale-110"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteClick(category.id)}
                      className="w-6 mr-2 transform hover:scale-110"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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

      <CategoryCreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSuccess={handleCategoryCreatedOrUpdated}
      />

      <CategoryEditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSuccess={handleCategoryCreatedOrUpdated}
        category={categoryToEdit}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName="category"
      />
    </div>
  );
};

export default CategoryList;
