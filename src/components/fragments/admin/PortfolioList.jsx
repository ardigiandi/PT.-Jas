import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PortfolioCreateModal from "./PortfolioCreateModal";
import PortfolioEditModal from "./PortfolioEditModal";
import DeleteConfirmationModal from "../../common/DeleteConfirmationModal";
import axiosInstance from "@/api/axiosInstance";

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [portfolioToDeleteId, setPortfolioToDeleteId] = useState(null);

  const fetchPortfolios = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.get(
        `/api/portofolios?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPortfolios(response.data.data);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolios(currentPage);
  }, [fetchPortfolios, currentPage]);

  const handleDeleteClick = (id) => {
    setPortfolioToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleteModalOpen(false);
    if (portfolioToDeleteId) {
      try {
        const token = localStorage.getItem("authToken");
        await axiosInstance.delete(
          `/api/portofolios/${portfolioToDeleteId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchPortfolios(currentPage); // Refresh current page
        setPortfolioToDeleteId(null);
      } catch (err) {
        console.error("Failed to delete portfolio:", err);
        alert("Failed to delete portfolio.");
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setPortfolioToDeleteId(null);
  };

  const handlePortfolioCreated = () => {
    fetchPortfolios(currentPage);
  };

  const handlePortfolioUpdated = () => {
    fetchPortfolios(currentPage);
  };

  const openEditModal = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsEditModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading portfolios: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Portfolio List</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add New Portfolio
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No.</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Client Name</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {portfolios.map((portfolio, index) => (
              <tr
                key={portfolio.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {(currentPage - 1) * 10 + index + 1}
                </td>
                <td className="py-3 px-6 text-left">{portfolio.title}</td>
                <td className="py-3 px-6 text-left">{portfolio.description}</td>
                <td className="py-3 px-6 text-left">{portfolio.client_name}</td>
                <td className="py-3 px-6 text-left">{portfolio.date}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => openEditModal(portfolio)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(portfolio.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          {currentPage} / {lastPage}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <PortfolioCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPortfolioCreated={handlePortfolioCreated}
      />
      <PortfolioEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        portfolio={selectedPortfolio}
        onPortfolioUpdated={handlePortfolioUpdated}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName="portfolio"
      />
    </div>
  );
};

export default PortfolioList;
