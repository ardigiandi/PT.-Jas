import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "@/api/axiosInstance";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CardPortofolio() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current card index for the carousel
  const [touchStart, setTouchStart] = useState(0); // Track touch start position
  const [touchEnd, setTouchEnd] = useState(0); // Track touch end position
  const carouselRef = useRef(null);

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

  // Handle touch start
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      setCurrentIndex((prevIndex) =>
        prevIndex === groupedCards.length - 1 ? 0 : prevIndex + 1
      );
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? groupedCards.length - 1 : prevIndex - 1
      );
    }

    // Reset touch positions
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Group cards per 2 for desktop, single card group for mobile
  const groupedCards =
    window.innerWidth >= 768
      ? cards.reduce((result, card, index) => {
          const groupIndex = Math.floor(index / 2);
          if (!result[groupIndex]) result[groupIndex] = [];
          result[groupIndex].push(card);
          return result;
        }, [])
      : cards.map((card) => [card]);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto my-[100px] px-4">
      <h1 className="flex justify-center text-2xl font-semibold">My Latest Work</h1>
      <p className="flex justify-center mt-1 text-gray-500">
        Beberapa proyek dan karya terbaru saya.
      </p>

      {/* Carousel */}
      <div
        className="relative overflow-hidden mt-16 px-4" // padding kiri kanan agar slide tidak nempel ke tepi
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={carouselRef}
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {groupedCards.map((group, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex gap-5 justify-center w-full"
              style={{ flexBasis: "100%" }}
            >
              {group.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-oren max-w-xs w-full p-4 flex flex-col rounded-md gap-4 mx-1" // mx-3 untuk jarak antar slide mobile
                >
                  <img
                    src={
                      card.photos && card.photos.length > 0
                        ? `${axiosInstance.defaults.baseURL}/storage/${card.photos[0].photo_path}`
                        : "/default-image.jpg"
                    }
                    alt={card.title || "No title"}
                    className="w-full h-[350px] object-cover rounded-md"
                  />
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-white/80">
                      {card.title}
                    </span>
                    <h1 className="text-lg font-bold text-white">{card.client_name}</h1>
                    <h1 className="text-xs text-white/80 font-medium">{card.date}</h1>
                  </div>
                  <p className="text-sm text-white/80">
                    {card.description || "No Description"}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="hidden lg:flex items-center justify-center absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white hover:bg-gray-700 shadow-lg rounded-full w-10 h-10 transition-all duration-300"
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? groupedCards.length - 1 : prevIndex - 1
            )
          }
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          className="hidden lg:flex items-center justify-center absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white hover:bg-gray-700 shadow-lg rounded-full w-10 h-10 transition-all duration-300"
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === groupedCards.length - 1 ? 0 : prevIndex + 1
            )
          }
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default CardPortofolio;
