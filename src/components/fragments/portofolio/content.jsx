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
  const carouselRef = useRef(null);

  // useEffect(() => {
  //   const fetchPortfolios = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axiosInstance.get("/api/portofoliosindex");
  //       console.log("Portfolios:", response.data.data);
  //       // setCards(Array.isArray(response.data.data) ? response.data.data : []);
  //       // setCards(Array.isArray(response.data.data) ? response.data.data : []);
  //       // setCards(Array.isArray(response.data) ? response.data : []);
  //       setError(null);
  //     } catch (err) {
  //       // console.error("Error fetching data:", err);
  //       setError("Failed to fetch portfolios.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPortfolios();
  // }, []);

  useEffect(() => {
  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/portofoliosindex");
      const portfolios = response.data.data;
      setCards(Array.isArray(portfolios) ? portfolios : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Gagal mengambil data portofolio.");
    } finally {
      setLoading(false);
    }
  };

  fetchPortfolios();
}, []);


  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      setCurrentIndex((prevIndex) =>
        prevIndex === groupedCards.length - 1 ? 0 : prevIndex + 1
      );
    }

    if (touchStart - touchEnd < -50) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? groupedCards.length - 1 : prevIndex - 1
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
        Karya dan Proyek Terbaru
      </h1>
      {/* <p className="flex justify-center mt-1 text-gray-500">
        Beberapa proyek dan karya terbaru saya.
      </p> */}

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
                      card.photo_path
                        ? `${axiosInstance.defaults.baseURL}/storage/${card.photo_path}`
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
