import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "@/api/axiosInstance";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CardPortofolio() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [notification, setNotification] = useState(""); // State untuk notif
  const notificationTimeoutRef = useRef(null); // Simpan timeout supaya bisa clear

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

  // Fungsi untuk ganti slide + munculkan notif
  const goToSlide = (newIndex) => {
    setCurrentIndex(newIndex);

    // Tampilkan notif
    setNotification(`Slide berubah ke ${newIndex + 1}`);

    // Clear timeout lama kalau ada
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    // Sembunyikan notif setelah 2 detik
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      goToSlide(
        currentIndex === groupedCards.length - 1 ? 0 : currentIndex + 1
      );
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      goToSlide(
        currentIndex === 0 ? groupedCards.length - 1 : currentIndex - 1
      );
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

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
    <div className="max-w-6xl mx-auto my-[100px] px-6">
      <h1 className="flex justify-center text-2xl font-semibold">
        My Latest Work
      </h1>
      <p className="flex justify-center mt-1 text-gray-500">
        Beberapa proyek dan karya terbaru saya.
      </p>

      {/* Notifikasi slide */}
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-2 rounded-md shadow-lg z-50">
          {notification}
        </div>
      )}

      {/* Carousel */}
      <div
        className="relative overflow-hidden mt-16"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={carouselRef}
          className="flex transition-transform duration-700 ease-in-out -mx-3"
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
                  className="bg-oren w-[450px] max-w-full p-4 flex flex-col rounded-md gap-4 mx-3"
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
                    <h1 className="text-lg font-bold text-white">
                      {card.client_name}
                    </h1>
                    <h1 className="text-xs text-white/80 font-medium">
                      {card.date}
                    </h1>
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
            goToSlide(currentIndex === 0 ? groupedCards.length - 1 : currentIndex - 1)
          }
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          className="hidden lg:flex items-center justify-center absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white hover:bg-gray-700 shadow-lg rounded-full w-10 h-10 transition-all duration-300"
          onClick={() =>
            goToSlide(currentIndex === groupedCards.length - 1 ? 0 : currentIndex + 1)
          }
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default CardPortofolio;
