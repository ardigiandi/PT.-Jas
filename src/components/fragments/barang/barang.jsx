import React, { useEffect, useState } from "react";
import axios from "axios";

const Barang = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data dari API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/public-categories")
      .then((response) => {
        const categoriesData = response.data.data;
        setCategories(categoriesData);
        if (categoriesData.length > 0) {
          setSelectedCategory(categoriesData[0]); // Pilih kategori pertama
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));

    axios
      .get("http://127.0.0.1:8000/api/public-items")
      .then((response) => {
        setItems(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  }, []);

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category_id === selectedCategory.id)
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl font-semibold" style={{ color: "#F58220" }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-14">
        Daftar Kategori & Barang
      </h1>

      {/* Kategori */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            className={`p-4 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition ${
              selectedCategory?.id === category.id
                ? "bg-orange-500"
                : "bg-orange-400"
            }`}
            style={{
              backgroundColor:
                selectedCategory?.id === category.id ? "#F58220" : "#FDB45D",
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Items */}
      <div>
        {selectedCategory ? (
          filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3.5 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center">
              Tidak ada item dalam kategori ini
            </p>
          )
        ) : (
          <p className="text-gray-500 italic text-center">
            Pilih kategori untuk melihat item
          </p>
        )}
      </div>
    </div>
  );
};

export default Barang;
