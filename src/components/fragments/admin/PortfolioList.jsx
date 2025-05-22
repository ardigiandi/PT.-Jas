import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PortfolioCreateModal from "./PortfolioCreateModal"; // Import the create modal component
import PortfolioEditModal from "./PortfolioEditModal"; // Import the edit modal component

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State to control create modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control edit modal visibility
  const [selectedPortfolio, setSelectedPortfolio] = useState(null); // State to hold the portfolio being edited

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/portofolios",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPortfolios(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this portfolio?")) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`http://127.0.0.1:8000/api/portofolios/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPortfolios(portfolios.filter((portfolio) => portfolio.id !== id));
      } catch (err) {
        console.error("Failed to delete portfolio:", err);
        alert("Failed to delete portfolio.");
      }
    }
  };

  const handlePortfolioCreated = (newPortfolio) => {
    setPortfolios([...portfolios, newPortfolio]);
  };

  const handlePortfolioUpdated = (updatedPortfolio) => {
    setPortfolios(
      portfolios.map((portfolio) =>
        portfolio.id === updatedPortfolio.id ? updatedPortfolio : portfolio
      )
    );
  };

  const openEditModal = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsEditModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading portfolios: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Portfolio List</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsCreateModalOpen(true)} // Open create modal
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
                  {index + 1}
                </td>
                <td className="py-3 px-6 text-left">{portfolio.title}</td>
                <td className="py-3 px-6 text-left">{portfolio.description}</td>
                <td className="py-3 px-6 text-left">{portfolio.client_name}</td>
                <td className="py-3 px-6 text-left">{portfolio.date}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => openEditModal(portfolio)} // Open edit modal
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(portfolio.id)}
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
      {/* Render the create modal */}
      <PortfolioCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPortfolioCreated={handlePortfolioCreated}
      />
      {/* Render the edit modal */}
      <PortfolioEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        portfolio={selectedPortfolio}
        onPortfolioUpdated={handlePortfolioUpdated}
      />
    </div>
  );
};

export default PortfolioList;
