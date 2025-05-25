// components/Pagination.jsx
import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`px-3 py-1 rounded cursor-pointer ${
          i === currentPage
            ? "bg-orange-500 text-white font-semibold"
            : "bg-white text-black"
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-white text-black rounded disabled:opacity-50 cursor-pointer"
      >
        Previous
      </button>

      {pages}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-white text-black rounded disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
