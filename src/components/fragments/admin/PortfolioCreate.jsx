import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";

const PortfolioCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState(""); // Add state for client_name
  const [date, setDate] = useState(""); // Add state for date
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      await axiosInstance.post(
        "/api/portofolios", // Use full API URL
        { title, description, client_name: clientName, date }, // Include new fields
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/admin/portfolios"); // Redirect to portfolio list after creation
    } catch (err) {
      setError(err);
      console.error("Failed to create portfolio:", err);
      alert("Failed to create portfolio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create New Portfolio</h2>
      {error && <div className="text-red-500 mb-4">Error: {error.message}</div>}
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
        {/* Add input for client_name */}
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
        {/* Add input for date */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="date"
          >
            Date
          </label>
          <input
            type="date" // Use type="date" for date input
            id="date"
            className="w-full p-2 mt-1 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Portfolio"}
        </button>
      </form>
    </div>
  );
};

export default PortfolioCreate;
