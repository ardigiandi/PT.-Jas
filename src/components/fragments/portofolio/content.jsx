import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import Pagination from "@/components/elements/pagination"; 

function CardPortofolio() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 6;

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/portofolios");
        setCards(Array.isArray(response.data.data) ? response.data.data : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch portfolios.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = cards.slice(startIndex, startIndex + cardsPerPage);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto my-[100px] px-4">
      <h1 className="flex justify-center text-2xl font-semibold">
        My Latest Work
      </h1>

      <div className="flex flex-wrap justify-center mt-16 gap-5">
        {currentCards.map((card, index) => (
          <div
            key={index}
            className="bg-oren w-[550px] p-5 flex flex-col rounded-md gap-5"
          >
            <img
              src={
                card.photos && card.photos.length > 0
                  ? `${axiosInstance.defaults.baseURL}/storage/${card.photos[0].photo_path}`
                  : "/default-image.jpg"
              }
              alt={card.title || "No title"}
              className="w-full h-[400px] object-cover rounded-md"
            />
            <div className="space-y-2">
              <span className="text-sm font-medium text-white/80">
                {card.title}
              </span>
              <h1 className="text-2xl font-bold text-white">
                {card.client_name}
              </h1>
              <h1 className="text-sm text-white/80 font-medium">{card.date}</h1>
            </div>
            <p className="text-base text-white/80">
              {card.description || "No Description"}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default CardPortofolio;
