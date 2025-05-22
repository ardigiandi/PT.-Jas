import React, { useState, useEffect } from "react";
import axios from "axios";

const PortfolioEditModal = ({
  isOpen,
  onClose,
  portfolio,
  onPortfolioUpdated,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (portfolio) {
      setTitle(portfolio.title || "");
      setDescription(portfolio.description || "");
      setClientName(portfolio.client_name || "");
      setDate(portfolio.date || "");
    }
  }, [portfolio]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `http://127.0.0.1:8000/api/portofolios/${portfolio.id}`,
        { title, description, client_name: clientName, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Portfolio updated:", response.data);
      if (onPortfolioUpdated) {
        onPortfolioUpdated(response.data);
      }
      onClose(); // Close the modal on success
    } catch (err) {
      console.error("Failed to update portfolio:", err);
      setError(err);
      alert("Failed to update portfolio.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !portfolio) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Edit Portfolio
        </h2>
        {error && (
          <div className="text-red-500 mb-4">Error: {error.message}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-2 mt-1 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 mt-1 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="client_name"
            >
              Client Name
            </label>
            <input
              type="text"
              id="client_name"
              className="w-full p-2 mt-1 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              className="w-full p-2 mt-1 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Portfolio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioEditModal;
