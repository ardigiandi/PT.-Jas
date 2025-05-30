import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "@/api/axiosInstance";

const PortfolioCreateModal = ({ isOpen, onClose, onPortfolioCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.post(
        "/api/portofolios",
        { title, description, client_name: clientName, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Portfolio created:", response.data);
      // Call the callback function to update the list in PortfolioList
      if (onPortfolioCreated) {
        onPortfolioCreated(response.data);
      }
      // Reset form fields
      setTitle("");
      setDescription("");
      setClientName("");
      setDate("");
      onClose(); // Close the modal on success
    } catch (err) {
      console.error("Failed to create portfolio:", err);
      setError(err);
      alert("Failed to create portfolio.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
      {" "}
      {/* Changed background to gray with opacity and removed blur */}
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Create New Portfolio
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
              {loading ? "Creating..." : "Create Portfolio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioCreateModal;
